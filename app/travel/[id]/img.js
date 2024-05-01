"use client";

import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import storage from "@/firebase/storage";

export default function Img({ img }) {
  const [imgurl, setImgurl] = useState();
  useEffect(() => {
    const func = async () => {
      if (img !== undefined) {
        const reference = ref(storage, `images/${img}`);
        await getDownloadURL(reference).then((x) => {
          setImgurl(x);
        });
      }
    };
    func();
  }, []);
  return (
    <div>
      <Image
        unoptimized={true}
        alt="text"
        width={300}
        height={150}
        src={imgurl}
      />
    </div>
  );
}
