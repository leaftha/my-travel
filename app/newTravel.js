"use client";

import { useState } from "react";

export default function NewTravel({ user }) {
  let [clicked, setClicked] = useState(false);
  async function onSubmit(e) {
    const formData = new FormData(e.currentTarget);
    const response = await fetch("/api/post/newTravel", {
      method: "POST",
      body: formData,
    });
    console.log(formData, response);

    const data = await response.json();
  }
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
            <br />
            <>추가로 googleMap Api로 여행 경로 작성 데이터 예정</>
            <br />
            <button type="submit">작성</button>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
