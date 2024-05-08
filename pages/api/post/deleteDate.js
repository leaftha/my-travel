import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getStorage, ref, deleteObject } from "firebase/storage";
import storage from "@/firebase/storage";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let db = (await connectDB).db("travel");
    const idx = req.body.idx;
    let obj = await db
      .collection("travelPost")
      .findOne({ _id: new ObjectId(req.body.id) });

    // db에서의 데이터 삭제
    let newDays = [...obj.days];
    newDays.splice(idx, 1);

    // fire base 이미지 삭제
    for (let imgArr of obj.days[idx].daysImg) {
      if (imgArr.length <= 0) continue;
      for (let img of imgArr) {
        const desertRef = ref(storage, `images/${img}`);
        deleteObject(desertRef)
          .then(() => {
            console.log("delete success");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    await db
      .collection("travelPost")
      .updateOne(
        { _id: new ObjectId(req.body.id) },
        { $set: { days: newDays } }
      );
  }
  res.status(200).redirect(302, `/travel/${req.body.id}`);
}
