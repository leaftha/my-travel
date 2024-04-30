import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
export default async function handler(req, res) {
  if (req.method === "POST") {
    let db = (await connectDB).db("travel");
    await db.collection("travelPost").updateOne(
      { _id: new ObjectId(req.body.id) },
      {
        $push: {
          days: {
            day: Number(req.body.last) + 1,
            money: 0,
            place: [""],
            placeId: ["ChIJrUQcQuuifDUR-IWAEQylVek"],
            content: [],
            daysImg: [],
          },
        },
      }
    );

    res.status(200).redirect(302, `/travel/${req.body.id}`);
  }
}
