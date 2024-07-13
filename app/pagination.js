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

  const [pagin, setPagin] = useState({
    maxLength: Array.from(
      { length: Math.ceil(trip.length / 6) },
      (_, index) => index + 1
    ),
    current: 0,
    paginArr: [],
  });

  useEffect(() => {
    setPagin((prev) => ({
      ...prev,
      paginArr: prev.maxLength.slice(current * 5, (current + 1) * 5),
    }));
  }, [pagin.current, pagin.maxLength]);

  const prevClick = () => {
    if (pagin.current != 0) {
      setPagin((prev) => ({
        ...prev,
        current: prev.current - 1,
      }));
    }
  };

  const nextClick = () => {
    if (pagin.current != Math.floor(pagin.maxLength.length / 5)) {
      setPagin((prev) => ({
        ...prev,
        current: prev.current - 1,
      }));
    }
  };

  return (
    <div className={style.main}>
      <ul className={style.list}>
        <li
          onClick={prevClick}
          className={`${style.btn} ${current === 0 && style.none}`}
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
          onClick={nextClick}
          className={`${style.btn} ${
            current === Math.floor(maxLength.length / 5) && style.none
          }`}
        >
          {">"}
        </li>
      </ul>
    </div>
  );
}
