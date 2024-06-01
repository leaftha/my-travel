"use client";

import { useEffect, useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import storage from "@/firebase/storage";
import { v4 as uuid } from "uuid";

import style from "./imgUploader.module.css";

export default function ImgUploader({ fuc, idx, day, id }) {
  const [inputimage, setInputImage] = useState([]);
  const [modal, setModal] = useState(false);
  // const [isDragging, setIsDragging] = useState(false);
  // const [imgUrl, setImgUrl] = useState("");

  const onClickUploadB = async () =>
    // 버튼 클릭시 스토리지에 이미지 업로드 및 파이어스토어에 데이터 등록
    {
      for (let img of inputimage) {
        const uploadFileName = idx + uuid() + ".png";
        if (img === null) return;
        const imageRef = ref(storage, `images/${uploadFileName}`);
        uploadBytes(imageRef, img).then((image) => {
          // 이미지 업로드 후 이미지 url 상위 컴포넌트에 보내기
          fuc(uploadFileName, idx);
        });

        await fetch("/api/post/addImg", {
          method: "POST",
          body: JSON.stringify({
            id: id,
            day: day.day,
            idx: idx,
            name: uploadFileName,
          }),
        });
      }
    };
  return (
    <div className={style.main}>
      <button
        // className={style.btn}
        onClick={() => {
          setModal(!modal);
        }}
      >
        이미지 추가 하기
      </button>
      {modal && (
        <div className={style.imgs}>
          <label className={style.Imginput} htmlFor="input-file">
            이미지를 추가 하세요
          </label>
          <input
            id="input-file"
            className={style.none}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              setInputImage([...e.target.files]);
            }}
          />
          <button className={style.btn} onClick={onClickUploadB}>
            업로드
          </button>
        </div>
      )}
    </div>
  );
}
