"use client";

import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import storage from "@/firebase/storage";

import style from "./img.module.css";

export default function Img({ img, width, height }) {
  const [imgurl, setImgurl] = useState();

  useEffect(() => {
    const func = async () => {
      if (img !== undefined) {
        // 이미지 다운 받기
        const reference = ref(storage, `images/${img}`);
        await getDownloadURL(reference).then((x) => {
          setImgurl(x);
        });
      }
    };
    func();
  }, [img]);

  return (
    <div className={style.img}>
      {imgurl ? (
        <Image
          unoptimized={true}
          alt="text"
          width={width}
          height={height}
          src={imgurl}
        />
      ) : (
        <h1>uploading...</h1>
      )}
    </div>
  );
}
