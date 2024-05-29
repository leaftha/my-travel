import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";

import Likse from "./likes";
import ImgModal from "./imgModal";
import style from "./page.module.css";
import DayList from "./dayList";

export default async function Detail(props) {
  let session = await getServerSession(authOptions);

  // 로그인 예외 처리
  if (session === null) {
    return NotAuth();
  }
  // 게시물 db
  let db = (await connectDB).db("travel");
  let result = await db
    .collection("travelPost")
    .findOne({ _id: new ObjectId(props.params.id) });

  // 유저 db
  let user = await db
    .collection("user_id")
    .findOne({ email: session.user.email });
  user._id = user._id.toString();

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
      <div className={style.menu}>
        <form action="/api/post/deleteTravel" method="POST">
          <input
            className={style.none}
            name="id"
            defaultValue={props.params.id}
            readOnly={true}
          />
          <button className={style.btn}>여행 삭제</button>
        </form>
      </div>
      <div className={style.content}>
        <h1 className={style.title}>{result.title}</h1>
        <div className={style.btns}>
          <Likse
            isprivate={result.private}
            like={result.like}
            id={props.params.id}
            email={session.user.email}
          />
          <ImgModal img={Imgs} />
        </div>
        <DayList days={result} id={props.params.id} />
      </div>
    </div>
  );
}
