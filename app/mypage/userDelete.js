"use client";
import { signOut } from "next-auth/react";

export default function UserDelete({ email }) {
  return (
    <form action="/api/post/deleteUser" method="POST">
      <input name="email" defaultValue={email} readOnly={true} />
      <button
        onClick={() => {
          signOut();
        }}
      >
        회원 탈퇴
      </button>
    </form>
  );
}
