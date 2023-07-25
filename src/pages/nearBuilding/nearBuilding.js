import { useState, useEffect } from "react";
import Navbar from "../../components/nav_bar/nav_bar";
import Modal_nearBuilding from "../../components/modal_nearBuilding/modal";
import Tab from "../../components/tab/tab";
import Map from "../../components/map_nearBuilding/map";
import Search from "../../components/search/search";
import './nearBuilding.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

export default function NearBuilding() {
    const [isLogin, setIsLogin] = useState(false);
    const [selectedTime, setTime] = useState('');
    const timeZones = ['0.5', '1', '2', '3'];

    const [category, setCategory] = useState('위치순');

    useEffect(() => {
        if (localStorage.getItem('accessToken') !== null) {
            setIsLogin(true)
        }
    }, [isLogin]);

    const [selectedBuilding, setSelectedBuilding] = useState('');

    const handleBuildingSelect = (buildingName) => {
        setSelectedBuilding(buildingName);
    };

    // Tab 컴포넌트에 전달할 state와 state를 변경하는 콜백 함수 정의
    const [modalData, setModalData] = useState([]);

    const handleModalData = (buildingData) => {
        setModalData(buildingData);
    };

    /*두 지점 사이 이동 시간 및 거리 계산*/

    return(
        <div style={{background: '#F9F9F9'}}>
            <Navbar />
            <div className="nearBuilding">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{
                        fontSize: '2.25rem',
                        fontWeight: '600'
                    }}>
                        빈 강의실 찾기
                    </span>  

                    {isLogin && <div style={{display: 'flex'}}>
                        <div 
                            className={category === '위치순' ? "category-btn-clicked": "category-btn" }
                            onClick={() => setCategory('위치순')}>위치순</div>
                        <div 
                            className={category === '즐겨찾기순' ? "category-btn-clicked": "category-btn" }
                            onClick={() => setCategory('즐겨찾기순')}>즐겨찾기순</div>
                    </div>}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Modal_nearBuilding handleModalData={handleModalData} />
                    <Search onBuildingSelect={handleBuildingSelect} />
                </div>

                <Tab selectedBuilding={selectedBuilding} modalData={modalData} />

                <div style={{marginTop: '2.25rem', width: '100%'}}>
                    <label style={{fontWeight: '600', fontSize: '1.5rem'}}>현재 위치</label>
                    <div style={{display: 'flex', marginTop: '0.5rem'}}>
                        <Map />
                        <div className="shortest-path-container">
                            <div style={{padding: '2.5rem 12%', borderBottom: '1px solid #D9D9D9'}}>
                                <div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.125rem'}}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="23" viewBox="0 0 20 23" fill="none">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3641 3.54729C19.8786 6.9524 19.8786 12.4432 16.3641 15.8483L10 22L3.63588 15.8495C0.121373 12.4444 0.121373 6.95364 3.63588 3.54853C5.31862 1.91771 7.60962 1.00023 9.99973 1C12.3898 0.999768 14.681 1.9168 16.3641 3.54729Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5648 9.44192C13.5417 11.399 11.935 12.9691 9.971 12.9538C8.00704 12.9384 6.4252 11.3435 6.43283 9.38624C6.44045 7.429 8.03467 5.84633 9.99868 5.84619C11.9797 5.85807 13.5761 7.46775 13.5648 9.44192Z" fill="#A7AFEF" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                                            </svg>
                                            <label style={{marginLeft: '1.25rem'}}>거리순</label>
                                        </div>
                                        <span style={{color: '#BBB', fontWeight: '600'}}>{modalData && modalData.length > 0 ? modalData[0].buildingName : ''}</span>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '1.25rem', fontWeight: '600', marginTop: '1.25rem'}}>
                                        3 min 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none" style={{margin: '0 0.5rem'}}>
                                            <circle cx="2" cy="2" r="2" fill="#D9D9D9"/>
                                        </svg>
                                        0.3 km
                                    </div>
                                </div>
                            </div>

                            <div style={{padding: '2.5rem 12%'}}>
                                <div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.125rem'}}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                                                <path d="M11 1.61804L12.9941 7.75532L13.1064 8.10081H13.4697H19.9228L14.7021 11.8939L14.4082 12.1074L14.5205 12.4529L16.5146 18.5902L11.2939 14.7971L11 14.5836L10.7061 14.7971L5.48542 18.5902L7.47954 12.4529L7.5918 12.1074L7.29791 11.8939L2.07722 8.10081H8.53035H8.89362L9.00587 7.75532L11 1.61804Z" stroke="#00045F"/>
                                            </svg>
                                            <label style={{marginLeft: '1.25rem', width: '5rem'}}>즐겨찾기</label>
                                        </div>
                                        {isLogin ? (
                                            <span style={{color: '#BBB', fontWeight: '600'}}>제6공학관 6208</span>
                                        ) : (
                                            <span style={{color: '#BBB', fontWeight: '600'}}>로그인 후 조회 가능합니다.</span>
                                        )}  
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '1.25rem', fontWeight: '600', marginTop: '1.25rem'}}>
                                        {isLogin && <>
                                            7min
                                            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none" style={{margin: '0 0.5rem'}}>
                                                <circle cx="2" cy="2" r="2" fill="#D9D9D9"/>
                                            </svg>
                                            2 km
                                        </>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}