import { connectDB } from "@/util/database";

import List from "./list";

export default async function Detail() {
  let db = (await connectDB).db("travel");

  // 공개로 설정한 여행들 검색 ==> 추후 좋아요 순으로 정렬 기능 예정
  let result = await db
    .collection("travelPost")
    .find({ private: true })
    .toArray();

  for (let day of result) {
    let count = 0;
    day._id = day._id.toString();

    for (let content of day.days) {
      count += content.money;
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
    day.money = changeMoney;
  }

  return <List travel={result} />;
}
