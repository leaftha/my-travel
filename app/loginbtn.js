"use client";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";

import style from "./loginbtn.module.css";

export default function LoginBtn({ session }) {
  return (
    <div className={style.btnDiv}>
      {session ? (
        <button
          className={style.btn}
          onClick={() => {
            signOut();
          }}
        >
          로그아웃
        </button>
      ) : (
        <button
          className={style.btn}
          onClick={() => {
            signIn();
          }}
        >
          로그인
        </button>
      )}
    </div>
  );
}
