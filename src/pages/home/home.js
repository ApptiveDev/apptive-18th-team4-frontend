import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGeoLocation from '../geolocation/useGeoLocation';
import './home.css';

export default function Home() {
    const [select, setSelect] = useState('거리순');

    /*현재 위치 가져오기 */
    const location = useGeoLocation();
    const [lat, setLat] = useState('');
    const [lang, setLang] = useState('');

    useEffect(() => {
        setLat(location.coordinates.lat);
        setLang(location.coordinates.lang);
    })

    /*현재 위치를 마커로 표시 */
    const { kakao } = window;

    useEffect(() => {
        drawMap();
    });

    const drawMap = () => {
        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(lat, lang),
            level: 3,
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
        <div>
            <div className="top_container">
                {/*상단 navbar*/}
                <div style={{padding: '0 14%'}} className='home_nav'>
                    <Link to="/"><img src='./assets/img/navbar_logo.png' className='logo'/></Link>
                    <Link to="/nearBuilding">빈 강의실 찾기</Link>
                    <Link to="/annualPlan">학사일정</Link>
                    <Link to="/announcement">공지사항</Link>
                    <div className='button_container'>
                        <Link to="/signup">
                            <button className='home'>Sign Up</button>
                        </Link>
                        <button className='logout'>Log Out</button>
                    </div>
                </div>
                {/*상단 로고, 아이콘*/}
                <div className="sub_container">
                    <div style={{}}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '7.125rem',
                            height: '7.125rem',
                            background: '#fff',
                            borderRadius: '0.8125rem', 
                        }}>
                            <img src="/assets/img/logo_home2.png" />
                        </div>

                        <div style={{display: 'flex'}}>
                            <div>
                                <div style={{
                                    width: '30rem',
                                    color: '#13005E',
                                    fontSize: '4rem',
                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    padding: '2.44rem 0'
                                }}>
                                    부산대 알리미
                                </div>
                                <div style={{
                                    color: '#FFF',
                                    fontSize: '1.5rem'
                                }}>
                                    여러분의 소중한 시간을 지켜드리는
                                </div>
                            </div>
                            <div style={{display: 'flex', alignItems: 'flex-end'}}>
                                <a href='#s1'>
                                    <div className='shortcutBtn'>
                                        <img src="/assets/img/home_icon1.png" />
                                        빈 강의실 찾기
                                    </div>
                                </a>
                                <a href='#s2'>
                                    <div className='shortcutBtn'>
                                        <img src="/assets/img/home_icon2.png" />
                                        학사일정
                                    </div>
                                </a>
                                <a href='#s3'>
                                    <div className='shortcutBtn'>
                                        <img src="/assets/img/home_icon3.png" />
                                        공지사항
                                    </div>
                                </a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            
            <div style={{padding: '0 14%'}}>
                <div id="s1" className='section1'>
                    <div className='section1_top'>
                        <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '1.5rem',
                                fontWeight: '600',
                                width: '40%',
                            }}>
                            <img src="/assets/img/home_icon1_black.png"
                                style={{marginRight: '0.87rem'}} />
                            빈 강의실 찾기
                        </div>
                        <div style={{
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            color: '#A4A4A4',
                            cursor: 'pointer'
                        }}>
                            <span onClick={() => setSelect('거리순')}
                                style={{color: select === '거리순' ? 'black' : '#A4A4A4', marginRight: '2.69rem'}}>
                                    거리순
                            </span>
                            <span onClick={() => setSelect('즐겨찾기')}
                                style={{color: select === '즐겨찾기' ? 'black' : '#A4A4A4'}}>
                                    즐겨찾기
                            </span>
                        </div>
                    </div>
                    

                    {select === '거리순' &&
                        <div>
                            <div id="map" style={{ width: "500px", height: "500px" }}>

                            </div>
                        </div>
                    }

                    {select === '즐겨찾기' &&
                        <div>
                            즐겨찾기
                            <div id="map" style={{ width: "500px", height: "500px" }}>

                            </div>
                        </div>
                    }

                </div>


                <div id="s2">학사일정</div>
                <div id="s3">공지사항</div>

            </div>

        </div>
    )
}