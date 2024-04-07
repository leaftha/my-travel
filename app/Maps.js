"use client";
import { useState, useEffect, useRef } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";

export default function Maps({ day, id }) {
  const [map, setMap] = useState(null);
  const [place, setPlace] = useState();
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.NEXT_PUBLIC_API,
    });
  const ref = useRef();
  const refMarker = useRef();
  useEffect(() => {
    const newMap = new google.maps.Map(ref.current, {
      center: { lat: 0, lng: 0 },
      zoom: 14,
    });
    // const marker = new google.maps.marker.AdvancedMarkerElement({
    //   map: newMap,
    //   position: { lat: lat, lng: lng },
    // });

    setMap(newMap);
  }, [place]);
  return (
    <div>
      <div ref={ref} id="map" style={{ width: "400px", height: "400px" }}>
        <div ref={refMarker}></div>
      </div>
    </div>
  );
}
