import Img from "./img";

export default function Modal({ img }) {
  return (
    <div>
      {img.map((name, idx) => (
        <Img key={idx} img={name} />
      ))}
    </div>
  );
}
