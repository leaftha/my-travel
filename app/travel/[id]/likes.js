"use client";

import { useState } from "react";

export default function Likse({ email, id, user }) {
  const [likes, setLikes] = useState([...user.likes]);
  return (
    <div>
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
            setLikes([...likes, id]);
          } else {
          }
        }}
      >
        좋아요
      </button>
    </div>
  );
}
