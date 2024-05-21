"use client";

import { useEffect, useState } from "react";
import style from "./likes.module.css";

export default function Likse({ like, email, id, isprivate }) {
  // 게시물의 비공개 여부
  const [isPrivate, setIsPrivate] = useState(isprivate);
  const [privateString, sePrivateString] = useState(
    isPrivate ? "비공개" : "공개"
  );
  //현 게시물의 좋아요 갯수
  const [likeNum, setlikeNum] = useState(like);
  return (
    <div>
      <h1 className={style.num}>좋아요 : {likeNum}</h1>
      <button
        className={style.btn}
        onClick={() => {
          fetch("/api/post/changePrivate", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              id: id,
              private: !isPrivate,
            }),
          });
          setIsPrivate(!isPrivate);
          if (privateString === "비공개") {
            sePrivateString("공개");
          } else {
            sePrivateString("비공개");
          }
        }}
      >
        {privateString}
      </button>
    </div>
  );
}
