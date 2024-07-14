"use client";

import { useEffect, useState } from "react";

import style from "./likes.module.css";

export default function Likse({ like, id, user }) {
  const [likeState, setLikeState] = useState({
    userLike: user != null ? [...user.likes] : null,
    likeNum: like,
  });

  return (
    <div className={style.main}>
      <h1 className={style.num}>{likeState.likeNum}</h1>
      {user != null ? (
        <button
          className={style.btn}
          onClick={() => {
            if (likeState.userLike.indexOf(id) === -1) {
              // 유저가 좋아요 하지 않을 경우
              fetch("/api/post/upLikes", {
                method: "POST",
                body: JSON.stringify({
                  email: user.email,
                  id: id,
                }),
              });
              setLikeState((prev) => ({
                userLike: [...prev.userLike, id],
                likeNum: prev.likeNum + 1,
              }));
            } else {
              // 유저가 좋아요 했을경우
              fetch("/api/post/deleteLike", {
                method: "POST",
                body: JSON.stringify({
                  email: user.email,
                  id: id,
                }),
              });
              setLikeState((prev) => ({
                userLike: prev.userLike.filter((item, index) => item != id),
                likeNum: prev.likeNum - 1,
              }));
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
