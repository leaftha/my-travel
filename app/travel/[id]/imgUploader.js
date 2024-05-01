"use client";

import { useEffect, useState } from "react";

import { ref, uploadBytes } from "firebase/storage";
import storage from "@/firebase/storage";
import { v4 as uuid } from "uuid";
import Img from "./img";

export default function ImgUploader({ idx, day, id }) {
  const [inputimage, setInputImage] = useState([]);
  const [imgList, setImgList] = useState([...day.daysImg[idx]]);
  const onClickUploadB = async () =>
    // 버튼 클릭시 스토리지에 이미지 업로드 및 파이어스토어에 데이터 등록
    {
      for (let img of inputimage) {
        const uploadFileName = idx + uuid() + ".png";
        if (img === null) return;
        const imageRef = ref(storage, `images/${uploadFileName}`);
        uploadBytes(imageRef, img);

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
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            setInputImage([...e.target.files]);
          }}
        />
        <button onClick={onClickUploadB}>업로드</button>
      </form>
      {imgList.map((name, idx) => (
        <Img key={idx} img={name} />
      ))}
    </div>
  );
}
