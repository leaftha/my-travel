"use client";

import { useState } from "react";
import style from "./newTravel.module.css";

export default function NewTravel({ user }) {
  let [clicked, setClicked] = useState(false);
  function modal() {
    setClicked(!clicked);
    document.body.classList.remove("stop-scroll");
  }
  return (
    <div>
      <button
        className={style.btn}
        onClick={() => {
          modal();
          document.body.classList.add("stop-scroll");
        }}
      >
        추가
      </button>

      {clicked ? (
        <div className={style.modal} onClick={modal}>
          <div className={style.content}>
            <form
              className={style.form}
              onClick={(e) => e.stopPropagation()}
              action="/api/post/newTravel"
              method="POST"
            >
              <input
                className={style.none}
                name="email"
                readOnly={true}
                defaultValue={user.user.email}
              />
              <label className={style.title}>제목</label>
              <input
                className={style.input}
                name="title"
                placeholder="제목을 입력해 주세요"
              />
              <label className={style.title}>인원 수</label>
              <input
                className={style.input}
                name="menber"
                type="number"
                min={1}
              />
              <button className={style.btn} type="submit">
                작성
              </button>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
