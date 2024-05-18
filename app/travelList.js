import { connectDB } from "@/util/database";
import Link from "next/link";
import LineMaps from "./lineMaps";
import style from "./travelList.module.css";

export default async function TravelList({ user }) {
  let db = (await connectDB).db("travel");
  let result = await db
    .collection("travelPost")
    .find({ email: user.user.email })
    .toArray();
  return (
    <div className={style.main}>
      {result.map((item, idx) => (
        <div className={style.item} key={idx}>
          <Link className={style.title} href={`/travel/${item._id}`}>
            {item.title}
          </Link>
          <h1 className={style.money}>Money : {item.money}</h1>
          <h1 className={style.menber}>Menber : {item.menber}</h1>
          {item.days.length === 0 ? (
            <h1 className={style.need}>일정 입력이 필요</h1>
          ) : (
            <LineMaps num={idx} day={result[idx].days} />
          )}
        </div>
      ))}
    </div>
  );
}
