"use client";
import { useState, useEffect, useRef } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";

export default function Maps({ day }) {
  const [map, setMap] = useState(null);
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.NEXT_PUBLIC_API,
    });
  const ref = useRef();
  useEffect(() => {
    let arr = [];
    for (let i of day) {
      let lat = 0;
      let lng = 0;

      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ placeId: i.placeId }, (result) => {
        lat = result[0].geometry.location.lat();
        lng = result[0].geometry.location.lng();
        console.log(lat, lng);

        const marker = new google.maps.marker.AdvancedMarkerElement({
          map: newMap,
          position: { lat: lat, lng: lng },
        });
      });
    }

    const newMap = new google.maps.Map(ref.current, {
      center: { lat: 0, lng: 0 },
      zoom: 1,
      mapId: 123,
    });

    setMap(newMap);
  }, []);
  console.log(day);
  return (
    <div>
      <div ref={ref} id="map" style={{ width: "400px", height: "400px" }}></div>
    </div>
  );
}
