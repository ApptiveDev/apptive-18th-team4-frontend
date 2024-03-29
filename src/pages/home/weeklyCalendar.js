import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import './weeklyCalendar.css';
import { instance } from '../../components/ApiContoller';

const WeeklyCalendar = () => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('accessToken') !== null) {
            setIsLogin(true)
        }
    }, [isLogin]);

    const [calendarData, setCalendarData] = useState([]);
    useEffect(() => {
        if (isLogin) {
            instance.get('/api/events')
                .then((res) => setCalendarData(res.data))
                .catch((err) => console.log(err));
        }
    }, [isLogin]);

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const getDatesForWeek = () => {
        const today = new Date();
        const startOfWeek = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() - today.getDay()
        );

        const dates = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + i);
            dates.push(currentDate);
        }
        return dates;
    };
    
    const dates = getDatesForWeek();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

    return (
        <div className='weekly-calendar' 
            style={{
                height: isLogin ? '' : '21.125rem'
            }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '2rem',
            }}>
                {moment(dates[0]).format('M월 D일 - ')}
                {moment(dates[6]).format('M월 D일')}
            </div>
            <div style={{ display: 'flex' }}>
                {dayNames.map((dayName) => (
                    <div key={dayName} 
                        className="calendar-dayname">
                        {dayName}
                    </div>
                ))}
            </div>
            
            <div style={{margin: '0 1rem'}}>
                <hr />
            </div>
            
            <div style={{display: 'flex'}}>
                {dates.map((date) => (
                    <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}
                        key={date.toISOString()}
                        onClick={() => handleDateClick(date)}
                        className={`calendar-date ${selectedDate === date ? 'selected' : ''}`}>
                        {date.getDate()}

                        {/* startTime부터 startTime까지 해당 날짜에 이벤트가 있는지 확인 */}
                        {calendarData.map((event) => {
                            if (new Date(date) >= new Date(event.startTime) && new Date(date) <= new Date(event.endTime)) {
                                return (
                                    <div style={{display: 'flex', justifyContent: 'center'}}>
                                        <div key={event.startTime} className="purple-box">
                                            {event.title}
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}

                    </div>
                ))}
            </div>

        </div>
    );
};

export default WeeklyCalendar;