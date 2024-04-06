"use client";

import { useEffect, useState } from "react";

export default function ToDId({ day, id }) {
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([...day.content]);

  function deletContent(idx) {
    setContents(contents.filter((item, index) => index != idx));
  }

  return (
    <div>
      <h1>To Did</h1>
      <input
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <button
        onClick={() => {
          fetch("/api/post/addToDid", {
            method: "POST",
            body: JSON.stringify({ id: id, day: day.day, content: content }),
          });
          setContents([content, ...contents]);
          setContent("");
        }}
      >
        입력
      </button>
      {contents.length === 0 ? (
        <h1>했던일을 입력하세요</h1>
      ) : (
        contents.map((item, idx) => (
          <div key={idx}>
            <h1>{item}</h1>
            <h1
              onClick={() => {
                fetch("/api/post/deleteToDid", {
                  method: "POST",
                  body: JSON.stringify({
                    id: id,
                    day: day.day,
                    contents: [...contents],
                    idx: idx,
                  }),
                });
                deletContent(idx);
              }}
            >
              X
            </h1>
          </div>
        ))
      )}
    </div>
  );
}
