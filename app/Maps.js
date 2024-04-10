"use client";

import { useState, useEffect, useRef } from "react";

export default function Maps({ day }) {
  const [map, setMap] = useState(null);
  const [place, setPlace] = useState(day[0].placeId);
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
        zoom: 8,
        mapId: 123,
      });

      for (let i of day) {
        const result = await geocodePlaceId(i.placeId);
        const lat = result.geometry.location.lat();
        const lng = result.geometry.location.lng();
        const line = { lat: lat, lng: lng };
        arr.push(line);
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: newMap,
          position: { lat: lat, lng: lng },
          title: `${i.day}`,
        });
      }

      setMap(newMap);

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
        <div
          onClick={(e) => {
            selectPlace(item.placeId);
          }}
          key={idx}
        >
          <h1>{item.place}</h1>
        </div>
      ))}
    </div>
  );
}
