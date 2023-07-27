import { useState, useEffect } from "react";
import './modal.css';
import { instance } from "../ApiContoller";
import useGeoLocation from "../../pages/geolocation/useGeoLocation";
//import data from '../../components/tab/data.json';

export default function Modal_nearBuilding({ onTimeSelect, handleModalData, category }) {
    const [showModal, setShow] = useState(false);
    const dayOfWeeks = ['월', '화', '수', '목', '금'];
    const timeZones = ['0.5', '1', '2', '3'];

    const [selectedDay, setDay] = useState('');
    const [selectedTime, setTime] = useState('');

    const location = useGeoLocation();

    const showData = () => {
        const lat = location.coordinates.lat;
        const lang = location.coordinates.lang;
        if (category === '위치순') {
            instance.get(`/api/lecture-rooms/available-list?user_latitude=${lat}&user_longitude=${lang}&setTime=${selectedTime * 60}`)
                .then((res) => {
                    //console.log(res.data);
                    handleModalData(res.data.slice(0, 3));
                })
                .catch((err) => console.log(err));
        }
        else {
            instance.get(`/api/lecture-rooms/favorite-list?setTime=${selectedTime * 60}`)
                .then((res) => {
                    //console.log(res.data);
                    handleModalData(res.data.slice(0, 3));
                })
                .catch((err) => console.log(err));
        }
    }

    const handleResult = () => {
        setShow(false);
        const lat = location.coordinates.lat;
        const lang = location.coordinates.lang;
        if (selectedTime === '') alert("사용할 시간을 선택해주세요.")
        else {
            if (category === '위치순') {
                instance.get(`/api/lecture-rooms/available-list?user_latitude=${lat}&user_longitude=${lang}&setTime=${selectedTime * 60}`)
                    .then((res) => {
                        //console.log(res.data);
                        handleModalData(res.data.slice(0, 3));
                    })
                    .catch((err) => console.log(err));
            }
            else {
                instance.get(`/api/lecture-rooms/favorite-list?setTime=${selectedTime * 60}`)
                    .then((res) => {
                        //console.log(res.data);
                        handleModalData(res.data.slice(0, 3));
                    })
                    .catch((err) => console.log(err));
            }
        }
    }

    useEffect(() => {
        showData();
    }, [category])

    /*오늘 날짜*/
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0"); 
    const minutes = String(now.getMinutes()).padStart(2, "0"); 
    const currentTime = `${hours}:${minutes}`;

    /*계산한 날짜*/
    const calc = new Date();
    calc.setMinutes(calc.getMinutes() + selectedTime * 60);
    const hours_calc = String(calc.getHours()).padStart(2, "0"); 
    const minutes_calc = String(calc.getMinutes()).padStart(2, "0"); 
    const calcTime = `${hours_calc}:${minutes_calc}`;

    return (
        <div className="condition-container">
            <div className="select-condition" onClick={() => setShow(!showModal)}>
                {/*
                {(selectedDay !== '' || selectedTime !== '') ? `${selectedDay}${selectedTime !== '' ? ` [ ${selectedTime}시간 이상 ]` : ''}` : '조건을 설정해주세요'}
                */}
                {selectedTime !== '' ? `${currentTime} ~ ${calcTime} ( ${selectedTime}시간 이상 )` : '조건을 설정해주세요'}
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="19" viewBox="0 0 11 19" fill="none">
                    <path d="M2.05408 18L8.7865 9.30222L1.65806 1" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>

            {showModal && 
                <div className="modal_nearbuilding">
                    <div className='close_container' onClick={() => setShow(false)}>
                        <div className='close' 
                            style={{cursor: 'pointer'}}>
                            &times;
                        </div>
                    </div>

                    {/*
                    <div className="container">
                        <label>사용할 요일</label>
                        {dayOfWeeks.map((dayOfWeek) => (
                            <div className="dayOfWeek" 
                                key={dayOfWeek}
                                onClick={() => setDay(dayOfWeek)}>
                                {dayOfWeek}
                            </div>
                        ))}
                    </div>
                    */}

                    <div className="container">
                        <label style={{marginRight: '1.7rem'}}>사용할 시간</label>
                        <div>
                            <div style={{display: 'flex', marginBottom: '1rem'}}>
                                <div className="time-now">{currentTime}</div>
                                <div style={{margin: '0 1.5rem'}}>~</div>
                                <div className="time-now">{selectedTime ? `${calcTime}` : ''}</div>
                            </div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                {timeZones.map((timeZone) => (
                                        <div className="dayOfWeek"
                                            key={timeZone}
                                            onClick={() => {setTime(timeZone); onTimeSelect(timeZone);}}>
                                            {timeZone}
                                        </div>
                                    ))}
                                <label>시간 이상</label>
                                <button 
                                    className="finish"
                                    onClick={handleResult}>완료</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            
        </div>
        
    )
}