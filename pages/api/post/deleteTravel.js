import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    let db = (await connectDB).db("travel");

    await db
      .collection("travelPost")
      .deleteOne({ _id: new ObjectId(req.body.id) });
  }
  res.status(200).redirect(302, "/");
}
