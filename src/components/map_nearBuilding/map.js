import { useEffect } from 'react';

export default function Map({lat, lang}) {
    /*현재 위치를 마커로 표시 */
    const { kakao } = window;

    useEffect(() => {
        drawMap();
    }, [lat, lang]);

    const drawMap = () => {
        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(lat, lang),
            level: 2,
        };
        
        const map = new kakao.maps.Map(container, options);

        // 마커가 표시될 위치
        let markerPosition = new kakao.maps.LatLng(
            lat,
            lang
        );

        // 마커 생성
        let marker = new kakao.maps.Marker({
            position: markerPosition,
        });

        // 지도 위에 마커 표시
        marker.setMap(map);
    }

    return (
        <div id="map" 
            style={{
                width: '48%',
                height: '20rem',
                borderRadius: '0.5rem'
            }}>
        </div>
    )
}