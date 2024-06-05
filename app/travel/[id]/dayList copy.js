// 현재 이 방식은 문제가 있어 해결할떄까지 다른 방식 사용

"use client";

import { useState } from "react";
import ThisDay from "./thisDay";
import style from "./dayList.module.css";

export default function DayList({ days, id, item }) {
  // 현재 여행 날짜 state
  const [currentDay, setCurrentDay] = useState(0);

  // 마지막 날짜
  let last_day = 0;
  if (days.days.length != 0) {
    last_day = days.days.length;
  }

  return (
    <div className={style.main}>
      <div className={style.pages}>
        {days.days.length &&
          days.days.map((item, idx) => (
            <button
              className={style.btn}
              onClick={() => {
                setCurrentDay(idx);
              }}
              key={idx}
            >
              {idx + 1}일
            </button>
          ))}
        <form action="/api/post/addDate" method="POST">
          <input
            className={style.none}
            name="id"
            defaultValue={id}
            readOnly={true}
          />
          <input
            className={style.none}
            name="last"
            defaultValue={last_day}
            readOnly={true}
          />
          <button className={style.btn}>하루 추가</button>
        </form>
      </div>
      {days.days.length === 0 ? (
        <h1>스케줄을 추가 하세요</h1>
      ) : (
        <div>
          <ThisDay key={currentDay} id={id} day={days.days[currentDay]} />
        </div>
      )}
    </div>
  );
}
