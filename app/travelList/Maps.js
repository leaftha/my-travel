"use client";

import { useState, useEffect, useRef } from "react";
import style from "./Map.module.css";

export default function Maps({ num, day }) {
  const [map, setMap] = useState(null);
  const place = day[day.length - 1].placeId[0];

  const ref = useRef();
  useEffect(() => {
    const fetchCoordinates = async () => {
      let arr = [];
      const thisPlace = await geocodePlaceId(place);
      const newMap = new google.maps.Map(ref.current, {
        center: {
          lat: thisPlace.geometry.location.lat(),
          lng: thisPlace.geometry.location.lng(),
        },
        zoom: 10,
        mapId: `listMap-${num}`,
      });

      // 일정의 하루를 모드 반복
      for (let i = 0; i < day.length; i++) {
        // 그날 하루의 좌표 배열
        let dayline = [];
        for (let j = day[i].placeId.length - 1; j >= 0; j--) {
          const result = await geocodePlaceId(day[i].placeId[j]);
          const lat = result.geometry.location.lat();
          const lng = result.geometry.location.lng();
          const line = { lat: lat, lng: lng };
          dayline.push(line);
          // 마커 생성
          const marker = new google.maps.marker.AdvancedMarkerElement({
            map: newMap,
            position: { lat: lat, lng: lng },
            title: `${i + 1} - ${day[i].placeId.length - j}`,
          });
        }
        arr.push(dayline);
      }

      setMap(newMap);

      // 날짜 마다 의 라인 좌표
      let connectLine = [];
      for (let i = 0; i < arr.length - 1; i++) {
        let line = [arr[i].at(-1), arr[i + 1][0]];
        connectLine.push(line);
      }

      // 하루 동안의 라인 그리기
      for (let coor of arr) {
        const r = Math.random() * (255 - 1) + 1;
        const g = Math.random() * (255 - 1) + 1;
        const b = Math.random() * (255 - 1) + 1;
        const flightPath = new google.maps.Polyline({
          path: coor,
          strokeColor: `rgb(${r},${g},${b})`,
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: newMap,
        });
      }

      // 날짜 사이의 라인 그리기
      for (let coor of connectLine) {
        const flightPath = new google.maps.Polyline({
          path: coor,
          strokeColor: "rgba(1,1,1)",
          strokeOpacity: 1.0,
          strokeWeight: 3,
          map: newMap,
        });
      }
    };

    fetchCoordinates();
  }, []);

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

  const selectPlace = async (placeId) => {
    const clickPlace = await geocodePlaceId(placeId);
    // 새로고침 되지 않고 center 이동
    map.panTo({
      lat: clickPlace.geometry.location.lat(),
      lng: clickPlace.geometry.location.lng(),
    });
  };

  return (
    <div className={style.main}>
      <div ref={ref} id="map" style={{ width: "450px", height: "450px" }}></div>

      <div className={style.list}>
        {day.map((item, idx) => (
          <div className={style.content} key={idx}>
            <h1 className={style.title}>{item.day}</h1>
            {item.place.toReversed().map((places, idx2) => (
              <p
                className={style.content}
                onClick={() => {
                  selectPlace(item.placeId[item.placeId.length - 1 - idx2]);
                }}
                key={idx2}
              >
                {idx2 === 0 && places === "" ? "" : `${idx2 + 1}-${places}`}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
