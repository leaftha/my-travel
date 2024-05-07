"use client";

import { useState } from "react";
import Modal from "./Modal";

export default function ImgModal({ img }) {
  const [modal, setModal] = useState(false);
  return (
    <div>
      {modal || <Modal img={img} />}
      <button
        onClick={() => {
          setModal(!modal);
        }}
      >
        모든 이미지 보기
      </button>
    </div>
  );
}
