"use client";

import Link from "next/link";
import LineMaps from "./lineMaps";
import style from "./travelList.module.css";
import Pagination from "./pagination";
import { useEffect, useState } from "react";
import ChangeSort from "./changeSort";

export default function TravelList({ travel }) {
  const [changetype,setChangType] = useState(false)
  const [changetravel, setChangetravel] = useState([...travel]);
  const [travelList, setTravelList] = useState([...changetravel.slice(0, 6)]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    let sortedTravel;
    if (!changetype) {
      sortedTravel = [...travel].reverse()
    } else{
      sortedTravel = [...travel];
    }
    setChangetravel(sortedTravel);

    setTravelList([...changetravel.slice(currentPage * 6, (currentPage + 1) * 6)]);
  }, [currentPage, changetype,travel]);
  console.log(changetype)

  return (
    <>
      <ChangeSort changetype={changetype} setChangType={setChangType}/>
      <div className={style.main}>
        {travelList.map((item, idx) => (
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
      <Pagination trip={changetravel} setCurrentPage={setCurrentPage} />
    </>
  );
}
