import { connectDB } from "@/util/database";
import Link from "next/link";
import LineMaps from "./lineMaps";

export default async function List({ user }) {
  let db = (await connectDB).db("travel");
  let result = await db
    .collection("travelPost")
    .find({ private: true })
    .toArray();
  return (
    <div>
      {result.map((item, idx) => (
        <div key={idx}>
          <Link href={`/travel/${item._id}`}>{item.title}</Link>
          <h1>Money : {item.money}</h1>
          <h1>Menber : {item.menber}</h1>
          {item.days.length === 0 ? (
            <h1>일정 입력이 필요</h1>
          ) : (
            <LineMaps day={result[idx].days} />
          )}
        </div>
      ))}
    </div>
  );
}
