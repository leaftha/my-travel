"use client";

import { ref, deleteObject } from "firebase/storage";
import storage from "@/firebase/storage";
import Img from "./img";

import style from "./contentList.module.css";

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
  // 내용 삭제하기
  const deletContent = (idx) => {
    setContents(contents.filter((item, index) => index != idx));
    setCoors(coors.filter((item, index) => index != idx));
    setNames(names.filter((item, index) => index != idx));

    // firebase에서 이미지 삭제
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

    // 현재 이미지 배열 내의 이미지 삭제
    const newImgList = [...imgList];
    newImgList.splice(idx, 1);
    setImgList(newImgList);
  };

  return (
    <>
      {contents.length === 0 ? (
        <h1>했던일을 입력하세요</h1>
      ) : (
        contents.map((item, idx) => (
          <div className={style.content} key={idx}>
            {/* 했던일 삭제 버튼 */}
            <div className={style.delete}>
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
            <div className={style.contentMain}>
              <h1>{names[idx]}</h1>
              <h1>{item}</h1>
            </div>

            {/* 이미지 리스트 보여주기 */}
            {imgList[idx].map((name, index) => (
              <Img key={index} img={name} />
            ))}
          </div>
        ))
      )}
    </>
  );
}
