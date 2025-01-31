"use client";

import style from "./imgUploader.module.css";

export default function ImgUploader({ setInputImage }) {
  return (
    <div>
      <label className={style.Imginput} htmlFor="input-file">
        이미지 추가
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
  );
}
