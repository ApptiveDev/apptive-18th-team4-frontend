import { useState, useEffect } from 'react';
import sampleData from './data.json';
import './tab.css';
import { instance } from '../ApiContoller';

function Tab ({ selectedBuilding }) {
    const [data, setData] = useState(sampleData);
    console.log(data)

    /*로그인 여부 판단 */
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('accessToken') !== null) {
            setIsLogin(true)
        }
    }, [isLogin]);

    /*선택한 tab을 selectedTab에 저장 */
    const [selectedTab, setSelectedTab] = useState(data[0].buildingName);

    const handleTabClick = (tabID) => {
        setSelectedTab(tabID);
    }

    /*선택한 tab의 정보 보여주기*/
    const clickedData = data.filter((item) => item.buildingName === selectedTab);

    /*즐겨찾기 */
    const handleLike = (name) => {
        if (!isLogin) {
            alert("즐겨찾기는 로그인 후 가능합니다.");
        }
        else {
            instance.post(`/api/nearest-buildings/${name}/like`)
            .then((res) => alert(res.data))
            .catch((err) => console.log(err));
        }
    }

    /*tab 닫기 */
    const handleRemoval = (name) => {
        if (data.length === 1) alert("더이상 삭제할 수 없습니다.")
        else {
            const updatedData = data.filter((item) => item.buildingName !== name);
            setData(updatedData);
        }
    }

    /*tab 추가하기*/
    useEffect(() => {
        if (selectedBuilding) {
            //수정 필요 (추가한 tab으로 요청 보내기)
            //instance.post(``)
            setData((prevData) => [
                ...prevData, 
                {
                    "buildingName": selectedBuilding,
                    "availableNow": [
                        {
                            "roomNum": "6201",
                            "endTime": "18:30"
                        },
                        {
                            "roomNum": "8202",
                            "endTime": "18:40"
                        },
                        {
                            "roomNum": "8203",
                            "endTime": "18:50"
                        }
                    ],
                    "availableSoon": [
                        {
                            "roomNum": "9301",
                            "startTime": "15:00",
                            "endTime": "17:30"
                        },
                        {
                            "roomNum": "9302",
                            "startTime": "16:15",
                            "endTime": "17:40"
                        },
                        {
                            "roomNum": "9203",
                            "startTime": "16:30",
                            "endTime": "17:40"
                        }
                    ],
                    "buildingLat": 35.2331519630294,
                    "buildingLng": 129.084216965962
                }
            ]);
        }
    }, [selectedBuilding])

    /*tab 닫은 후 selectedTab을 남은 data 중 첫 번째 data의 건물명으로 변경*/
    useEffect(() => {
        setSelectedTab(data[0].buildingName); 
    }, [data]);

      console.log(data)
    return ( 
        <div className='tab' style={{ marginTop: '2rem' }}>
            <ul>
                <li style={{display: 'flex'}}>
                    {data !== null && data.map((item) => (
                        <li 
                            style={{background: selectedTab === item.buildingName ? '#fff' : '#E2E2E2'}}
                            onClick={() => handleTabClick(item.buildingName)}>
                                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                    <div>
                                        <svg onClick={() => handleLike(item.buildingName)} style={{marginRight: '0.2rem'}} xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 22 20" fill="none">
                                            <path d="M11 0L13.4697 7.60081H21.4616L14.996 12.2984L17.4656 19.8992L11 15.2016L4.53436 19.8992L7.00402 12.2984L0.538379 7.60081H8.53035L11 0Z" fill="#00045F"/>
                                        </svg>
                                        {item.buildingName}
                                    </div>
                            
                                    <div>
                                        <svg onClick={() => handleRemoval(item.buildingName)} xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13 13" fill="none">
                                            <rect width="15.6333" height="1.56333" rx="0.781663" transform="matrix(0.707111 -0.707102 0.707111 0.707102 6.10352e-05 11.0542)" fill="#150000"/>
                                            <rect width="15.6333" height="1.56333" rx="0.781663" transform="matrix(0.707111 0.707102 -0.707111 0.707102 1.10547 0.000244141)" fill="#150000"/>
                                        </svg>
                                    </div>
                                </div>
                        </li>
                    ))}
                </li>

                <div className="room-num-container" >
                    <div style={{width: '50%', overflowY: 'scroll'}}>
                        <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '3.75rem', fontWeight: '500', fontSize: '1.125rem'}}>
                            <span>현재 빈 강의실 목록</span>
                            <span>사용 가능한 시간</span>
                        </div>
                        {clickedData.length !==0 && clickedData[0].availableNow.map((item) => (
                            <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '1.25rem', fontWeight: '600', fontSize: '1.25rem'}}>
                                <div>{item.roomNum}</div>
                                <div>~ {item.endTime}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{width: '50%', overflowY: 'scroll'}}>
                        <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '3.75rem', fontWeight: '500', fontSize: '1.125rem'}}>
                            <span>수업이 곧 끝나는 강의실</span>
                            <span>사용 가능한 시간</span>
                        </div>
                        {clickedData.length !==0 && clickedData[0].availableSoon.map((item) => (
                            <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '1.25rem', fontWeight: '600', fontSize: '1.25rem'}}>
                                <div style={{width: '11.4rem', textAlign: 'center'}}>{item.roomNum}</div>
                                <div style={{}}>{item.startTime} ~ {item.endTime}</div>
                            </div>
                        ))}
                    </div>
                </div>
            
            </ul>
        
        </div>

    );
}
  
export default Tab;
