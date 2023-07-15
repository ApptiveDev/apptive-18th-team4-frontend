import { useState, useEffect } from "react";
import Navbar from "../../components/nav_bar/nav_bar";
import Tab from "../../components/tab/tab";
import Map from "../../components/map_nearBuilding/map";
import './nearBuilding.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './data.json';
import useGeoLocation from "../geolocation/useGeoLocation";
import { instance } from "../../components/ApiContoller";

export default function NearBuilding() {
    const [isLogin, setIsLogin] = useState(false);
    const [selectedTime, setTime] = useState('');
    const timeZones = ['0.5', '1', '2', '3'];

    useEffect(() => {
        if (localStorage.getItem('accessToken') !== null) {
            setIsLogin(true)
        }
    }, [isLogin]);
    
    const location = useGeoLocation();
    const [lat, setLat] = useState('');
    const [lang, setLang] = useState('');

    useEffect(() => {
        setLat(location.coordinates.lat);
        setLang(location.coordinates.lang);
    }, [])
    
    let requestURL = '';
    const handleResult = () => {
        if (selectedTime === '') requestURL = `/api/nearest-buildings/byloc?user_latitude=${lat}&user_longitude=${lang}`;
        else requestURL = `/api/nearest-buildings/byloc?user_latitude=${lat}&user_longitude=${lang}&user_settime=${selectedTime * 60}`;
        instance.get(requestURL)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    }

    //console.log(data.slice(0, 3))

    return(
        <div style={{background: '#F9F9F9'}}>
            <Navbar />
            <div className="nearBuilding">
                <span style={{
                    fontSize: '2.25rem',
                    fontWeight: '600'
                }}>
                    빈 강의실 찾기
                </span>    
                <div style={{marginTop: '3rem'}}>
                    <span style={{marginRight: '2rem'}}>내 위치로 가져오기</span>
                    {isLogin && <span>즐겨찾기로 가져오기</span>}
                </div>
                <div className="select-condition">
                    {selectedTime !== '' ? `${selectedTime}시간 이상` : '조건을 설정해주세요'}
                    {/*<img src="/assets/img/arrow_right.png"></img>*/}
                </div>

                <div className="modal_nearbuilding">
                    <div className="container">
                        <label>사용할 시간</label>
                        {timeZones.map((timeZone) => (
                            <div className="dayOfWeek"
                                key={timeZone}
                                onClick={() => setTime(timeZone)}>
                                {timeZone}
                            </div>
                        ))}
                        <label style={{marginLeft: '1.56rem'}}>시간 이상</label>
                        <button className="finish"
                            onClick={handleResult}>
                            조회
                        </button>
                    </div>
                </div>

                <Tab />
                <div style={{marginTop: '5rem'}}>
                    <button className="current-location">현재 위치</button>
                    <Map />
                </div>
                
            </div>
            
        </div>
    )
}