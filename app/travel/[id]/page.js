import { ObjectId } from "mongodb";
import { connectDB } from "@/util/database.js";
import AddDate from "./addDate";

export default async function Detail(props) {
  let db = (await connectDB).db("travel");
  let result = await db
    .collection("travelPost")
    .findOne({ _id: new ObjectId(props.params.id) });
  let last_day = 0;
  if (result.days.length != 0) {
    last_day = result.days.length;
  }
  return (
    <div>
      <h1>{result.title}</h1>
      <AddDate last={last_day} id={props.params.id} />
    </div>
  );
}
