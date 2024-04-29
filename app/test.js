"use client";

import { useState } from "react";
import firestore from "../firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { v4 as uuid } from "uuid";

export default function Test() {
  const [value, setValue] = useState();

  const onClickUpLoadButton = async () => {
    //    addDoc(collection(db       , "컬렉션이름") , { 추가할 데이터 }
    await addDoc(collection(firestore, `temp`), {
      value,
    });
  };

  const UploadImage = () => {
    const uploadFileName = uuid() + ".png";

    if (inputimage === null) return;
    const imageRef = ref(storage, `images/${uploadFileName}`);
    uploadBytes(imageRef, inputimage);
  };

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        <input onChange={(event) => setValue(event.target.value)} />
        <button onClick={onClickUpLoadButton}>전송</button>
      </form>
    </div>
  );
}
