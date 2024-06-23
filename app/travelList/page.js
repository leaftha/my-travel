import { connectDB } from "@/util/database";

import List from "./list";

export default async function Detail() {
  let db = (await connectDB).db("travel");

  // 공개로 설정한 여행들 검색 ==> 추후 좋아요 순으로 정렬 기능 예정
  let result = await db
    .collection("travelPost")
    .find({ private: true })
    .toArray();

  return (
    <div>
      <List travel={result} />
    </div>
  );
}
