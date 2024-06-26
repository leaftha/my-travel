import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    req.body.likes = [];
    const client = await connectDB;
    const db = client.db("travel");
    let foundEmail = await db
      .collection("user_id")
      .findOne({ email: req.body.email });

    if (foundEmail === null) {
      await db.collection("user_id").insertOne(req.body);
      res.status(200).redirect(302, "/");
    } else {
      res.status(409).json({ message: "같은 이메일 존재" });
    }
  } else {
    res.status(405).json({ message: "허용되지 않는 메소드" });
  }
}
