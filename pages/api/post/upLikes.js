import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    req.body = JSON.parse(req.body);
    let db = (await connectDB).db("travel");
    console.log(req.body);
    let obj = await db
      .collection("travelPost")
      .findOne({ _id: new ObjectId(req.body.id) });
    await db
      .collection("travelPost")
      .updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: { like: obj.like + 1 } }
      );
    let user = await db
      .collection("user_id")
      .findOne({ email: req.body.email });
    let likesArr = user.likes;
    likesArr.push(req.body.id);
    await db
      .collection("user_id")
      .updateOne({ email: req.body.email }, { $set: { likes: likesArr } });
    //     let NewDays = obj.days[ThisDay];
    //     if (NewDays.place[0] === "") {
    //       NewDays.placeId[0] = req.body.placeId;
    //       NewDays.place[0] = req.body.name;
    //     } else {
    //       NewDays.placeId.unshift(req.body.placeId);
    //       NewDays.place.unshift(req.body.name);
    //     }
    //     NewDays.content.unshift(req.body.content);
  }
  res.status(200).json("추가 완료");
}
