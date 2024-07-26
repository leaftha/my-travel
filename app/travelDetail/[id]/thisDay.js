"use client";

import { Wrapper } from "@googlemaps/react-wrapper";
import Maps from "./Maps";
import style from "./thisDay.module.css";
import { useEffect, useState } from "react";

export default function ThisDay({ num, day, id, current }) {
  const formattedMoney = day.money.toLocaleString();

  return (
    <div className={current === num ? style.main : style.none}>
      <h1 className={style.money}>{formattedMoney} 원</h1>
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_API}
        libraries={["places", "marker"]}
      >
        <Maps id={id} day={day} />
      </Wrapper>
    </div>
  );
}
