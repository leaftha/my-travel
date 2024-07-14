"use client";

import { Wrapper } from "@googlemaps/react-wrapper";
import Maps from "./Maps";
import { useEffect, useState } from "react";

import style from "./thisDay.module.css";

export default function ThisDay({ num, day, id, current }) {
  const [money, setMoney] = useState(`${day.money}`);

  useEffect(() => {
    let changeMoney = [];
    let newMoney = `${money}`;
    let count = 0;
    for (let i = newMoney.length - 1; i >= 0; i--) {
      changeMoney.unshift(newMoney[i]);
      if (count === 2) {
        changeMoney.unshift(",");
        count = 0;
      } else {
        count++;
      }
    }
    if (changeMoney[0] === ",") {
      changeMoney.shift();
    }
    setMoney(changeMoney.join(""));
  }, []);
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
            let changeMoney = [];
            let newMoney = `${money}`;
            let count = 0;
            for (let i = newMoney.length - 1; i >= 0; i--) {
              changeMoney.unshift(newMoney[i]);
              if (count === 2) {
                changeMoney.unshift(",");
                count = 0;
              } else {
                count++;
              }
            }
            if (changeMoney[0] === ",") {
              changeMoney.shift();
            }
            setMoney(changeMoney.join(""));
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
