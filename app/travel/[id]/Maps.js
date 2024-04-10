"use client";
import { useState, useEffect, useRef } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";

export default function Maps({ day, id }) {
  const [map, setMap] = useState(null);
  const [place, setPlace] = useState(day.placeId[0]);
  const [name, setName] = useState(day.place[0]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([...day.content]);

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

  function deletContent(idx) {
    setContents(contents.filter((item, index) => index != idx));
  }
  return (
    <div>
      <div ref={ref} id="map" style={{ width: "400px", height: "400px" }}></div>
      {name === "" ? <h1>선택하세요</h1> : <h1>{name}</h1>}
      <div>
        <h1>To Did</h1>

        {/* 주소 입력 창 */}
        <input
          onChange={(e) => {
            getPlacePredictions({ input: e.target.value });
          }}
        />
        {/* 주소 자동 완성  */}
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
        <hr></hr>
        {/* 했던 일 입력 창 */}
        <input
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        {/* 주소 and 했던일 추가 버튼 */}
        <button
          onClick={() => {
            fetch("/api/post/addPlaceData", {
              method: "POST",
              body: JSON.stringify({
                id: id,
                day: day.day,
                content: content,
                placeId: place,
                name: name,
              }),
            });
            setContents([content, ...contents]);
            setContent("");
          }}
        >
          입력
        </button>
        {/* 했던일 보여주기 */}
        {contents.length === 0 ? (
          <h1>했던일을 입력하세요</h1>
        ) : (
          contents.map((item, idx) => (
            <div key={idx}>
              <h1>{item}</h1>
              {/* 했던일 삭제 버튼 */}
              <h1
                onClick={() => {
                  fetch("/api/post/deleteToDid", {
                    method: "POST",
                    body: JSON.stringify({
                      id: id,
                      day: day.day,
                      contents: [...contents],
                      idx: idx,
                    }),
                  });
                  deletContent(idx);
                }}
              >
                X
              </h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
