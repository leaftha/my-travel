"use client";

import { useState } from "react"

export default function Pagination({ trip, setCurrentPage }) {
    let [maxLength, setMaxLength] = useState(Math.ceil(trip.length/6))

    return (
        <div>
            {[...Array(maxLength)].map((item,idx) => (
                <div key={`${idx}페이지`} onClick={() => {
                    setCurrentPage(idx)
                }}>{idx+1}</div>
            ))}
        </div>
    )
}