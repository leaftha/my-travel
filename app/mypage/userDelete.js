"use client";
import { signOut } from "next-auth/react";

import style from "./userDelete.module.css";

export default function UserDelete({ email }) {
  return (
    <form className={style.main} action="/api/post/deleteUser" method="POST">
      <input
        className={style.none}
        name="email"
        defaultValue={email}
        readOnly={true}
      />
      <button
        className={style.btn}
        onClick={() => {
          signOut();
        }}
      >
        회원 탈퇴
      </button>
    </form>
  );
}
