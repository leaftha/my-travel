"use client";
import { useState, useEffect, useRef } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";

export default function Maps() {
  const [map, setMap] = useState(null);
  const [place, setPlace] = useState("");
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.NEXT_PUBLIC_API,
    });
  const ref = useRef();
  useEffect(() => {
    const newMap = new google.maps.Map(ref.current, {
      center: { lat: 37.569227, lng: 126.9777256 },
      zoom: 16,
    });

    setMap(newMap);
  }, []);

  console.log(placePredictions, isPlacePredictionsLoading);
  return (
    <div>
      <input
        value={place}
        onChange={(e) => {
          getPlacePredictions({ input: e.target.value });
          // setChosen(e.target.value);
          setPlace(e.target.value);
        }}
      />
      <div ref={ref} id="map" style={{ width: "400px", height: "400px" }}></div>
    </div>
  );
}
