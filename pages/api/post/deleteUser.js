import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let db = (await connectDB).db("travel");
    await db.collection("user_id").deleteOne({ email: req.body.email });
  }
  res.status(200).redirect(302, "/");
}
