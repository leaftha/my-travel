import { connectDB } from "@/util/database";
export default async function handler(req, res) {
  if (req.method === "POST") {
    let db = (await connectDB).db("travel");
    await db.collection("travelPost").insertOne({
      email: req.body.email,
      title: req.body.title,
      menber: req.body.menber,
      money: req.body.money,
      like: 0,
      private: true,
      days: [],
    });

    res.status(200).redirect(302, "/");
  }
}
