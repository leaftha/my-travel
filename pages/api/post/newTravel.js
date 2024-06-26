import { connectDB } from "@/util/database";
export default async function handler(req, res) {
  if (req.method === "POST") {
    let db = (await connectDB).db("travel");
    await db.collection("travelPost").insertOne({
      email: req.body.email,
      title: req.body.title,
      menber: req.body.menber,
      money: 0,
      like: 0,
      private: false,
      days: [],
    });

    res.status(200).redirect(302, "/");
  }
}
