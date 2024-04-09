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
    let days = obj.days[ThisDay];
    days.placeId = req.body.placeId;
    days.place = req.body.name;
    await db
      .collection("travelPost")
      .updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: { [`days.${ThisDay}`]: days } }
      );
  }
  res.status(200).json("추가 완료");
}
