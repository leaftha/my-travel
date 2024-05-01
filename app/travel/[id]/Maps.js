"use client";
import { useState, useEffect, useRef } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import ImgUploader from "./imgUploader";

export default function Maps({ day, id }) {
  const [map, setMap] = useState(null);
  const [place, setPlace] = useState(day.placeId[0]);
  const [coors, setCoors] = useState([...day.placeId]);
  // const [markers, setMarkers] = useState([...day.placeId]);
  const [name, setName] = useState(day.place[0]);
  const [names, setNames] = useState([...day.place]);
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([...day.content]);

  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.NEXT_PUBLIC_API,
    });

  const ref = useRef();

  useEffect(() => {
    const showMap = async () => {
      let arr = [];
      const curPlace = await geocodePlaceId(place);
      const newMap = new google.maps.Map(ref.current, {
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

      for (let id of coors) {
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
      setMap(newMap);
    };
    showMap();
  }, [place, coors]);
  const deletContent = (idx) => {
    setContents(contents.filter((item, index) => index != idx));
    setCoors(coors.filter((item, index) => index != idx));
    setNames(names.filter((item, index) => index != idx));
  };

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
  return (
    <div>
      <div ref={ref} id="map" style={{ width: "400px", height: "400px" }}></div>
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
            if (names[0] === "") {
              setCoors([place]);
              setNames([name]);
            } else {
              setCoors([place, ...coors]);
              setNames([name, ...names]);
            }

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
              <h1>
                {item} - {names[idx]}
              </h1>
              {/* 이미지 업로드 기능 */}
              <ImgUploader day={day} idx={idx} id={id} />

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
