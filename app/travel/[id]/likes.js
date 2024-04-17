"use client";

import { useState } from "react";

export default function Likse({ like, email, id, user }) {
  const [likes, setLikes] = useState([...user.likes]);
  const [likeNum, setlikeNum] = useState(like);
  return (
    <div>
      <h1>{likeNum}</h1>
      <button
        onClick={() => {
          if (likes.indexOf(id) === -1) {
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
