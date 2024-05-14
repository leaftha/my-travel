import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

import Link from "next/link";

export default async function Home() {
  let session = await getServerSession(authOptions);
  let db = (await connectDB).db("travel");

  // 유저 정보
  let user = await db
    .collection("user_id")
    .findOne({ email: session.user.email });

  // 종아요한 포스트 정보
  let likes = [];
  for (let id of user.likes) {
    let travel = await db
      .collection("travelPost")
      .findOne({ _id: new ObjectId(id) });
    likes.push(travel);
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h1>{user.email}</h1>

      <form action="/api/post/deleteUser" method="POST">
        <input name="email" defaultValue={user.email} readOnly={true} />
        <button>회원 탈퇴</button>
      </form>

      <ul>
        {likes.map((travel, idx) => (
          <div>
            <Link href={`/travelDetail/${travel._id}`}>{travel.title}</Link>
          </div>
        ))}
      </ul>
    </div>
  );
}
