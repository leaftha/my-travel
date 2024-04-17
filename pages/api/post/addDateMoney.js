import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    req.body = JSON.parse(req.body);
    let db = (await connectDB).db("travel");
    let obj = await db
      .collection("travelPost")
      .findOne({ _id: new ObjectId(req.body.id) });
    const ThisDay = req.body.day - 1;
    let newDay = obj.days[ThisDay];
    let money = req.body.money;

    newDay.money = money * 1;
    await db
      .collection("travelPost")
      .updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: { [`days.${ThisDay}`]: newDay } }
      );
  }
  res.status(200).json("추가 완료");
}
