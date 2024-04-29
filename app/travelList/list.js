import { connectDB } from '@/util/database';
import Link from 'next/link';
import LineMaps from './lineMaps';

export default async function List() {
    let db = (await connectDB).db('travel');

    // 공개로 설정한 여행들 검색 ==> 추후 좋아요 순으로 정렬 기능 예정
    let result = await db.collection('travelPost').find({ private: true }).toArray();
    return (
        <div>
            {result.map((item, idx) => (
                <div key={idx}>
                    <Link href={`/travelDetail/${item._id}`}>{item.title}</Link>
                    <h1>Money : {item.money}</h1>
                    <h1>Menber : {item.menber}</h1>
                    {item.days.length === 0 ? <h1></h1> : <LineMaps num={idx} day={result[idx].days} />}
                </div>
            ))}
        </div>
    );
}
