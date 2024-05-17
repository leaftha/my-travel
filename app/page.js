import Link from 'next/link';
import LoginBtn from './loginbtn';
import { authOptions } from '@/pages/api/auth/[...nextauth].js';
import { getServerSession } from 'next-auth';
import NewTravel from './newTravel';
import TravelList from './travelList';
import style from './page.module.css';

export default async function Home() {
    let session = await getServerSession(authOptions);

    return (
        <div className={style.body}>
            <div className={style.btns}>
                <Link className={style.link} href="/travelList">
                    여행 리스트
                </Link>
                {session ? <NewTravel user={session} /> : ''}
            </div>
            {session ? <TravelList user={session} /> : ''}
        </div>
    );
}
