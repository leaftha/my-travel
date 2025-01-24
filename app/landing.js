'use client';

import { useEffect, useState } from 'react';
import style from './lading.module.css';

const Landing = () => {
    const [currentImg, setCurrentImg] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImg((prev) => (prev + 1) % 5);
        }, 30000);

        return () => clearTimeout(timer);
    }, [currentImg]);

    return (
        <div className={style.imgSlider}>
            <div className={style.des}>
                <h1>MY-Travel</h1>
                <p>자신의 여행을 다른 사람들에게 공유하세요!</p>
            </div>
            {Array.from({ length: 5 }).map((_, idx) => (
                <img
                    src={`/img/main${idx + 1}.jpg`}
                    key={`img${idx}`}
                    className={style.image}
                    style={{
                        opacity: currentImg === idx ? 1 : 0,
                    }}
                />
            ))}
            <div className={style.imgCover}></div>
        </div>
    );
};

export default Landing;
