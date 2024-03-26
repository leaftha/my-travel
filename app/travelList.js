import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function TravelList({ user }) {
  let db = (await connectDB).db("travel");
  let result = await db
    .collection("travelPost")
    .find({ email: user.user.email })
    .toArray();
  return (
    <div>
      {result.map((item, idx) => (
        <Link href={`/travel/${item._id}`}>{item.title}</Link>
      ))}
    </div>
  );
}
