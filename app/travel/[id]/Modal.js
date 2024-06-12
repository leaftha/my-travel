"use client";

import { useState } from "react";
import Img from "./img";
import style from "./Modal.module.css";

export default function Modal({ img, setModal }) {
  const [current, setCurrent] = useState(0);

  let imgWidth = window.innerWidth / 2;
  let imgHeight = window.innerHeight / 2;
  return (
    <div className={style.main}>
      <h1
        className={style.btn}
        onClick={() => {
          setModal(false);
          document.body.classList.remove("stop-scroll");
        }}
      >
        X
      </h1>
      <h1
        className={`${style.prev}  ${current === 0 && style.last}`}
        onClick={() => {
          if (current != 0) {
            setCurrent(current - 1);
          }
        }}
      >
        {"<"}
      </h1>
      <div className={style.imgs}>
        {img.map((name, idx) => (
          <div className={idx != current && style.none}>
            <Img key={idx} width={imgWidth} height={imgHeight} img={name} />
          </div>
        ))}
      </div>
      <h1
        className={`${style.next}  ${current === img.length - 1 && style.last}`}
        onClick={() => {
          if (current != img.length - 1) {
            setCurrent(current + 1);
          }
        }}
      >
        {">"}
      </h1>
    </div>
  );
}
