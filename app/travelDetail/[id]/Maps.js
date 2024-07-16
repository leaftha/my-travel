"use client";
import { useState, useEffect, useRef } from "react";
import style from "./Map.module.css";
import ContentList from "./contentList";

export default function Maps({ day, id }) {
  const [map, setMap] = useState(null);

  const Mapref = useRef();

  useEffect(() => {
    const showMap = async () => {
      let arr = [];
      const curPlace = await geocodePlaceId(day.placeId[0]);
      const newMap = new google.maps.Map(Mapref.current, {
        center: {
          lat: curPlace.geometry.location.lat(),
          lng: curPlace.geometry.location.lng(),
        },
        zoom: 14,
        mapId: `Maps-${day.day}`,
      });

      // 하루동안의 마커 생성
      for (let id of day.placeId) {
        const markerId = await geocodePlaceId(id);

        let coor = {
          lat: markerId.geometry.location.lat(),
          lng: markerId.geometry.location.lng(),
        };
        arr.push(coor);
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: newMap,
          position: coor,
        });
      }

      // 마커 라인 그리기
      if (arr.length > 1) {
        const flightPath = new google.maps.Polyline({
          path: arr,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
          map: newMap,
        });
      }
      setMap(newMap);
    };
    showMap();
  }, []);

  // 주소 받기
  const geocodePlaceId = (placeId) => {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ placeId }, (results, status) => {
        if (status === "OK" && results[0]) {
          resolve(results[0]);
        } else {
          reject(status);
        }
      });
    });
  };

  console.log(day);
  return (
    <div className={style.main}>
      {/* 지도 보여주기 */}
      <div
        className={style.map}
        ref={Mapref}
        id="map"
        style={{ width: "500px", height: "500px" }}
      ></div>

      <div className={style.lists}>
        {/* 했던일 보여주기 컴포넌트 */}
        <ContentList
          id={id}
          day={day}
          names={day.place}
          contents={day.content}
          coors={day.placeId}
          imgList={day.daysImg}
        />
      </div>
    </div>
  );
}
