"use client";
import { useState, useEffect, useRef } from "react";
import style from "./Map.module.css";
import Inputs from "./inputs";
import ContentList from "./contentList";

export default function Maps({ day, id }) {
  const [map, setMap] = useState(null);
  const [place, setPlace] = useState(day.placeId[0]);
  const [coors, setCoors] = useState([...day.placeId]);
  // const [markers, setMarkers] = useState([...day.placeId]);
  const [names, setNames] = useState([...day.place]);
  const [contents, setContents] = useState([...day.content]);
  const [imgList, setImgList] = useState([...day.daysImg]);
  const [width, setWidth] = useState(window.innerWidth)

  const Mapref = useRef();

  useEffect(() => {
    const showMap = async () => {
      let arr = [];
      const curPlace = await geocodePlaceId(place);
      const newMap = new google.maps.Map(Mapref.current, {
        center: {
          lat: curPlace.geometry.location.lat(),
          lng: curPlace.geometry.location.lng(),
        },
        zoom: 14,
        mapId: `Maps-${day.day}`,
      });

      // 선택한 곳 마커
      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: newMap,
        position: {
          lat: curPlace.geometry.location.lat(),
          lng: curPlace.geometry.location.lng(),
        },
      });

      // 하루동안의 마커 생성

      for (let id of coors) {
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
    
    if(width > 768) {
      setWidth(width/2)
    }
  }, [place, coors, imgList]);

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

  return (
    <div className={style.main}>
      {/* 지도 보여주기 */}
      <div
        className={style.map}
        ref={Mapref}
        id="map"
        style={{ width:width, height: "500px" }}
      ></div>

      <div className={style.lists}>
        {/* 했던일 입력 컴포넌트 */}
        <Inputs
          day={day}
          id={id}
          names={names}
          setNames={setNames}
          place={place}
          setPlace={setPlace}
          contents={contents}
          setContents={setContents}
          coors={coors}
          setCoors={setCoors}
          imgList={imgList}
          setImgList={setImgList}
        />
        {/* 했던일 보여주기 컴포넌트 */}
        <ContentList
          id={id}
          day={day}
          names={names}
          setNames={setNames}
          contents={contents}
          setContents={setContents}
          coors={coors}
          setCoors={setCoors}
          imgList={imgList}
          setImgList={setImgList}
        />
      </div>
    </div>
  );
}
