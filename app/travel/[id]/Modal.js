import Img from "./img";
import style from "./Modal.module.css";

export default function Modal({ img, setModal }) {
  return (
    <div className={style.main}>
      <h1
        className={style.btn}
        onClick={() => {
          setModal(false);
          document.body.classList.remove("stop-scroll");
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
