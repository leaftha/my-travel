import { ObjectId } from 'mongodb';
import { connectDB } from '@/util/database.js';

import AddDate from './addDate';
import ThisDay from './thisDay';

export default async function Detail(props) {
    let db = (await connectDB).db('travel');
    let result = await db.collection('travelPost').findOne({ _id: new ObjectId(props.params.id) });
    let last_day = 0;
    if (result.days.length != 0) {
        last_day = result.days.length;
    }

    return (
        <div>
            <h1>{result.title}</h1>
            <AddDate last={last_day} id={props.params.id} />
            {result.days.length === 0 ? (
                <h1>스케줄을 추가 하세요</h1>
            ) : (
                result.days.map((item, idx) => <ThisDay key={idx} id={props.params.id} day={item} />)
            )}
        </div>
    );
}
