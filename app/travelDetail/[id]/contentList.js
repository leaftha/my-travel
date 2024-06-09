"use client";

import style from "./contentList.module.css";
import { useState } from "react";
import Modal from "./Modal";

export default function ContentList({ contents, imgList }) {
  const [modal, setModal] = useState(false);
  const [current, setCurrent] = useState();

  return (
    <>
      {contents.length === 0 ? (
        <h1>했던일을 입력하세요</h1>
      ) : (
        contents.map((item, idx) => (
          <div className={style.content} key={idx}>
            <div className={style.contentMain}>
              <p>{item}</p>
            </div>

            {/* 이미지 리스트 보여주기 */}
            <h1
              onClick={() => {
                setModal(!modal);
                setCurrent(idx);
                document.body.classList.add("stop-scroll");
              }}
            >
              이미지 보기
            </h1>
          </div>
        ))
      )}
      {modal && <Modal img={imgList[current]} setModal={setModal} />}
    </>
  );
}
