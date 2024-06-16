import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import { getServerSession } from "next-auth";
import LoginBtn from "./loginbtn";
import Link from "next/link";

import style from "./navbar.module.css";

export default async function Navbar() {
  let session = await getServerSession(authOptions);

  return (
    <nav className={style.navbar}>
      <Link className={style.title} href="/">
        Trip
      </Link>
      <div className={style.logined}>
        {session && (
          <Link className={style.setting} href={`/mypage`}>
            My Page
          </Link>
        )}
        <LoginBtn session={session} />
        {session ? (
          ""
        ) : (
          <Link className={style.register} href="register">
            회원가입
          </Link>
        )}
      </div>
    </nav>
  );
}
