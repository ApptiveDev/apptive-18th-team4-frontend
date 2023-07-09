import { useState } from 'react';
import "./modal.css";

const Modal_annualPlan = ({selectedDate, selectedDayWeek}) => {
    console.log(selectedDayWeek)
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const day_week = ['일', '월', '화', '수', '목', '금', '토'];
    const selected_day_week = day_week[selectedDayWeek];

    return (
        <div className='modal_container'>
            <button onClick={openModal} className='calendar_sub'>+</button>
        {isOpen && (
            <div className='modal'>
                <div className="modal-content">
                    <div className='close_container' onClick={closeModal}>
                        <div className='close'>&times;</div>
                    </div>
                    <div>
                        <input className='schedule_name' placeholder='일정 이름'/>
                        <div style={{display: 'flex'}}>
                        <input className='start_date' placeholder='시작시간' value={`${selectedDate} ${selected_day_week}`} />
                        <input className='end_date' placeholder='종료시간'/>
                        </div>
                        <input className='location' placeholder='장소'/>
                        <input className='memo' placeholder='메모'/>
                    </div>
                    <div className='time_container'>
                        <span>알림</span>

                        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
                        <div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '7px'}}>
                        <button className='select_time'>10분 전</button>
                        <button className='select_time'>15분 전</button>
                        <button className='select_time'>30분 전</button>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <button className='select_time'>1일 전</button>
                        <button className='select_time'>2일 전</button>
                        <button className='select_time'>1주일 전</button>
                        </div>
                        </div>

                        </div>

                    </div>
                    <div className='color_container' style={{border: '1px solid black'}}>
                        <span>색상</span>

                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div className='select_color' style={{backgroundColor: '#FF7979'}}/>
                        <div className='select_color' style={{backgroundColor: '#FFB571'}}/>
                        <div className='select_color' style={{backgroundColor: '#FFD910'}}/>
                        <div className='select_color' style={{backgroundColor: '#9BD3A1'}}/>
                        <div className='select_color' style={{backgroundColor: '#AEC0F0'}}/>
                        <div className='select_color' style={{backgroundColor: '#080038'}}/>
                        </div>

                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button className='add_schedule'>일정 추가하기</button>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
};

export default Modal_annualPlan;
