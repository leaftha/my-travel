"use client";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function LoginBtn() {
  return (
    <div>
      <button
        onClick={() => {
          signIn();
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          signOut();
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
