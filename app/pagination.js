"use client";

import { useEffect, useState } from "react";

import style from "./pagination.module.css";

export default function Pagination({ trip, setCurrentPage }) {
  const [maxLength, setMaxLength] = useState(
    Array.from({ length: Math.ceil(trip.length / 6) }, (_, index) => index + 1)
  );
  const [current, setCurrent] = useState(0);
  const [paginArr, setPaginArr] = useState([
    ...maxLength.slice(current * 5, (current + 1) * 5),
  ]);

  useEffect(() => {
    setPaginArr(maxLength.slice(current * 5, (current + 1) * 5));
  }, [current, maxLength]);

  return (
    <div className={style.main}>
      <ul className={style.list}>
        <li
          onClick={() => {
            if (current != 0) {
              setCurrent(current - 1);
            }
          }}
          className={style.btn}
        >
          {"<"}
        </li>
        {paginArr.map((item, idx) => (
          <li
            key={`${idx}페이지`}
            className={style.btn}
            onClick={() => {
              setCurrentPage(item - 1);
            }}
          >
            {item}
          </li>
        ))}
        <li
          onClick={() => {
            if (current != Math.floor(maxLength.length / 5)) {
              setCurrent(current + 1);
            }
          }}
          className={style.btn}
        >
          {">"}
        </li>
      </ul>
    </div>
  );
}
