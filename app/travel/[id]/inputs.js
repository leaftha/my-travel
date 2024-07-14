"use client";

import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useState } from "react";
import ImgUploader from "./imgUploader";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  const getImg = (name) => {
    let newArr = [...imgList];
    newArr.push(name);
    setImgList(newArr);
  };

  // 이미지 firebase에 올리기
  const onClickUploadB = async () => {
    const uploadPromises = inputimage.map(async (img) => {
      const uploadFileName = contents.length + uuid() + ".png";
      setImgNames((prevImgNames) => [...prevImgNames, uploadFileName]);
      const imageRef = ref(storage, `images/${uploadFileName}`);
      await uploadBytes(imageRef, img);
      return uploadFileName;
    });

    const uploadedImgNames = await Promise.all(uploadPromises);
    setImgNames(uploadedImgNames);

    // 이미지 업로드 후 이미지 url 상위 컴포넌트에 보내기
    uploadedImgNames.forEach((uploadFileName) => getImg(uploadFileName));
    return uploadedImgNames;
  };

  // conten 이미지와 내용, 주소등이 db 전달
  const handleSubmit = async () => {
    let uploadedImgNames = [];
    if (inputimage.length !== 0) {
      uploadedImgNames = await onClickUploadB();
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
        imgName: uploadedImgNames,
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
  };

  return (
    <>
      <div className={style.inputs}>
        <h1 className={style.title}>To Did</h1>
        {/* 주소 입력 창 */}
        <label className={style.addressTitle}>주소 입력</label>
        <input
          className={style.addressInput}
          onChange={(e) => {
            getPlacePredictions({ input: e.target.value });
          }}
        />
        {/* 주소 자동 완성  */}
        <ul className={style.addressList}>
          {placePredictions.length == 0 ||
            placePredictions.map((item, idx) => (
              <li
                key={idx}
                className={style.address}
                onClick={() => {
                  setPlace(item.place_id);
                  setName(item.description);
                }}
              >
                {item.description}
              </li>
            ))}
        </ul>
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
          <button className={style.Inputbtn} onClick={handleSubmit}>
            입력
          </button>
        </div>
      </div>
    </>
  );
}
