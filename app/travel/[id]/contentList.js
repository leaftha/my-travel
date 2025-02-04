"use client";

import { ref, deleteObject } from "firebase/storage";
import storage from "@/firebase/storage";

import style from "./contentList.module.css";
import { useState } from "react";
import Modal from "./Modal";

export default function ContentList({
  day,
  id,
  names,
  setNames,
  contents,
  setContents,
  coors,
  setCoors,
  imgList,
  setImgList,
}) {
  const [modal, setModal] = useState(false);
  const [current, setCurrent] = useState();
  // 내용 삭제하기
  const deletContent = (idx) => {
    setContents(contents.filter((item, index) => index != idx));
    setCoors(coors.filter((item, index) => index != idx));
    setNames(names.filter((item, index) => index != idx));

    // firebase에서 이미지 삭제
    if (imgList[idx].length != 0) {
      for (let img of imgList[idx]) {
        const desertRef = ref(storage, `images/${img}`);
        deleteObject(desertRef)
          .then(() => {
            console.log("delete success");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }

    // 현재 이미지 배열 내의 이미지 삭제
    const newImgList = [...imgList];
    newImgList.splice(idx, 1);
    setImgList(newImgList);
  };
  return (
    <div>
      {contents.length === 0 ? (
        <h1>했던일을 입력하세요</h1>
      ) : (
        contents.map((item, idx) => (
          <div className={style.content} key={idx}>
            {/* 했던일 삭제 버튼 */}
            <div className={style.contentMain}>
              <div className={style.titls}>
                <h1 className={style.title}>{names[idx]}</h1>
                <button
                  className={style.delteBtn}
                  onClick={() => {
                    fetch("/api/post/deleteToDid", {
                      method: "POST",
                      body: JSON.stringify({
                        id: id,
                        day: day.day,
                        contents: [...contents],
                        idx: idx,
                      }),
                    });
                    deletContent(idx);
                  }}
                >
                  X
                </button>
              </div>
              {/* 이미지 리스트 보여주기 */}
              <h1
                onClick={() => {
                  setModal(!modal);
                  setCurrent(idx);
                  document.body.classList.add("stop-scroll");
                }}
                className={style.imgBtn}
              >
                이미지 보기
              </h1>
              <p>{item}</p>
            </div>
          </div>
        ))
      )}
      {modal && <Modal img={imgList[current]} setModal={setModal} />}
    </div>
  );
}
