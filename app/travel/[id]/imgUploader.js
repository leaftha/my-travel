"use client";

import { useState } from "react";

import style from "./imgUploader.module.css";

export default function ImgUploader({ setInputImage }) {
  const [modal, setModal] = useState(false);
  // const [isDragging, setIsDragging] = useState(false);
  // const [imgUrl, setImgUrl] = useState("");

  return (
    <div className={style.main}>
      {/* <button
        // className={style.btn}
        onClick={() => {
          setModal(!modal);
        }}
      >
        이미지 추가 하기
      </button> */}
      {/* {modal && ( */}
      <div className={style.main}>
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
      </div>
      {/* )} */}
    </div>
  );
}
