"use client";
import { useState, useEffect, useRef } from "react";
import style from "./Map.module.css";
import Inputs from "./inputs";
import ContentList from "./contentList";

export default function Maps({ day, id }) {
  const [mapData, setMapData] = useState({
    map: null,
    place: day.placeId[0],
    coors: [...day.placeId],
    names: [...day.place],
    contents: [...day.content],
    imgList: [...day.daysImg],
  });

  const setPlace = (changePlace) =>
    setMapData((prev) => ({ ...prev, place: changePlace }));

  const setCoors = (changeCoors) =>
    setMapData((prev) => ({ ...prev, coors: changeCoors }));

  const setNames = (changeNames) =>
    setMapData((prev) => ({ ...prev, names: changeNames }));

  const setContents = (changeContents) =>
    setMapData((prev) => ({ ...prev, contents: changeContents }));

  const setImgList = (changeImgList) =>
    setMapData((prev) => ({ ...prev, imgList: changeImgList }));

  const Mapref = useRef();

  useEffect(() => {
    const showMap = async () => {
      const arr = [];
      const curPlace = await geocodePlaceId(mapData.place);
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

      for (let id of mapData.coors) {
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

      setMapData((prev) => ({
        ...prev,
        map: newMap,
      }));
    };
    showMap();
  }, [mapData.place, mapData.coors, mapData.imgList]);

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
  // console.log(mapData.place);

  return (
    <div className={style.main}>
      {/* 지도 보여주기 */}
      <div
        className={style.map}
        ref={Mapref}
        id="map"
        style={{ width: "1000px", height: "500px" }}
      ></div>

      <div className={style.lists}>
        {/* 했던일 입력 컴포넌트 */}
        <Inputs
          day={day}
          id={id}
          names={mapData.names}
          setNames={setNames}
          place={mapData.place}
          setPlace={setPlace}
          contents={mapData.contents}
          setContents={setContents}
          coors={mapData.coors}
          setCoors={setCoors}
          imgList={mapData.imgList}
          setImgList={setImgList}
        />
        {/* 했던일 보여주기 컴포넌트 */}
        <ContentList
          id={id}
          day={day}
          names={mapData.names}
          setNames={setNames}
          contents={mapData.contents}
          setContents={setContents}
          coors={mapData.coors}
          setCoors={setCoors}
          imgList={mapData.imgList}
          setImgList={setImgList}
        />
      </div>
    </div>
  );
}
