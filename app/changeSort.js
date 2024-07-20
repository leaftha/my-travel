"use client";
import style from "./changeSort.module.css";

export default function ChangeSort({ changetype, changeTravel }) {
  const clickHandle = () => {
    changeTravel(!changetype);
  };
  return (
    <div className={style.main}>
      <button className={style.btn} onClick={clickHandle}>
        {changetype ? "최신" : "과거"}
      </button>
    </div>
  );
}
