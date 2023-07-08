import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import './weeklyCalendar.css';

const WeeklyCalendar = () => {
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
                fontSize: '1.5625rem',
                fontWeight: '600'
            }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '2rem'
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
                    <div
                        key={date.toISOString()}
                        onClick={() => handleDateClick(date)}
                        className={`calendar-date ${selectedDate === date ? 'selected' : ''}`}
                        

                    >
                        {date.getDate()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyCalendar;