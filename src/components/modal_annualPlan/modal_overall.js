import './modal_overall.css';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { instance } from '../ApiContoller';
import ModalRevise from './modal_revise';


export default function ModalOverall({ closeModal, date }) {
    const month = moment(date).format('M');
    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        instance.get(`/api/events?month=${month}`)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    },[])

    const getDate = (dateString) => {
        const dateObj = new Date(dateString);
        const date = dateObj.getDate();
        return date;
    };

    const getDay = (dateString) => {
        const dateObj = new Date(dateString);
        const dayOfWeek = dateObj.toLocaleString('en-US', { weekday: 'short' });
        return dayOfWeek
    };

    const [showRevise, setShowRevise] = useState(false);
    const [detail, setDetail] = useState([]);

    const openReviseModal = (id) => {
        console.log(id);
        const filteredData = data.find((item) => item.eventId === id);
        //console.log(filteredData);
        setDetail(filteredData);
        setShowRevise(true);
    }

    const closeReviseModal = () => {
        setShowRevise(false);
    };

    return(
        <div className='modal-overall-container'>
            <div className='modal'>
                <div className="modal-content">
                    <div className='close_container'>
                        <div className='close' onClick={closeModal}>&times;</div>
                    </div>
                    <div style={{textAlign: 'center', color: '#080038', fontSize: '1.25rem', fontWeight: '700', marginBottom: '5%'}}>
                        {moment(date).format('YYYY년 M월')}의 일정
                    </div>
                    
                    {data.map((item) => (
                        <>
                            <div className='schedule-container-top'></div>
                            <div className='schedule-container-bottom'>
                                <div style={{display: 'flex', marginLeft: '3%',  width: '25%'}}>
                                    <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                        <div style={{fontWeight: '600'}}>{getDate(item.startTime)}</div> 
                                        <div style={{fontSize: '0.625rem', fontWeight: '400'}}>{getDay(item.startTime)}</div>
                                    </div>
                                    {item.startTime.split('T')[0] != item.endTime.split('T')[0] && (
                                        <div style={{display: 'flex'}}>
                                            <span style={{margin: '0 0.25rem'}}>-</span>
                                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                                <div style={{fontWeight: '600'}}>{getDate(item.endTime)}</div> 
                                                <div style={{fontSize: '0.625rem', fontWeight: '400'}}>{getDay(item.endTime)}</div>
                                            </div>
                                        </div>
                                    )} 
                                </div>

                                <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                                    <div style={{display: 'flex', alignItems: 'center', width: '80%'}}>
                                        <div style={{fontSize: '0.875rem'}}>{item.title}</div>
                                        <div style={{color: '#AFAFAF', fontSize: '0.75rem', marginLeft: '0.3rem'}}>
                                            {item.startTime.slice(11, 16)} ~ {item.endTime.slice(11, 16)}
                                        </div>
                                    </div>
                                    <div>
                                        <img src="/assets/img/pencil.png" onClick={() => openReviseModal(item.eventId)} style={{width: '0.8rem', height: '0.8rem', cursor: 'pointer'}} />
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}  
                </div>
            </div>

        {showRevise && <ModalRevise isOpen={showRevise} closeModal={closeReviseModal} data={detail} />}   
        </div>
    )
}