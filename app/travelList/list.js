"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import LineMaps from "./lineMaps";
import Pagination from "../pagination";
import style from "./list.module.css";

export default function List({ travel }) {
  const [travelList, setTravelList] = useState([...travel.slice(0, 6)]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setTravelList([...travel.slice(currentPage * 6, (currentPage + 1) * 6)]);
  }, [currentPage]);

  return (
    <>
      <div className={style.main}>
        {travel.map((item, idx) => (
          <div className={style.item} key={idx}>
            <Link className={style.title} href={`/travelDetail/${item._id}`}>
              {item.title}
            </Link>
            <h1 className={style.money}>Money : {item.money}</h1>
            <h1 className={style.menber}>Menber : {item.menber}</h1>
            {item.days.length === 0 ? (
              <h1>아직 입력 중</h1>
            ) : (
              <LineMaps num={idx} day={travel[idx].days} />
            )}
          </div>
        ))}
      </div>
      <Pagination trip={travel} setCurrentPage={setCurrentPage} />
    </>
  );
}
