"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import LineMaps from "./lineMaps";
import Pagination from "../pagination";
import style from "./list.module.css";
import SelectTravel from "./selectTravel";

export default function List({ travel }) {
  const [changetravel, setChangetravel] = useState([...travel]);
  const [travelList, setTravelList] = useState([...changetravel.slice(0, 6)]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState("fast");

  useEffect(() => {
    // 정렬 기능 정렬 알고리즘은 추후 다른 알고리즘으로 교체
    let sortedTravel;
    if (sort === "like") {
      sortedTravel = [...travel].sort((a, b) => b.like - a.like);
    } else if (sort === "fast") {
      sortedTravel = [...travel];
    }

    setChangetravel(sortedTravel);
    setTravelList([
      ...sortedTravel.slice(currentPage * 6, (currentPage + 1) * 6),
    ]);
  }, [currentPage, sort, travel]);

  return (
    <>
      <SelectTravel setSort={setSort} />
      <div className={style.main}>
        {travelList.map((item, idx) => (
          <div className={style.item} key={idx}>
            <Link className={style.title} href={`/travelDetail/${item._id}`}>
              {item.title}
            </Link>
            <h1 className={style.money}>Money : {item.money}</h1>
            <h1 className={style.menber}>Menber : {item.menber}</h1>
            {item.days.length === 0 ? (
              <h1>아직 입력 중</h1>
            ) : (
              <LineMaps num={idx} day={item.days} />
            )}
          </div>
        ))}
      </div>
      <Pagination trip={travel} setCurrentPage={setCurrentPage} />
    </>
  );
}
