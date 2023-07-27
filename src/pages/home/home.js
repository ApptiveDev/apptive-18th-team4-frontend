import { React, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGeoLocation from '../geolocation/useGeoLocation';

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { LeftArrow } from './leftArrow.tsx';
import { RightArrow } from './rightArrow.tsx';

import styled from 'styled-components';
import './home.css';
import WeeklyCalendar from './weeklyCalendar';
import { instance } from '../../components/ApiContoller';
//import data from './data.json'

export default function Home() {
    /*로그인, 로그아웃 관련 처리 */
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('accessToken') !== null) {
            setIsLogin(true)
        }
    }, [isLogin]);

    const navigate = useNavigate();
    const handleLogOut = () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        instance.post("/auth/logout", {
            accessToken: accessToken, 
            refreshToken: refreshToken
        })
        setIsLogin(false);
        navigate('/');
        localStorage.clear();
    }

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

    const [locBuildingName, setLocBuildingName] = useState(''); 
    const [likeBuildingName, setLikeBuildingName] = useState('');
    const [roomsByLoc, setRoomByLoc] = useState([]);
    const [roomsByLike, setRoomByLike] = useState([]);
    const [notices, setNotice] = useState([]);

    useEffect(() => {
        const latitude = location.coordinates.lat;
        const longitude = location.coordinates.lang;
        if (location.loaded === true) {
            // 빈 강의실(거리순)
            if (select === '거리순') {
                instance.get(`/api/nearest-buildings/test?user_latitude=${latitude}&user_longitude=${longitude}`)
                    .then((res) => {
                        setLocBuildingName(res.data[0].buildingName); //현재 위치에서 가장 가까운 건물
                        instance.get(`/api/lecture-rooms/available?buildingName=${res.data[0].buildingName}&setTime=60`)
                            .then((response) => setRoomByLoc(response.data.availableNow)) //현재 위치에서 가장 가까운 건물의 사용 가능한 강의실
                            .catch((error) => console.log(error))
                    })
                    .catch((err) => console.log(err));
            }
            // 빈 강의실(즐겨찾기순)
            else {
                instance.get(`/api/lecture-rooms/favorite-list?setTime=60`)
                    .then((res) => {
                        console.log(res.data)
                        setLikeBuildingName(res.data[0].buildingName); //즐겨찾기한 건물 중 현재 위치와 가장 가까운 건물
                        setRoomByLike(res.data[0].availableNow); //즐겨찾기한 건물 중 현재 위치와 가장 가까운 건물의 사용 가능한 강의실
                    })
                    .catch((err) => console.log(err));
            }
        }

        // 공지사항(학지시)
        instance.get('/api/announce/onestop')
            .then((res) => setNotice(res.data.content.slice(0, 3)))
            .catch((err) => console.log(err));
    }, [location, select]);

    return (
        <div className='home'>
            <div className="top_container">
                {/*상단 navbar*/}
                <div style={{padding: '0 14%'}} className='home_nav'>
                    <Link to="/"><img src='./assets/img/logo_white.png' className='logo'/></Link>
                    <Link to="/nearBuilding">빈 강의실 찾기</Link>
                    <Link to="/annualPlan">학사일정</Link>
                    <Link to="/announcement">공지사항</Link>
                    <div className='button_container'>
                    {!isLogin ? (
                        <Link to="/signup">
                            <button className='home'>Sign Up</button>
                        </Link>
                    ) : (
                        <button className='logout' onClick={handleLogOut}>Log Out</button>
                    )}
                    {!isLogin && (
                        <Link to="/login">
                            <button className='logout'>Log In</button>
                        </Link>  
                    )}
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
                            <img src="/assets/img/logo_black.png" />
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
            
            <div style={{background: '#f3f3f3'}}>
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
                    
                    {/* horizontal scroll 구현 실패
                    <Container>
                        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
                            <div style={{display: 'flex'}}>
                                <div className='card-container'>
                                    <div className='card'>
                                        6208
                                    </div>
                                </div>
                            </div>
                        </ScrollMenu>
                    </Container>
                    */}

                    {select === '거리순' &&
                        <div style={{
                            display: 'flex',
                            marginTop: '4.6rem',
                            overflow: 'auto',
                            whiteSpace: 'nowrap'
                            }}>
                            <div className='card-container'>
                                <div id="map" className='card'></div>
                                <span>현재 위치</span>
                            </div>

                            {roomsByLoc.map((item, index) => (
                                <div className='card-container' key={index}>
                                    <div className='card'>
                                        <div style={{fontSize: '2rem', fontWeight: '600', marginLeft: '2.75rem'}}>{locBuildingName}</div>
                                        <div style={{fontSize: '4rem', fontWeight: '600', marginLeft: '2.75rem'}}>{item.roomNum}</div>
                                    </div>
                                    <span>빈 강의실 : {index + 1}순위</span>
                                </div>
                            ))}
                        </div>
                    }

                    {select === '즐겨찾기' &&
                        <div style={{
                            display: 'flex',
                            marginTop: '4.6rem',
                            overflow: 'auto',
                            whiteSpace: 'nowrap'
                            }}>
                            <div className='card-container'>
                                <div id="map" className='card'></div>
                                <span>현재 위치</span>
                            </div>

                            {roomsByLike.map((item, index) => (
                                <div className='card-container' key={index}>
                                    <div className='card'>
                                        <div style={{fontSize: '2rem', fontWeight: '600', marginLeft: '2.75rem'}}>{likeBuildingName}</div>
                                        <div style={{fontSize: '4rem', fontWeight: '600', marginLeft: '2.75rem'}}>{item.roomNum}</div>
                                    </div>
                                    <span>빈 강의실 : {index + 1}순위</span>
                                </div>
                            ))}
                        </div>
                    }

                </div>

                <div id="s2" 
                    className='section2'
                    style={{padding: '1.25rem 14%'}}>
                    <WeeklyCalendar />
                </div>

                <div id="s3" 
                    className='section3'
                    style={{padding: '0 14% 5% 14%'}}>
                    <div className='section3-box'>
                        <div className='section3_top'>
                            <img src="/assets/img/bell_black.png" 
                                style={{
                                    marginRight: '2.6rem'
                                }}/>
                                <div style={{
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    width: '100%'
                                }}>
                                    공지사항
                                    <Link to="/announcement">
                                        <img src="/assets/img/plusButton.png" 
                                            style={{cursor: 'pointer'}}/>
                                    </Link>
                                </div>   
                        </div>
                        
                        <div className='section3_content'>
                            {notices.map((notice, index) => (                                
                                <div className='single-notice'>
                                    <div className='section3_num'>{index + 1}</div>
                                    <div style={{
                                        display: 'flex', 
                                        justifyContent: 'space-between',
                                        width: '90%'}}>
                                        <a href={notice.urls}>
                                            <div>{notice.title}</div>
                                        </a>
                                        <div>
                                            {notice.date}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

const Container = styled.div`  
display: flex;
width: 100%;
flex-direction: row;
align-items: center;
justify-content: space-between;
overflow: hidden;
  .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }
  .react-horizontal-scrolling-menu--scroll-container {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;