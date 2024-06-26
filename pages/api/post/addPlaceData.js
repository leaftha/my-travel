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

    let NewDays = obj.days[ThisDay];
    if (NewDays.place[0] === "") {
      NewDays.placeId[0] = req.body.placeId;
      NewDays.place[0] = req.body.name;
    } else {
      NewDays.placeId.unshift(req.body.placeId);
      NewDays.place.unshift(req.body.name);
    }
    NewDays.content.unshift(req.body.content);

    if (req.body.imgName.length != 0) {
      NewDays.daysImg.push([...req.body.imgName]);
    }

    await db
      .collection("travelPost")
      .updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: { [`days.${ThisDay}`]: NewDays } }
      );
  }
  res.status(200).json("추가 완료");
}
