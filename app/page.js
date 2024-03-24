import Link from "next/link";
import LoginBtn from "./loginbtn";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";

export default async function Home() {
  let session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      {session ? <div>로그인</div> : <div>로그인 X</div>}
      <LoginBtn />
      <Link className="register" href="register">
        회원가입
      </Link>
    </div>
  );
}
