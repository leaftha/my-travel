'use client';

import Link from 'next/link';
import LineMaps from './lineMaps';
import style from './travelList.module.css';
import Pagination from './pagination';
import { useEffect, useReducer, useState } from 'react';
import ChangeSort from './changeSort';
import NewTravel from './newTravel';

export default function TravelList({ travel, session }) {
    const [travelData, dispatch] = useReducer(travelReducer, {
        changetype: true,
        changetravel: [...travel.reverse()],
        travelList: [...travel.slice(0, 6)],
        currentPage: 0,
    });

    // const setChangType = (changetype) =>
    //   setState((prevState) => ({ ...prevState, changetype }));
    // const setChangetravel = (changetravel) =>
    //   setState((prevState) => ({ ...prevState, changetravel }));
    // const setTravelList = (travelList) =>
    //   setState((prevState) => ({ ...prevState, travelList }));
    // const setCurrentPage = (currentPage) =>
    //   setState((prevState) => ({ ...prevState, currentPage }));
    const changeTravel = (type) => {
        dispatch({
            type: 'ChangeType',
            changetype: type,
        });
    };

    const changeCurrentPage = (currentPage) => {
        dispatch({
            type: 'changeCurrentPage',
            changePage: currentPage,
        });
    };

    useEffect(() => {
        let sortedTravel;
        if (!travelData.changetype) {
            sortedTravel = [...travel];
        } else {
            sortedTravel = [...travel].reverse();
        }
        // setChangetravel(sortedTravel);
        dispatch({
            type: 'ChangeTravel',
            Changetravel: sortedTravel,
        });

        dispatch({
            type: 'ChangeTravelList',
            ChangeList: [...sortedTravel.slice(travelData.currentPage * 6, (travelData.currentPage + 1) * 6)],
        });
    }, [travelData.currentPage, travelData.changetype]);

    return (
        <div className={style.main}>
            <div className={style.btnlist}>
                <NewTravel user={session} />
                <ChangeSort changetype={travelData.changetype} changeTravel={changeTravel} />
            </div>
            <div className={style.list}>
                {travelData.travelList.map((item, idx) => (
                    <div className={style.item} key={idx}>
                        <Link className={style.title} href={`/travel/${item._id}`}>
                            {item.title}
                        </Link>
                        <h1 className={style.money}>총 금액 : {item.money}원</h1>
                        <h1 className={style.menber}>인원수 : {item.menber}명</h1>
                        {item.days.length === 0 ? (
                            <h1 className={style.need}>일정 입력이 필요합니다.</h1>
                        ) : (
                            <LineMaps num={idx} day={item.days} />
                        )}
                    </div>
                ))}
            </div>
            <Pagination trip={travelData.changetravel} changeCurrentPage={changeCurrentPage} />
        </div>
    );
}

function travelReducer(travelData, action) {
    switch (action.type) {
        case 'ChangeType': {
            return {
                ...travelData,
                changetype: !travelData.changetype,
            };
        }
        case 'ChangeTravel': {
            return {
                ...travelData,
                changetravel: action.Changetravel,
            };
        }
        case 'ChangeTravelList': {
            return {
                ...travelData,
                travelList: action.ChangeList,
            };
        }
        case 'changeCurrentPage': {
            return {
                ...travelData,
                currentPage: action.changePage,
            };
        }

        default: {
            throw Error('Unkown action Type');
        }
    }
}
