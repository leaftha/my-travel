"use client";

import { useState, useEffect, useRef } from "react";

export default function Maps({ day }) {
  const [map, setMap] = useState(null);
  const [place, setPlace] = useState(day[day.length - 1].placeId.at(-1));
  const [days, setDays] = useState([]);

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
        mapId: 123,
      });

      // 일정의 하루를 모드 반복
      for (let i = 0; i < day.length; i++) {
        for (let j = day[i].placeId.length - 1; j >= 0; j--) {
          const result = await geocodePlaceId(day[i].placeId[j]);
          const lat = result.geometry.location.lat();
          const lng = result.geometry.location.lng();
          const line = { lat: lat, lng: lng };
          arr.push(line);
          // 마커 생성
          const marker = new google.maps.marker.AdvancedMarkerElement({
            map: newMap,
            position: { lat: lat, lng: lng },
            title: `${i + 1} - ${day[i].placeId.length - j}`,
          });
        }
      }

      setMap(newMap);

      // 마커 라인 그리기
      const flightPath = new google.maps.Polyline({
        path: arr,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
        map: newMap,
      });
    };

    fetchCoordinates();
  }, [day, place]);

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
    setPlace(placeId);
  };

  return (
    <div>
      <div ref={ref} id="map" style={{ width: "400px", height: "400px" }}></div>
      {day.map((item, idx) => (
        <div key={idx}>
          <h1>{item.day}</h1>
          {item.place.toReversed().map((places, idx2) => (
            <p
              onClick={() => {
                selectPlace(item.placeId[item.placeId.length - 1 - idx2]);
              }}
              key={idx2}
            >
              {idx2 === 0 && places === ""
                ? "일정을 입력하세요"
                : `${idx2 + 1}-${places}`}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
