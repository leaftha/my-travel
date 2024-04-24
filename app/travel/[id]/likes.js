"use client";

import { useEffect, useState } from "react";

export default function Likse({ like, email, id, user, isprivate }) {
  // 유저의 좋아요한 게시물 아이디
  const [likes, setLikes] = useState([...user.likes]);
  // 게시물의 비공개 여부
  const [isPrivate, setIsPrivate] = useState(isprivate);
  const [privateString, sePrivateString] = useState(
    isPrivate ? "비공개" : "공개"
  );
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
      <button
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
