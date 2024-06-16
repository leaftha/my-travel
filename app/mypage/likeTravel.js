import Link from "next/link";

export default function LikeTravel({ likes }) {
  return (
    <>
      {likes.map((travel, idx) => (
        <div key={idx}>
          <h1>제목 : {travel.title}</h1>
          <h1>총 금액 : {travel.money}</h1>
          <h1>인원 수 : {travel.menber}</h1>
        </div>
      ))}
    </>
  );
}
