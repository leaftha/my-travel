"use client";

import Link from "next/link";

import style from "./likeTravel.module.css";

export default function LikeTravel({ likes }) {
  return (
    <div className={style.main}>
      {likes.map((travel, idx) => (
        <Link
          key={idx}
          className={style.link}
          href={`/travelDetail/${travel._id}`}
        >
          <div className={style.item}>
            <h1>제목 : {travel.title}</h1>
            <h1>총 금액 : {travel.money}</h1>
            <h1>인원 수 : {travel.menber}</h1>
            <h1>좋아요 : {travel.like}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
}
