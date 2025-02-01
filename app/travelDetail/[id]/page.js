import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";

import Link from "next/link";
import Likse from "./likes";
import ImgModal from "./imgModal";
import DayList from "./dayList";
import style from "./page.module.css";

export default async function Detail(props) {
  let session = await getServerSession(authOptions);
  let db = (await connectDB).db("travel");

  // db에 저장된 현재 id에 해당하는 여행 데이터 검색
  let result = await db
    .collection("travelPost")
    .findOne({ _id: new ObjectId(props.params.id) });
  result._id = result._id.toString();

  // db에 저장된 유저 데이터 검색
  let user = null;
  if (session != null) {
    user = await db
      .collection("user_id")
      .findOne({ email: session.user.email });
    user._id = user._id.toString();
  }

  // 모든 일자 이미지 검색

  let Imgs = [];
  for (let day of result.days) {
    if (day.daysImg.length > 0) {
      let newArray = day.daysImg.reduce(function (prev, next) {
        return prev.concat(next);
      });
      Imgs.push(...newArray);
    }
  }

  return (
    <div className={style.main}>
      <div className={style.content}>
        <div className={style.mainTitle}>
          <h1 className={style.title}>{result.title}</h1>
        </div>
        <Likse like={result.like} user={user} id={props.params.id} />
        <div className={style.btns}>
          <ImgModal img={Imgs} />
        </div>
        <DayList days={result} id={props.params.id} />
      </div>
    </div>
  );
}
