import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";

import AddDate from "./addDate";
import ThisDay from "./thisDay";
import Link from "next/link";
import Likse from "./likes";

export default async function Detail(props) {
  let session = await getServerSession(authOptions);
  let db = (await connectDB).db("travel");
  let result = await db
    .collection("travelPost")
    .findOne({ _id: new ObjectId(props.params.id) });
  let user = await db
    .collection("user_id")
    .findOne({ email: session.user.email });
  user._id = user._id.toString();
  let last_day = 0;
  if (result.days.length != 0) {
    last_day = result.days.length;
  }

  return (
    <div>
      <Link href="/">홈</Link>
      <Likse
        isprivate={result.private}
        like={result.like}
        user={user}
        id={props.params.id}
        email={session.user.email}
      />
      <h1>{result.title}</h1>
      <AddDate last={last_day} id={props.params.id} />
      {result.days.length === 0 ? (
        <h1>스케줄을 추가 하세요</h1>
      ) : (
        result.days.map((item, idx) => (
          <ThisDay key={idx} id={props.params.id} day={item} />
        ))
      )}
    </div>
  );
}
