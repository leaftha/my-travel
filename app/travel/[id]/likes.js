"use client";

import { useState } from "react";

export default function Likse({ like, email, id, user }) {
  // 유저의 좋아요한 게시물 아이디
  const [likes, setLikes] = useState([...user.likes]);
  //현 게시물의 좋아요 갯수
  const [likeNum, setlikeNum] = useState(like);
  return (
    <div>
      <h1>{likeNum}</h1>
      <button
        onClick={() => {
          if (likes.indexOf(id) === -1) {
            // 유저가 좋아요 하지 않을 경우
            fetch("/api/post/upLikes", {
              method: "POST",
              body: JSON.stringify({
                email: email,
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
                email: email,
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
    </div>
  );
}
