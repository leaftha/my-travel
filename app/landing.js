"use client";

import { useEffect, useState } from "react";
import style from "./lading.module.css";

const Landing = () => {
  const [currentimg, setCurrentImg] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCurrentImg(currentimg + 1);
    }, 1000);
  }, []);
  return (
    <div className={style.imgSlider}>
      {Array(5).map((iem, idx) => (
        // <img
        //   src={`./img/main${idx + 1}.jpg`}
        //   key={`img${idx}`}
        //   //   style={currentimg === idx ? { opacity: 1 } : { opacity: 0 }}
        // />
        <h1>{idx}</h1>
      ))}
    </div>
  );
};

export default Landing;
