"use client";

import { useEffect, useState } from "react";

import style from "./likes.module.css"

export default function Likse({ like, id, user }) {
  // 유저의 좋아요한 게시물 아이디
  const [likes, setLikes] = useState(user != null ? [...user.likes] : null);
  //현 게시물의 좋아요 갯수
  const [likeNum, setlikeNum] = useState(like);
  return (
    <div className={style.main}>
      <h1 className={style.num}>{likeNum}</h1>
      {user != null ? (
        <button
        className={style.btn}
          onClick={() => {
            if (likes.indexOf(id) === -1) {
              // 유저가 좋아요 하지 않을 경우
              fetch("/api/post/upLikes", {
                method: "POST",
                body: JSON.stringify({
                  email: user.email,
                  id: id,
                }),
              });
              setlikeNum(likeNum + 1);
              setLikes([...likes, id]);
            } else {
              // 유저가 좋아요 했을경우
              fetch("/api/post/deleteLike", {
                method: "POST",
                body: JSON.stringify({
                  email: user.email,
                  id: id,
                }),
              });
              setLikes(likes.filter((item, index) => item != id));
              setlikeNum(likeNum - 1);
            }
          }}
        >
          좋아요
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
