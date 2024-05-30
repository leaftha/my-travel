"use client";
import { useState, useEffect, useRef } from "react";
import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import ImgUploader from "./imgUploader";
import { getStorage, ref, deleteObject } from "firebase/storage";
import storage from "@/firebase/storage";
import Img from "./img";
import style from "./Map.module.css";

export default function Maps({ day, id }) {
  const [map, setMap] = useState(null);
  const [place, setPlace] = useState(day.placeId[0]);
  const [coors, setCoors] = useState([...day.placeId]);
  // const [markers, setMarkers] = useState([...day.placeId]);
  const [name, setName] = useState(day.place[0]);
  const [names, setNames] = useState([...day.place]);
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([...day.content]);
  const [imgList, setImgList] = useState([...day.daysImg]);
  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.NEXT_PUBLIC_API,
    });

  const Mapref = useRef();

  useEffect(() => {
    const showMap = async () => {
      let arr = [];
      const curPlace = await geocodePlaceId(place);
      const newMap = new google.maps.Map(Mapref.current, {
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
  }, [place, coors, imgList]);

  const deletContent = (idx) => {
    setContents(contents.filter((item, index) => index != idx));
    setCoors(coors.filter((item, index) => index != idx));
    setNames(names.filter((item, index) => index != idx));

    // firebase에서 이미지 삭제
    for (let img of imgList[idx]) {
      const desertRef = ref(storage, `images/${img}`);
      deleteObject(desertRef)
        .then(() => {
          console.log("delete success");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // 현재 이미지 배열 내의 이미지 삭제
    const newImgList = [...imgList];
    newImgList.splice(idx, 1);
    setImgList(newImgList);
  };

  // 이미지 url 반환 받기
  const getImg = (name, idx) => {
    let newArr = [...imgList];
    newArr[idx].push(name);
    setImgList([...newArr]);
  };

  // 주소 받기
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
    <div className={style.main}>
      <div
        ref={Mapref}
        id="map"
        style={{ width: "500px", height: "500px" }}
      ></div>
      <div className={style.lists}>
        <div className={style.inputs}>
          <h1 className={style.title}>To Did</h1>
          {/* 주소 입력 창 */}
          <label>주소 입력</label>
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
          {/* 했던 일 입력 창 */}
          <label>내용 입력</label>
          <textarea
            className={style.todidInput}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          {/* 주소 and 했던일 추가 버튼 */}
          <button
            className={style.btn}
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
              setImgList([...imgList, []]);
              setContents([content, ...contents]);
              setContent("");
            }}
          >
            입력
          </button>
        </div>
        {/* 했던일 보여주기 */}
        {contents.length === 0 ? (
          <h1>했던일을 입력하세요</h1>
        ) : (
          contents.map((item, idx) => (
            <div className={style.content} key={idx}>
              {/* 했던일 삭제 버튼 */}
              <div className={style.delete}>
                <button
                  className={style.delteBtn}
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
                </button>
              </div>
              <div className={style.contentMain}>
                <h1>{names[idx]}</h1>
                <h1>{item}</h1>
              </div>
              {/* 이미지 업로드 기능 */}
              <ImgUploader fuc={getImg} day={day} idx={idx} id={id} />

              {/* 이미지 리스트 보여주기 */}
              {imgList[idx].map((name, index) => (
                <Img key={index} img={name} />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
