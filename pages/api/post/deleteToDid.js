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
    const contents = newDay.content;
    let newContent = [];
    const placeId = newDay.placeId;
    let newPlaceId = [];
    const place = newDay.place;
    let newPlace = [];

    for (let i = 0; i < contents.length; i++) {
      if (i === req.body.idx) continue;
      newContent.push(contents[i]);
    }

    for (let i = 0; i < placeId.length; i++) {
      if (i === req.body.idx) continue;
      newPlaceId.push(placeId[i]);
    }

    for (let i = 0; i < place.length; i++) {
      if (i === req.body.idx) continue;
      newPlace.push(place[i]);
    }
    if (newPlace.length === 0) {
      newPlace.push("");
    }
    if (newPlaceId.length === 0) {
      newPlaceId.push("ChIJrUQcQuuifDUR-IWAEQylVek");
    }
    newDay.content = newContent;
    newDay.place = newPlace;
    newDay.placeId = newPlaceId;

    await db
      .collection("travelPost")
      .updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: { [`days.${ThisDay}`]: newDay } }
      );
  }
  res.status(200).json("삭제 완료");
}
