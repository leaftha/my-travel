"use client";
import Maps from "./Maps";
import { Wrapper } from "@googlemaps/react-wrapper";
import style from "./lineMap.module.css";

export default function LineMaps({ day }) {
  return (
    <div className={style.map}>
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_API}
        libraries={["places", "marker"]}
      >
        <Maps day={day}  />
      </Wrapper>
    </div>
  );
}
