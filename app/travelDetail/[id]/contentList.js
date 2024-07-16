"use client";

import style from "./contentList.module.css";
import { useState } from "react";
import Modal from "./Modal";

export default function ContentList({ names, contents, imgList }) {
  // const [modal, setModal] = useState(false);
  // const [current, setCurrent] = useState();

  const [modalState, setModalState] = useState({
    modal: false,
    current: 0,
  });

  const setModal = (isModal) =>
    setModalState((prev) => ({
      ...prev,
      modal: isModal,
    }));

  return (
    <>
      {contents.length === 0 ? (
        <h1>했던일을 입력하세요</h1>
      ) : (
        contents.map((item, idx) => (
          <div className={style.content} key={idx}>
            <div>
              <h1>{names[idx]}</h1>
            </div>
            <div className={style.contentMain}>
              <p>{item}</p>
              {console.log(contents)}
            </div>

            {/* 이미지 리스트 보여주기 */}
            <h1
              className={style.imgButton}
              onClick={() => {
                setModalState((prev) => ({
                  modal: !prev.modal,
                  current: idx,
                }));

                document.body.classList.add("stop-scroll");
              }}
            >
              이미지 보기
            </h1>
          </div>
        ))
      )}
      {modalState.modal && (
        <Modal img={imgList[modalState.current]} setModal={setModal} />
      )}
    </>
  );
}
