'use client'

export default function ChangeSort({changetype, setChangType}) {
    
    const clickHandle = () => {
        setChangType(!changetype)
    }
    return (
        <div>
            <button onClick={clickHandle}>{changetype ? "최신" : "과거"}</button> 
        </div>
    )
}