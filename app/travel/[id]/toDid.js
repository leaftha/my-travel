'use client';

import { useState } from 'react';

export default function ToDId({ day, id }) {
    const [content, setContent] = useState('');
    const [contents, setContents] = useState([...day.content]);
    console.log(contents);
    return (
        <div>
            <h1>To Did</h1>
            <input
                value={content}
                onChange={(e) => {
                    setContent(e.target.value);
                }}
            />
            <button
                onClick={() => {
                    fetch('/api/post/addToDid', {
                        method: 'POST',
                        body: JSON.stringify({ id: id, day: day.day, content: content }),
                    });
                    setContents([content, ...contents]);
                    setContent('');
                }}
            >
                입력
            </button>
            {contents.length === 0 ? <h1>했던일을 입력하세요</h1> : contents.map((item) => <h1>{item}</h1>)}
        </div>
    );
}
