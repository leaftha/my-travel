import { connectDB } from "@/util/database";
export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);
    let db = (await connectDB).db("travel");
    await db
      .collection("travelPost")
      .insertOne({ email: req.body.email, title: req.body.title });

    res.status(200).redirect(302, "/");
  }
}
