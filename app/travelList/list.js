"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import LineMaps from "./lineMaps";
import Pagination from "../pagination";
import style from "./list.module.css";
import SelectTravel from "./selectTravel";

export default function List({ travel }) {
  const [travelData, setTravelData] = useState({
    changetravel: [...travel],
    travelList: travel.slice(0, 6),
    currentPage: 0,
    sort: "fast",
  });

  const setSort = (sort) =>
    setTravelData((prevState) => ({ ...prevState, sort }));
  const setChangetravel = (changetravel) =>
    setTravelData((prevState) => ({ ...prevState, changetravel }));
  const setTravelList = (travelList) =>
    setTravelData((prevState) => ({ ...prevState, travelList }));
  const setCurrentPage = (currentPage) =>
    setTravelData((prevState) => ({ ...prevState, currentPage }));

  useEffect(() => {
    let sortedTravel;
    if (travelData.sort === "like") {
      sortedTravel = [...travel].sort((a, b) => b.like - a.like);
    } else if (travelData.sort === "fast") {
      sortedTravel = [...travel];
    }

    setChangetravel(sortedTravel);
    setTravelList([
      ...sortedTravel.slice(
        travelData.currentPage * 6,
        (travelData.currentPage + 1) * 6
      ),
    ]);
  }, [travelData.currentPage, travelData.sort]);
  return (
    <div className={style.main}>
      <div className={style.btnlist}>
        <SelectTravel setSort={setSort} />
      </div>
      <div className={style.body}>
        <div className={style.list}>
          {travelData.travelList.map((item, idx) => (
            <div className={style.item} key={idx}>
              <Link className={style.title} href={`/travelDetail/${item._id}`}>
                {item.title}
              </Link>
              <h1 className={style.money}>Money : {item.money}</h1>
              <h1 className={style.menber}>Menber : {item.menber}</h1>
              {item.days.length === 0 ? (
                <h1 className={style.title}>아직 입력 중입니다.</h1>
              ) : (
                <LineMaps num={idx} day={item.days} />
              )}
            </div>
          ))}
        </div>
      </div>
      <Pagination trip={travel} setCurrentPage={setCurrentPage} />
    </div>
  );
}
