"use client";

import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useState, useEffect, useRef } from "react";
import ImgUploader from "./imgUploader";
import { ref, uploadBytes } from "firebase/storage";
import storage from "@/firebase/storage";
import { v4 as uuid } from "uuid";

import style from "./inputs.module.css";

export default function Inputs({
  day,
  id,
  names,
  setNames,
  place,
  setPlace,
  contents,
  setContents,
  coors,
  setCoors,
  imgList,
  setImgList,
}) {
  const [name, setName] = useState(day.place[0]);
  const [content, setContent] = useState("");
  const [inputimage, setInputImage] = useState([]);
  const [imgNames, setImgNames] = useState([]);

  const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } =
    useGoogle({
      apiKey: process.env.NEXT_PUBLIC_API,
    });

  // 이미지 url 반환 받기
  const getImg = (name, idx) => {
    let newArr = [...imgList];
    newArr.push([...name]);
    setImgList([...newArr]);
  };

  const onClickUploadB = async () =>
    // 버튼 클릭시 스토리지에 이미지 업로드 및 파이어스토어에 데이터 등록
    {
      for (let img of inputimage) {
        const uploadFileName = contents.length + uuid() + ".png";
        setImgNames([...imgNames, uploadFileName]);
        if (img === null) return;
        const imageRef = ref(storage, `images/${uploadFileName}`);
        uploadBytes(imageRef, img).then((image) => {
          // 이미지 업로드 후 이미지 url 상위 컴포넌트에 보내기
          getImg(uploadFileName, contents.length);
        });
      }
    };
  console.log(day.day, contents.length);
  return (
    <>
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
        {/* 이미지 업로드 기능 */}
        <ImgUploader setInputImage={setInputImage} />
        {/* 주소 and 했던일 추가 버튼 */}
        <div className={style.btns}>
          <button
            className={style.Inputbtn}
            onClick={() => {
              if (inputimage.length != 0) {
                onClickUploadB();
              }
              fetch("/api/post/addPlaceData", {
                method: "POST",
                body: JSON.stringify({
                  id: id,
                  day: day.day,
                  content: content,
                  placeId: place,
                  idx: contents.length,
                  name: name,
                  imgName: imgNames,
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
      </div>
    </>
  );
}
