import style from "./addDate.module.css";

export default function AddDate({ id, last }) {
  return (
    <form action="/api/post/addDate" method="POST">
      <input
        className={style.none}
        name="id"
        defaultValue={id}
        readOnly={true}
      />
      <input
        className={style.none}
        name="last"
        defaultValue={last}
        readOnly={true}
      />
      <button className={style.btn}>하루 추가</button>
    </form>
  );
}
