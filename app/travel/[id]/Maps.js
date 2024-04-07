"use client";
import { useState, useEffect, useRef } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";

export default function Maps({ day, id }) {
  const [map, setMap] = useState(null);
  const [place, setPlace] = useState(day.placeId);
  const [name, setName] = useState(day.place);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.NEXT_PUBLIC_API,
    });
  const ref = useRef();
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
      <button
        onClick={() => {
          fetch("/api/post/addPlaceData", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              day: day.day,
              placeId: place,
              name: name,
            }),
          });
        }}
      >
        선택
      </button>
      {placePredictions.length != 0
        ? placePredictions.map((item, idx) => (
            <h1
              key={idx}
              onClick={(e) => {
                setPlace(item.place_id);
                setName(item.description);
              }}
            >
              {item.description}
            </h1>
          ))
        : ""}
      <div ref={ref} id="map" style={{ width: "400px", height: "400px" }}></div>
      {name === "" ? <h1>선택하세요</h1> : <h1>{name}</h1>}
    </div>
  );
}
