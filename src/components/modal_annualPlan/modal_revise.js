import './modal_revise.css';
import { useState } from 'react';
import { instance } from '../ApiContoller';

export default function ModalRevise({ closeModal, data }) {
    const [title, setTitle] = useState(data.title);
    const [description, setDescript] = useState(data.description);
    const [location, setLocation] = useState(data.location);
    const [startDate, setStartDate] = useState(data.startTime.split('T')[0]);
    const [startT, setStartTime] = useState(data.startTime.split('T')[1]);
    const [endDate, setEndDate] = useState(data.endTime.split('T')[0]);
    const [endT, setEndTime] = useState(data.endTime.split('T')[1]);
    const [color, setColor] = useState(data.color);
    const [alarmTime, setAlarmTime] = useState(data.alarmTime);
    
    const startTime = `${startDate}T${startT}`;
    const endTime = `${endDate}T${endT}`;

    const handleDelete = (id) => {
        instance.delete(`/api/events/${id}`)
            .then(() => {
                alert("일정이 삭제되었습니다.");
                window.location.reload();
            })
            .catch((err) => console.log(err));
    }

    const handleSchedule = () => {
        if (title === '') alert("일정 이름을 입력해주세요.")
        else if (startDate === '' ) alert("일정 시작 일자를 입력해주세요.")
        else if (startT === '' ) alert("일정 시작 시간을 입력해주세요.")
        else if (endDate === '' ) alert("일정 종료 일자를 입력해주세요.")
        else if (endT === '' ) alert("일정 종료 시간을 입력해주세요.")
        else if (alarmTime === '') alert("알림 시간을 선택해주세요.")
        else if (color === '') alert("색상을 선택해주세요.")
        else {
            instance.put(`/api/events/${data.eventId}`, {
                "title": title,
                "description": description,
                "location": location,
                "startTime": startTime,
                "endTime": endTime,
                "color": color,
                "alarmTime": alarmTime
            })
                .then(() => {
                    alert("일정이 수정되었습니다.");
                    window.location.reload();
                })
                .catch((err) => console.log(err));
        }
    };

    return(
        <div className='modal-revise-container'>
            <div className='modal'>
                <div className="modal-content">
                    <div className='close_container' onClick={closeModal}>
                        <div className='close'>&times;</div>
                    </div>
                    <div style={{width: '100%', height: '55%'}}>
                        <input className='schedule_name' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='일정 이름'/>
                        <div style={{display: 'flex', height: '13%',  marginBottom: '5%', justifyContent: 'space-between'}}>
                            <input className='start_date' value={startTime.split('T')[0]} onChange={(e) => setStartDate(e.target.value)} type='date' placeholder='시작시간' /> {/*value={`${selectedDate}`}*/}
                            <input className='start_date' value={startTime.slice(11, 16)} onChange={(e) => setStartTime(e.target.value)} type="time" />
                        </div>
                        <div style={{display: 'flex', height: '13%', marginBottom: '5%', justifyContent: 'space-between'}}>
                            <input className='end_date' value={endTime.split('T')[0]} onChange={(e) => setEndDate(e.target.value)} type='date' placeholder='종료시간'/>
                            <input className='end_date' value={endTime.slice(11, 16)} onChange={(e) => setEndTime(e.target.value)} type="time" />
                        </div>
                        <input className='location' value={location} onChange={(e) => setLocation(e.target.value)} placeholder='장소'/>
                        <input className='memo' value={description} onChange={(e) => setDescript(e.target.value)} placeholder='메모'/>
                    </div>
                    <div className='time_container'>
                        <span>알림</span>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '80%' }}>
                            <div style={{ width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <button
                                    className={`select_time${alarmTime === 10 ? ' selected' : ''}`}
                                    onClick={() => setAlarmTime(10)}
                                >
                                    10분 전
                                </button>
                                <button
                                    className={`select_time${alarmTime === 15 ? ' selected' : ''}`}
                                    onClick={() => setAlarmTime(15)}
                                >
                                    15분 전
                                </button>
                                <button
                                    className={`select_time${alarmTime === 30 ? ' selected' : ''}`}
                                    onClick={() => setAlarmTime(30)}
                                >
                                    30분 전
                                </button>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <button
                                    className={`select_time${alarmTime === 1 ? ' selected' : ''}`}
                                    onClick={() => setAlarmTime(1)}
                                >
                                    1일 전
                                </button>
                                <button
                                    className={`select_time${alarmTime === 2 ? ' selected' : ''}`}
                                    onClick={() => setAlarmTime(2)}
                                >
                                    2일 전
                                </button>
                                <button
                                    className={`select_time${alarmTime === 7 ? ' selected' : ''}`}
                                    onClick={() => setAlarmTime(7)}
                                >
                                    1주일 전
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='color_container'>
                        <span>색상</span>

                        <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '80%' }}>
                            <div className='select_color' style={{ backgroundColor: '#FF7979' }} onClick={() => setColor('#FF7979')}>
                                {color === '#FF7979' && <span>&#10003;</span>}
                            </div>
                            <div className='select_color' style={{ backgroundColor: '#FFB571' }} onClick={() => setColor('#FFB571')}>
                                {color === '#FFB571' && <span>&#10003;</span>}
                            </div>
                            <div className='select_color' style={{ backgroundColor: '#FFD910' }} onClick={() => setColor('#FFD910')}>
                                {color === '#FFD910' && <span>&#10003;</span>}
                            </div>
                            <div className='select_color' style={{ backgroundColor: '#9BD3A1' }} onClick={() => setColor('#9BD3A1')}>
                                {color === '#9BD3A1' && <span>&#10003;</span>}
                            </div>
                            <div className='select_color' style={{ backgroundColor: '#AEC0F0' }} onClick={() => setColor('#AEC0F0')}>
                                {color === '#AEC0F0' && <span>&#10003;</span>}
                            </div>
                            <div className='select_color' style={{ backgroundColor: '#080038' }} onClick={() => setColor('#080038')}>
                                {color === '#080038' && <span>&#10003;</span>}
                            </div>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                        <button className='add_schedule' onClick={() => handleDelete(data.eventId)}>일정 삭제하기</button>
                        <button className='add_schedule' onClick={handleSchedule}>일정 수정 완료</button>
                    </div>
                </div>
            </div>
        </div>
    )
}