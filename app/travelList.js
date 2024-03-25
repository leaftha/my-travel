import { connectDB } from "@/util/database";

export default async function TravelList({ user }) {
  let db = (await connectDB).db("travel");
  let result = await db
    .collection("travelPost")
    .find({ email: user.user.email })
    .toArray();
  return (
    <div>
      {result.map((item, idx) => (
        <li>{item.title}</li>
      ))}
    </div>
  );
}
