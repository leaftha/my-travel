export default function AddDate({ id, last }) {
  return (
    <form action="/api/post/addDate" method="POST">
      <input name="id" defaultValue={id} readOnly={true} />
      <input name="last" defaultValue={last} readOnly={true} />
      <button>추가</button>
    </form>
  );
}
