'use client';

import { useEffect, useState } from 'react';
import style from './likes.module.css';

export default function Likse({ like, email, id, isprivate }) {
    // 게시물의 비공개 여부
    const [isPrivate, setIsPrivate] = useState(isprivate);

    //현 게시물의 좋아요 갯수
    return (
        <div className={style.main}>
            <h1 className={style.num}>좋아요 : {like}</h1>
            <button
                className={style.btn}
                onClick={() => {
                    fetch('/api/post/changePrivate', {
                        method: 'POST',
                        body: JSON.stringify({
                            email: email,
                            id: id,
                            private: !isPrivate,
                        }),
                    });
                    setIsPrivate(!isPrivate);
                }}
            >
                {isPrivate ? '공개' : '비공개'}
            </button>
        </div>
    );
}
