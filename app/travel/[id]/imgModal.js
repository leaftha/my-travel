"use client";

import { useState } from "react";
import Modal from "./Modal";
import style from "./imgModal.module.css";

export default function ImgModal({ img }) {
  const [modal, setModal] = useState(true);
  return (
    <div>
      {modal || <Modal img={img} />}
      <button
        className={style.btn}
        onClick={() => {
          setModal(!modal);
        }}
      >
        모든 이미지 보기
      </button>
    </div>
  );
}
