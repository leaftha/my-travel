'use client';

import { Wrapper } from '@googlemaps/react-wrapper';
import Maps from './Maps';
import { useState } from 'react';

export default function ThisDay({ day, id }) {
    const [money, setMoney] = useState(day.money);
    return (
        <div>
            <h1>{day.day}</h1>
            <h1>{money}</h1>

            <Wrapper apiKey={process.env.NEXT_PUBLIC_API} libraries={['places', 'marker']}>
                <Maps id={id} day={day} />
            </Wrapper>
        </div>
    );
}
