"use client";

import style from "./imgUploader.module.css";

export default function ImgUploader({ setInputImage }) {
  return (
    <div className={style.main}>
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
    </div>
  );
}
