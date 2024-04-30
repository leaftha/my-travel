"use client";

import { useState } from "react";

import { ref, uploadBytes } from "firebase/storage";
import storage from "@/firebase/storage";
import { v4 as uuid } from "uuid";

export default function Test() {
  const [inputimage, setInputImage] = useState();

  const onClickUploadB = async () =>
    // 버튼 클릭시 스토리지에 이미지 업로드 및 파이어스토어에 데이터 등록
    {
      const uploadFileName = uuid() + ".png";
      console.log(uploadFileName);

      if (inputimage === null) return;
      const imageRef = ref(storage, `images/${uploadFileName}`);
      uploadBytes(imageRef, inputimage);
    };

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          type="file"
          onChange={(event) => {
            setInputImage(event.target.files[0]);
          }}
        />

        <button onClick={onClickUploadB}> 업로드 </button>
      </form>
    </div>
  );
}
