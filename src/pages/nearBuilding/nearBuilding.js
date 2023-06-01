import { useState, useEffect } from "react";
import Navbar from "../../components/nav_bar/nav_bar"

export default function NearBuilding() {
    const [now, setNow] = useState(new Date());

    //현재 시간 실시간 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000); // 1초마다 업데이트

        return () => clearInterval(interval);
    }, []);

    const { kakao } = window;

    const Location=()=>{

        useEffect(()=>{
          var container = document.getElementById('map');
          var options = {
            center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
            level: 3
          };
      
          var map = new kakao.maps.Map(container, options);
          var markerPosition  = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488); 
          var marker = new kakao.maps.Marker({
            position: markerPosition
        });
        marker.setMap(map);
      
          }, [])
        }

    return(
        <div>
            <Navbar />
            <h2>빈 강의실 찾기</h2>
            <div>현재 시각 {now.getHours()}:{now.getMinutes()}</div>
            <div id="map" style={{width:"500px", height:"400px"}}></div>
        </div>
    )
}