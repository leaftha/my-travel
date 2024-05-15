import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
import LoginBtn from "./loginbtn";
import Link from "next/link";

export default async function Navbar() {
  let session = await getServerSession(authOptions);

  return (
    <nav>
      <LoginBtn session={session} />
      {session ? (
        ""
      ) : (
        <Link className="register" href="register">
          회원가입
        </Link>
      )}
      {session && <Link href={`/mypage`}>설정</Link>}
    </nav>
  );
}
