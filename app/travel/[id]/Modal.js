import Img from "./img";
import style from "./Modal.module.css";

export default function Modal({ img, setModal }) {
  return (
    <div className={style.main}>
      <div className={style.wall}></div>
      <h1
        className={style.btn}
        onClick={() => {
          setModal(false);
        }}
      >
        X
      </h1>
      <div className={style.imgs}>
        {img.map((name, idx) => (
          <Img key={idx} img={name} />
        ))}
      </div>
    </div>
  );
}
