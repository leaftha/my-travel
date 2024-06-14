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


    let money = []

    for(let day of result) {
      let count = 0
      for(let content of day.days) {
        count += content.money
      }

      let changeMoney = [];
      let newMoney = `${count}`;
      let Mcount = 0;
      for (let i = newMoney.length - 1; i >= 0; i--) {
        changeMoney.unshift(newMoney[i]);
        if (Mcount === 2) {
          changeMoney.unshift(",");
          Mcount = 0;
        } else {
          Mcount++;
        }
      }
      if (changeMoney[0] === ",") {
        changeMoney.shift();
      }
      changeMoney.join("");
      money.push(changeMoney)
    }

  

  return (
    <div className={style.main}>
      {result.map((item, idx) => (
        <div className={style.item} key={idx}>
          <Link className={style.title} href={`/travel/${item._id}`}>
            {item.title}
          </Link>
          <h1 className={style.money}>총 금액 : {money[idx]}원</h1>
          <h1 className={style.menber}>인원수 : {item.menber}</h1>
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
