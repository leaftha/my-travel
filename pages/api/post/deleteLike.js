import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    req.body = JSON.parse(req.body);
    let db = (await connectDB).db("travel");
    let obj = await db
      .collection("travelPost")
      .findOne({ _id: new ObjectId(req.body.id) });
    await db
      .collection("travelPost")
      .updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: { like: obj.like - 1 } }
      );
    let user = await db
      .collection("user_id")
      .findOne({ email: req.body.email });
    let likesArr = user.likes;

    likesArr = likesArr.filter((item, index) => item != req.body.id);

    await db
      .collection("user_id")
      .updateOne({ email: req.body.email }, { $set: { likes: likesArr } });
  }
  res.status(200).json("추가 완료");
}
