"use client";
import Maps from "./Maps";
import { Wrapper } from "@googlemaps/react-wrapper";

export default function LineMaps({ num, day }) {
  return (
    <div>
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_API}
        libraries={["places", "marker"]}
      >
        <Maps num={num} day={day} />
      </Wrapper>
    </div>
  );
}
