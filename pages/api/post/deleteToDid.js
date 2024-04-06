import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    req.body = JSON.parse(req.body);
    const ThisDay = req.body.day - 1;
    let db = (await connectDB).db("travel");
    let obj = await db
      .collection("travelPost")
      .findOne({ _id: new ObjectId(req.body.id) });
    let newDay = obj.days[ThisDay];
    let contents = newDay.content;
    let newContent = [];
    for (let i = 0; i < contents.length; i++) {
      if (i === req.body.idx) continue;
      newContent.push(contents[i]);
    }
    newDay.content = newContent;
    await db
      .collection("travelPost")
      .updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: { [`days.${ThisDay}`]: newDay } }
      );
  }
}
