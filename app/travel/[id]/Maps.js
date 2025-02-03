'use client';
import { useEffect, useRef, useReducer } from 'react';
import style from './Map.module.css';
import Inputs from './inputs';
import ContentList from './contentList';

export default function Maps({ day, id }) {
    const [mapData, dispatch] = useReducer(MapReducer, {
        map: null,
        place: day.placeId[0],
        coors: [...day.placeId],
        names: [...day.place],
        contents: [...day.content],
        imgList: [...day.daysImg],
    });

    const changePlaceHandler = (changePlace) => {
        dispatch({
            type: 'ChangePlace',
            place: changePlace,
        });
    };

    const changeCoorsHandler = (changeCoors) => {
        dispatch({
            type: 'ChangeCoors',
            coors: changeCoors,
        });
    };

    const changeNamesHandler = (changeNames) => {
        dispatch({
            type: 'ChangeNames',
            names: changeNames,
        });
    };

    const changeContentsHandler = (changeContents) => {
        dispatch({
            type: 'ChangeContents',
            contents: changeContents,
        });
    };

    const changeImgListHandler = (changeImgList) => {
        dispatch({
            type: 'ChangeImgList',
            imgList: changeImgList,
        });
    };

    const Mapref = useRef();

    useEffect(() => {
        const showMap = async () => {
            const arr = [];
            const curPlace = await geocodePlaceId(mapData.place);
            const newMap = new google.maps.Map(Mapref.current, {
                center: {
                    lat: curPlace.geometry.location.lat(),
                    lng: curPlace.geometry.location.lng(),
                },
                zoom: 14,
                mapId: `Maps-${day.day}`,
            });

            // 선택한 곳 마커
            const marker = new google.maps.marker.AdvancedMarkerElement({
                map: newMap,
                position: {
                    lat: curPlace.geometry.location.lat(),
                    lng: curPlace.geometry.location.lng(),
                },
            });

            // 하루동안의 마커 생성
            for (let id of mapData.coors) {
                const markerId = await geocodePlaceId(id);
                let coor = {
                    lat: markerId.geometry.location.lat(),
                    lng: markerId.geometry.location.lng(),
                };
                arr.push(coor);
                new google.maps.marker.AdvancedMarkerElement({
                    map: newMap,
                    position: coor,
                });
            }

            // 마커 라인 그리기
            if (arr.length > 1) {
                new google.maps.Polyline({
                    path: arr,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    map: newMap,
                });
            }

            dispatch({
                type: 'setMap',
                map: newMap,
            });
        };
        showMap();
    }, [mapData.place, mapData.contents, mapData.coors, mapData.imgList]);

    const geocodePlaceId = (placeId) => {
        return new Promise((resolve, reject) => {
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ placeId }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    resolve(results[0]);
                } else {
                    reject(status);
                }
            });
        });
    };

    return (
        <div className={style.main}>
            {/* 지도 보여주기 */}
            <div className={`${style.map}`} ref={Mapref} id="map"></div>

            <div className={style.lists}>
                {/* 했던일 입력 컴포넌트 */}
                <Inputs
                    day={day}
                    id={id}
                    names={mapData.names}
                    setNames={changeNamesHandler}
                    place={mapData.place}
                    setPlace={changePlaceHandler}
                    contents={mapData.contents}
                    setContents={changeContentsHandler}
                    coors={mapData.coors}
                    setCoors={changeCoorsHandler}
                    imgList={mapData.imgList}
                    setImgList={changeImgListHandler}
                />
                {/* 했던일 보여주기 컴포넌트 */}
                <ContentList
                    id={id}
                    day={day}
                    names={mapData.names}
                    setNames={changeNamesHandler}
                    contents={mapData.contents}
                    setContents={changeContentsHandler}
                    coors={mapData.coors}
                    setCoors={changeCoorsHandler}
                    imgList={mapData.imgList}
                    setImgList={changeImgListHandler}
                />
            </div>
        </div>
    );
}

function MapReducer(mapData, action) {
    switch (action.type) {
        case 'setMap': {
            return {
                ...mapData,
                map: action.map,
            };
        }
        case 'ChangePlace': {
            return {
                ...mapData,
                place: action.place,
            };
        }
        case 'ChangeCoors': {
            return {
                ...mapData,
                coors: action.coors,
            };
        }
        case 'ChangeNames': {
            return {
                ...mapData,
                names: action.names,
            };
        }
        case 'ChangeContents': {
            return {
                ...mapData,
                contents: action.contents,
            };
        }
        case 'ChangeImgList': {
            return {
                ...mapData,
                imgList: action.imgList,
            };
        }
        default: {
            throw Error('Unknown action Type');
        }
    }
}
