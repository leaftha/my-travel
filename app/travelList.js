import { connectDB } from "@/util/database";

export default async function TravelList({ user }) {
  let db = (await connectDB).db("travel");
  let result = await db
    .collection("travelPost")
    .find({ email: user.user.email })
    .toArray();
  console.log(result);
  return (
    <div>
      {result.map((item, idx) => (
        <li>post</li>
      ))}
    </div>
  );
}
