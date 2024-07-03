'use client'
import style from "./changeSort.module.css"

export default function ChangeSort({changetype, setChangType}) {
    
    const clickHandle = () => {
        setChangType(!changetype)
    }
    return (
        <div className={style.main}>
            <button className={style.btn} onClick={clickHandle}>{changetype ? "최신" : "과거"}</button> 
        </div>
    )
}