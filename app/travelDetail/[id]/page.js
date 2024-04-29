import { ObjectId } from 'mongodb';
import { connectDB } from '@/util/database.js';
import { authOptions } from '@/pages/api/auth/[...nextauth].js';
import { getServerSession } from 'next-auth';

import ThisDay from './thisDay';
import Link from 'next/link';
import Likse from './likes';

export default async function Detail(props) {
    let session = await getServerSession(authOptions);
    let db = (await connectDB).db('travel');

    // db에 저장된 현재 id에 해당하는 여행 데이터 검색
    let result = await db.collection('travelPost').findOne({ _id: new ObjectId(props.params.id) });

    // db에 저장된 유저 데이터 검색
    let user = null;
    if (session != null) {
        user = await db.collection('user_id').findOne({ email: session.user.email });
        user._id = user._id.toString();
    }

    return (
        <div>
            <Link href="/travelList">리스트</Link>

            {/* 좋아요 기능과 갯수 */}
            <Likse like={result.like} user={user} id={props.params.id} />
            <h1>{result.title}</h1>

            {/* 해당날의 일정들과 지도 */}
            {result.days.length === 0 ? (
                <h1></h1>
            ) : (
                result.days.map((item, idx) => <ThisDay key={idx} id={props.params.id} day={item} />)
            )}
        </div>
    );
}
