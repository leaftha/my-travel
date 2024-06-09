"use client";

import { Wrapper } from "@googlemaps/react-wrapper";
import Maps from "./Maps";
import style from "./thisDay.module.css";
import { useEffect, useState } from "react";

export default function ThisDay({ num, day, id, current }) {
  const [money, setMoney] = useState(day.money);
  const [value, setValue] = useState("");
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
    setValue(changeMoney.join(""));
  }, []);
  return (
    <div className={current === num ? style.main : style.none}>
      <h1 className={style.money}>{value} 원</h1>
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_API}
        libraries={["places", "marker"]}
      >
        <Maps id={id} day={day} />
      </Wrapper>
    </div>
  );
}
