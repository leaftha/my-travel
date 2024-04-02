"use client";
import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";

export default function Maps({ day }) {
  const [map, setMap] = useState(null);
  const [place, setPlace] = useState("ChIJrUQcQuuifDUR-IWAEQylVek");
  const [lat, setLat] = useState(37.572389);
  const [lng, setLng] = useState(126.9769117);
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.NEXT_PUBLIC_API,
    });
  const ref = useRef();
  const refMarker = useRef();
  useEffect(() => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ placeId: place }, (result) => {
      setLat(result[0].geometry.location.lat());
      setLng(result[0].geometry.location.lng());
    });

    const newMap = new google.maps.Map(ref.current, {
      center: { lat: lat, lng: lng },
      zoom: 14,
      mapId: day.day,
    });
    const marker = new google.maps.marker.AdvancedMarkerElement({
      map: newMap,
      position: { lat: lat, lng: lng },
    });

    setMap(newMap);
  }, [place, lat, lng]);
  return (
    <div>
      <input
        onChange={(e) => {
          getPlacePredictions({ input: e.target.value });
        }}
      />
      {placePredictions.length != 0
        ? placePredictions.map((item, idx) => (
            <h1
              key={idx}
              onClick={(e) => {
                setPlace(item.place_id);
                console.log(item.place_id, item);
              }}
            >
              {item.description}
            </h1>
          ))
        : ""}
      <div ref={ref} id="map" style={{ width: "400px", height: "400px" }}>
        <div ref={refMarker}></div>
      </div>
    </div>
  );
}
