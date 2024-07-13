"use client";

import Link from "next/link";
import LineMaps from "./lineMaps";
import style from "./travelList.module.css";
import Pagination from "./pagination";
import { useEffect, useState } from "react";
import ChangeSort from "./changeSort";

export default function TravelList({ travel }) {
  const [state, setState] = useState({
    changetype: true,
    changetravel: [...travel],
    travelList: [...travel.slice(0, 6)],
    currentPage: 0,
  });

  const setChangType = (changetype) =>
    setState((prevState) => ({ ...prevState, changetype }));
  const setChangetravel = (changetravel) =>
    setState((prevState) => ({ ...prevState, changetravel }));
  const setTravelList = (travelList) =>
    setState((prevState) => ({ ...prevState, travelList }));
  const setCurrentPage = (currentPage) =>
    setState((prevState) => ({ ...prevState, currentPage }));

  useEffect(() => {
    let sortedTravel;
    if (!state.changetype) {
      sortedTravel = [...travel];
    } else {
      sortedTravel = [...travel].reverse();
    }
    setChangetravel(sortedTravel);
    setTravelList([
      ...sortedTravel.slice(state.currentPage * 6, (state.currentPage + 1) * 6),
    ]);
  }, [state.currentPage, state.changetype, travel]);

  return (
    <>
      <ChangeSort changetype={state.changetype} setChangType={setChangType} />
      <div className={style.main}>
        {state.travelList.map((item, idx) => (
          <div className={style.item} key={idx}>
            <Link className={style.title} href={`/travel/${item._id}`}>
              {item.title}
            </Link>
            <h1 className={style.money}>총 금액 : {item.money}원</h1>
            <h1 className={style.menber}>인원수 : {item.menber}명</h1>
            {item.days.length === 0 ? (
              <h1 className={style.need}>일정 입력이 필요</h1>
            ) : (
              <LineMaps num={idx} day={item.days} />
            )}
          </div>
        ))}
      </div>
      <Pagination trip={state.changetravel} setCurrentPage={setCurrentPage} />
    </>
  );
}
