import Link from "next/link";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
import { connectDB } from "@/util/database";

import NewTravel from "./newTravel";
import TravelList from "./travelList";
import style from "./page.module.css";
import Landing from "./landing";

export default async function Home() {
  let session = await getServerSession(authOptions);
  let result;
  if (session) {
    let db = (await connectDB).db("travel");

    result = await db
      .collection("travelPost")
      .find({ email: session.user.email })
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
  }
  return (
    <div className={style.body}>
      {session ? (
        <>
          <NewTravel user={session} />
          <TravelList travel={result} />
        </>
      ) : (
        <>
          <Landing />
        </>
      )}
    </div>
  );
}
