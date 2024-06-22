"use client";

import { useState } from "react";

import style from "./pagination.module.css";

export default function Pagination({ trip, setCurrentPage }) {
  let [maxLength, setMaxLength] = useState(Math.ceil(trip.length / 6));

  return (
    <div className={style.main}>
      <ul className={style.list}>
        {[...Array(maxLength)].map((item, idx) => (
          <li
            key={`${idx}페이지`}
            className={style.btn}
            onClick={() => {
              setCurrentPage(idx);
            }}
          >
            {idx + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}
