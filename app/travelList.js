import { connectDB } from "@/util/database";
import Link from "next/link";
import LineMaps from "./lineMaps";

export default async function TravelList({ user }) {
  let db = (await connectDB).db("travel");
  let result = await db
    .collection("travelPost")
    .find({ email: user.user.email })
    .toArray();
  return (
    <div>
      {result.map((item, idx) => (
        <div>
          <Link href={`/travel/${item._id}`}>{item.title}</Link>
          <LineMaps />
        </div>
      ))}
    </div>
  );
}
