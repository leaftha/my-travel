'use client';

import { useState } from 'react';
import ThisDay from './thisDay';
import style from './dayList.module.css';

export default function DayList({ days, id }) {
    // 현재 여행 날짜 state
    const [currentDay, setCurrentDay] = useState(0);

    // 마지막 날짜
    let last_day = 0;
    if (days.days.length != 0) {
        last_day = days.days.length;
    }

    return (
        <div className={style.main}>
            <div className={style.daylist}>
                {days.days.length > 0 &&
                    days.days.map((item, idx) => (
                        <h1
                            className={style.daytitle}
                            style={currentDay === idx ? { color: 'black' } : {}}
                            onClick={() => {
                                setCurrentDay(idx);
                            }}
                            key={idx}
                        >
                            {idx + 1}일
                        </h1>
                    ))}
            </div>
            {days.days.length === 0 ? (
                <h1>스케줄을 추가 하세요</h1>
            ) : (
                days.days.map((item, idx) => (
                    <div key={idx}>
                        <ThisDay num={idx} current={currentDay} id={id} day={item} />
                    </div>
                ))
            )}
        </div>
    );
}
