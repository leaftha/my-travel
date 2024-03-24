import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function handler(Get, Post) {
  if (Get.method == "POST") {
    if (
      Get.body.name === "" ||
      Get.body.email === "" ||
      Get.body.password === ""
    ) {
      Post.status(500).json("빈칸 존재");
    } else {
      let hash = await bcrypt.hash(Get.body.password, 10);
      Get.body.password = hash;
      const client = await connectDB;
      const db = client.db("travel");
      let foundEmail = await db
        .collection("user_id")
        .findOne({ email: Get.body.email });
      if (foundEmail === null) {
        await db.collection("user_id").insertOne(Get.body);
        Post.status(200).redirect(302, "/");
      } else {
        Post.status(500).json("같은 이메일 존재");
      }
    }
  }
}
