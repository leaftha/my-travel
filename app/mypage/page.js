import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";

import UserDelete from "./userDelete";
import style from "./page.module.css";
import LikeTravel from "./likeTravel";

export default async function Home() {
  let session = await getServerSession(authOptions);
  let db = (await connectDB).db("travel");

  // 유저 정보
  let user = await db
    .collection("user_id")
    .findOne({ email: session.user.email });

    user._id = user._id.toString();

    // 종아요한 포스트 정보
  let likes = [];
  for (let id of user.likes) {
    let travel = await db
      .collection("travelPost")
      .findOne({ _id: new ObjectId(id) });
    travel._id = travel._id.toString();
    likes.push(travel);
  }


  return (
    <div className={style.main}>
      <div className={style.body}>
        <div className={style.navs}>
          <div>
            <h1 className={style.content}>닉네임 : {user.name}</h1>
            <h1 className={style.content}>이메일 : {user.email}</h1>
          </div>
          <UserDelete email={user.email} />
        </div>
        <div className={style.line}></div>
        <h1>좋아요 목록</h1>
        <div className={style.likes}>
          <LikeTravel likes={likes} />
        </div>
      </div>
    </div>
  );
}
