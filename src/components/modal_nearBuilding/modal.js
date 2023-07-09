import { useState } from "react";
import './modal.css';

export default function Modal_nearBuilding() {
    const [showModal, setShow] = useState(false);
    const dayOfWeeks = ['월', '화', '수', '목', '금'];
    const timeZones = ['0.5', '1', '2', '3'];

    const [selectedDay, setDay] = useState('');
    const [selectedTime, setTime] = useState('');

    return (
        <div className="condition-container">
            <div className="select-condition" onClick={() => setShow(!showModal)}>
                {(selectedDay !== '' || selectedTime !== '') ? `${selectedDay}${selectedTime !== '' ? ` [ ${selectedTime}시간 이상 ]` : ''}` : '조건을 설정해주세요'}
                <img src="/assets/img/arrow_right.png"></img>
            </div>

            {showModal && 
                <div className="modal_nearbuilding">
                    <div className='close_container' onClick={() => setShow(false)}>
                        <div className='close' 
                            style={{cursor: 'pointer'}}>
                            &times;
                        </div>
                    </div>

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
                    </div>

                    <div style={{
                        display: 'flex', 
                        justifyContent: 'flex-end',
                        marginTop: '1rem'
                    }}>
                        <button className="finish"
                            onClick={() => setShow(false)}>
                                완료
                        </button>
                    </div>
                </div>
            }
            
        </div>
        
    )
}