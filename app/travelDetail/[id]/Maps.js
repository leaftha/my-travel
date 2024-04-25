'use client';
import { useState, useEffect, useRef } from 'react';
import useGoogle from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

export default function Maps({ day, id }) {
    const [map, setMap] = useState(null);
    const [place, setPlace] = useState(day.placeId[0]);
    const [coors, setCoors] = useState([...day.placeId]);
    // const [markers, setMarkers] = useState([...day.placeId]);
    const [names, setNames] = useState([...day.place]);
    const [contents, setContents] = useState([...day.content]);

    const { placePredictions, getPlacePredictions, isPlacePredictionsLoading } = useGoogle({
        apiKey: process.env.NEXT_PUBLIC_API,
    });

    const ref = useRef();

    useEffect(() => {
        const showMap = async () => {
            let arr = [];
            const curPlace = await geocodePlaceId(place);
            const newMap = new google.maps.Map(ref.current, {
                center: {
                    lat: curPlace.geometry.location.lat(),
                    lng: curPlace.geometry.location.lng(),
                },
                zoom: 14,
                mapId: day.day,
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

            for (let id of coors) {
                const markerId = await geocodePlaceId(id);

                let coor = {
                    lat: markerId.geometry.location.lat(),
                    lng: markerId.geometry.location.lng(),
                };
                arr.push(coor);
                const marker = new google.maps.marker.AdvancedMarkerElement({
                    map: newMap,
                    position: coor,
                });
            }

            // 마커 라인 그리기
            if (arr.length > 1) {
                const flightPath = new google.maps.Polyline({
                    path: arr,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    map: newMap,
                });
            }
            setMap(newMap);
        };
        showMap();
    }, [place, coors]);

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
        <div>
            <div ref={ref} id="map" style={{ width: '400px', height: '400px' }}></div>
            <div>
                <h1>To Did</h1>
                {/* 했던일 보여주기 */}
                {contents.length === 0 ? (
                    <h1>했던일을 입력하세요</h1>
                ) : (
                    contents.map((item, idx) => (
                        <div key={idx}>
                            <h1>
                                {item} - {names[idx]}
                            </h1>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
