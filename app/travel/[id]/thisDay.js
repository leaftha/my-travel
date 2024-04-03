"use client";

import { Wrapper } from "@googlemaps/react-wrapper";
import Maps from "./Maps";

export default function ThisDay({ day, id }) {
  return (
    <div>
      <h1>{day.day}</h1>
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_API}
        libraries={["places", "marker"]}
      >
        <Maps id={id} day={day} />
      </Wrapper>
    </div>
  );
}
