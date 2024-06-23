export default function SelectTravel({ setSort }) {
  const handler = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <select onChange={handler}>
        <option key="fast" value="fast">
          최신순
        </option>
        <option key="like" value="like">
          인기순
        </option>
      </select>
    </div>
  );
}
