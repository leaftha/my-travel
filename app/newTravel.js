"use client";

export default function NewTravel({ user }) {
  return (
    <div>
      <button
        onClick={() => {
          fetch("/api/post/newTravel", {
            method: "POST",
            body: user.user.email,
          });
        }}
      >
        작성
      </button>
    </div>
  );
}
