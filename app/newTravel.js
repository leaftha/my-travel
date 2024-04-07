"use client";

import { useState } from "react";

export default function NewTravel({ user }) {
  let [clicked, setClicked] = useState(false);
  function modal() {
    setClicked(!clicked);
  }
  return (
    <div>
      <button onClick={modal}>추가</button>

      {clicked ? (
        <div>
          <form action="/api/post/newTravel" method="POST">
            <input
              name="email"
              readOnly={true}
              defaultValue={user.user.email}
            />
            <input name="title" placeholder="제목을 입력해 주세요" />
            <input name="menber" type="number" min={1} />
            <input name="money" type="number" min={1} />원
            <button type="submit">작성</button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
