import style from "./notauth.module.css";

export default function NotAuth() {
  return (
    <div className={style.main}>
      <h1>
        로그인 <br />
        상태가 아닙니다.
      </h1>
    </div>
  );
}
