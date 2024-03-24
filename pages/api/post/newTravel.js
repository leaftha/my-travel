import { connectDB } from "@/util/database";
export default async function handler(req, res) {
  if (req.method === "POST") {
    let db = (await connectDB).db("travel");
    await db.collection("travelPost").insertOne({ email: req.body });

    res.status(200).redirect(302, "/");
  }
}
