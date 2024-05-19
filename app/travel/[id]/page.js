import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";

import AddDate from "./addDate";
import ThisDay from "./thisDay";
import Link from "next/link";
import Likse from "./likes";
import ImgModal from "./imgModal";
import style from "./page.module.css";

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
  let last_day = 0;
  if (result.days.length != 0) {
    last_day = result.days.length;
  }

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
        <Link className={style.home} href="/">
          홈
        </Link>
        <form action="/api/post/deleteTravel" method="POST">
          <input
            className={style.none}
            name="id"
            defaultValue={props.params.id}
            readOnly={true}
          />
          <button className={style.btn}>여행 삭제</button>
        </form>
        <Likse
          isprivate={result.private}
          like={result.like}
          id={props.params.id}
          email={session.user.email}
        />
      </div>
      <h1>{result.title}</h1>
      <AddDate last={last_day} id={props.params.id} />
      <ImgModal img={Imgs} />
      {result.days.length === 0 ? (
        <h1>스케줄을 추가 하세요</h1>
      ) : (
        result.days.map((item, idx) => (
          <div>
            <form action="/api/post/deleteDate" method="POST">
              <input
                className={style.none}
                name="id"
                defaultValue={props.params.id}
                readOnly={true}
              />
              <input
                className={style.none}
                name="idx"
                defaultValue={idx}
                readOnly={true}
              />
              <button className={style.btn}>하루 삭제</button>
            </form>
            <ThisDay key={idx} id={props.params.id} day={item} />
          </div>
        ))
      )}
    </div>
  );
}
