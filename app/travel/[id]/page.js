import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";

export default async function Detail(props) {
  let db = (await connectDB).db("travel");
  let result = await db
    .collection("travelPost")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <div>
      <h1>{result.title}</h1>
    </div>
  );
}
