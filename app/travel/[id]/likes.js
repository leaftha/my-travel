"use client";

export default function Likse({ email, id }) {
  return (
    <div>
      <button
        onClick={() => {
          fetch("/api/post/upLikes", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              id: id,
            }),
          });
        }}
      >
        좋아요
      </button>
    </div>
  );
}
