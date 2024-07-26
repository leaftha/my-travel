"use client";

import { Wrapper } from "@googlemaps/react-wrapper";
import Maps from "./Maps";
import { useEffect, useState } from "react";

import style from "./thisDay.module.css";

export default function ThisDay({ num, day, id, current }) {
  const [money, setMoney] = useState(`${day.money}`);

  const moneyChanger = (money) => {
    const formattedMoney = parseInt(money, 10).toLocaleString();
    setMoney(formattedMoney);
  }

  return (
    <div className={current === num ? style.main : style.none}>
      <div className={style.moneybody}>
        <label className={style.title}>지출 : </label>
        <input
          className={style.inputbox}
          type="number"
          onChange={(e) => {
            setMoney(e.target.value);
          }}
        />
        <button
          className={style.btn}
          onClick={() => {
            fetch("/api/post/addDateMoney", {
              method: "POST",
              body: JSON.stringify({
                id: id,
                day: day.day,
                money: money,
              }),
            });
            moneyChanger(money)
          }}
        >
          입력
        </button>
        <h1 className={style.money}>{money} 원</h1>
      </div>

      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_API}
        libraries={["places", "marker"]}
      >
        <Maps id={id} day={day} />
      </Wrapper>
    </div>
  );
}
