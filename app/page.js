import Link from "next/link";
import LoginBtn from "./loginbtn";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
import NewTravel from "./newTravel";
import TravelList from "./travelList";
import Navbar from "./navbar";

export default async function Home() {
  let session = await getServerSession(authOptions);

  return (
    <div>
      <Navbar />
      {session ? <div>로그인</div> : <div>로그인 X</div>}

      <Link href="/travelList">여행 리스트</Link>
      {session ? <NewTravel user={session} /> : ""}
      {session ? <TravelList user={session} /> : ""}
    </div>
  );
}
