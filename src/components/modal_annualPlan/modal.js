import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./modal.css";
import { instance } from '../ApiContoller';

const Modal_annualPlan = ({selectedDate, selectedDayWeek}) => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('accessToken') !== null) {
            setIsLogin(true)
        }
    }, [isLogin]);

    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const day_week = ['일', '월', '화', '수', '목', '금', '토'];
    //const selected_day_week = day_week[selectedDayWeek];

    const [title, setTitle] = useState('');
    const [description, setDescript] = useState('');
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState(selectedDate);
    const [startT, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endT, setEndTime] = useState('');
    const [color, setColor] = useState('');
    const [alarmTime, setAlarmTime] = useState('');

    const startTime = `${startDate}T${startT}:00`;
    const endTime = `${endDate}T${endT}:00`;

    const handleSchedule = () => {
        if (title === '') alert("일정 이름을 입력해주세요.")
        else if (startDate === '' ) alert("일정 시작 일자를 입력해주세요.")
        else if (startT === '' ) alert("일정 시작 시간을 입력해주세요.")
        else if (endDate === '' ) alert("일정 종료 일자를 입력해주세요.")
        else if (endT === '' ) alert("일정 종료 시간을 입력해주세요.")
        else if (alarmTime === '') alert("알림 시간을 선택해주세요.")
        else if (color === '') alert("색상을 선택해주세요.")
        else {
            instance.post('/api/events', {
                "title": title,
                "description": description,
                "location": location,
                "startTime": startTime,
                "endTime": endTime,
                "color": color,
                "alarmTime": alarmTime
            })
                .then(() => {
                    setIsOpen(false);
                    alert("일정이 등록되었습니다.");
                    window.location.reload();
                })
                .catch((err) => console.log(err));
        }
    }

    return (
        <div className='modal_container'>
            <button onClick={openModal} style={{cursor: 'pointer'}} className='calendar_sub'>+</button>
            {isOpen && (
            <div className='modal'>
                <div className="modal-content">
                    <div className='close_container' onClick={closeModal}>
                        <div className='close'>&times;</div>
                    </div>
                    <div style={{width: '100%', height: '55%'}}>
                        <input className='schedule_name' onChange={(e) => setTitle(e.target.value)} placeholder='일정 이름'/>
                        <div style={{display: 'flex', height: '13%',  marginBottom: '5%', justifyContent: 'space-between'}}>
                            <input className='start_date' onChange={(e) => setStartDate(e.target.value)} type='date' placeholder='시작시간' /> {/*value={`${selectedDate}`}*/}
                            <input className='start_date' onChange={(e) => setStartTime(e.target.value)} type="time" />
                        </div>
                        <div style={{display: 'flex', height: '13%', marginBottom: '5%', justifyContent: 'space-between'}}>
                            <input className='end_date' onChange={(e) => setEndDate(e.target.value)} type='date' placeholder='종료시간'/>
                            <input className='end_date' onChange={(e) => setEndTime(e.target.value)} type="time" />
                        </div>
                        <input className='location' onChange={(e) => setLocation(e.target.value)} placeholder='장소'/>
                        <input className='memo' onChange={(e) => setDescript(e.target.value)} placeholder='메모'/>
                    </div>
                    <div className='time_container'>
                        <span>알림</span>
                        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '80%'}}>
                            <div style={{width: '100%'}}>
                                <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginBottom: '0.5rem'}}>
                                    <button className='select_time' onClick={() => setAlarmTime(10)}>10분 전</button>
                                    <button className='select_time' onClick={() => setAlarmTime(15)}>15분 전</button>
                                    <button className='select_time' onClick={() => setAlarmTime(30)}>30분 전</button>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
                                    <button className='select_time' onClick={() => setAlarmTime(1)}>1일 전</button>
                                    <button className='select_time' onClick={() => setAlarmTime(2)}>2일 전</button>
                                    <button className='select_time' onClick={() => setAlarmTime(7)}>1주일 전</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='color_container'>
                        <span>색상</span>

                        <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '80%'}}>
                            <div className='select_color' style={{backgroundColor: '#FF7979'}} onClick={() => setColor('#FF7979')}>&#10003;</div>
                            <div className='select_color' style={{backgroundColor: '#FFB571'}} onClick={() => setColor('#FFB571')}/>
                            <div className='select_color' style={{backgroundColor: '#FFD910'}} onClick={() => setColor('#FFD910')}/>
                            <div className='select_color' style={{backgroundColor: '#9BD3A1'}} onClick={() => setColor('#9BD3A1')}/>
                            <div className='select_color' style={{backgroundColor: '#AEC0F0'}} onClick={() => setColor('#AEC0F0')}/>
                            <div className='select_color' style={{backgroundColor: '#080038'}} onClick={() => setColor('#080038')}/>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className='add_schedule' onClick={handleSchedule}>일정 추가하기</button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default Modal_annualPlan;
