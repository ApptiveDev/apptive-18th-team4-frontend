import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from 'react-calendar';
import moment from 'moment';
import Modal_annualPlan from "../../components/modal_annualPlan/modal";
import ModalRevise from "../../components/modal_annualPlan/modal_revise";
import ModalOverall from "../../components/modal_annualPlan/modal_overall";
import './annual_plan.css';
import Navbar from '../../components/nav_bar/nav_bar';
import { instance } from "../../components/ApiContoller";

export default function AnnualPlan() {
  const [isLogin, setIsLogin] = useState(false);
  
  const navigate = useNavigate('');
  useEffect(() => {
      if (localStorage.getItem('accessToken') !== null) {
          setIsLogin(true)
      }
      else {
        alert("학사일정 조회 및 등록은 로그인 후 이용 가능합니다.");
        navigate('/login');
      }
  }, [isLogin]);

  const [data, setData] = useState([]);
  const [date, showDate] = useState(new Date());
  const month = moment(date).format('M');

  useEffect(() => {
    instance.get(`/api/events?month=${month}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [data]);
  

  /*날짜 형식 바꾸기*/
  const formatDate = (date) => {
    return date.split("T")[0];
  };

  //startdate와 enddate를 mark 배열에 저장
  const mark = [];
  data.forEach(({startTime, endTime}) => {
    const start = formatDate(startTime)
    const end = formatDate(endTime)
    const dates = getDatesBetween(start, end);
    mark.push(...dates);
  });
  //console.log(mark)

  // 날짜 배열을 가져오는 함수
  function getDatesBetween(start, end) {
    const _dates = [];
    let currentDate = moment(start);
    while (currentDate.isSameOrBefore(end)) {
      _dates.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'days');
    }
    return _dates;
  }
  
  const dot_style = (color) => ({
    height: '0.5rem',
    width: '0.5rem',
    margin: '0 0.1rem',
    backgroundColor: color,
    display: 'block',
    borderRadius: '50%'
  });

  //메모 띄우기
  const [showMemo, setShow] = useState(false);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  //수정 창 띄우기
  const [showRevise, setShowRevise] = useState(false);
  const [detail, setDetail] = useState([]);

  const openReviseModal = (id) => {
    const filteredData = data.find((item) => item.eventId === id);
    //console.log(filteredData);
    setDetail(filteredData);
    setShowRevise(true);
  }

  const closeReviseModal = () => {
    setShowRevise(false);
  };

  //전체 일정 조회 창 띄우기
  const [showOverall, setShowOverall] = useState(false);

  const openOverallModal = () => {
      setShowOverall(true);
  };

  const closeOverallModal = () => {
    setShowOverall(false);
  };

  return (
    <div>
      <Navbar />
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '4.813rem'}}>
        <div style={{display: 'flex', justifyContent: 'flex-end', width: '64rem'}}>
          <Modal_annualPlan selectedDate={moment(date).format("YYYY-MM-DD")} selectedDayWeek={date.getDay()} style={{marginRight: '0.625rem'}}/> {/* 모달에 선택한 날짜 전달 */}
          <button className="calendar_sub" style={{marginLeft: '0.625rem', cursor: 'pointer'}} onClick={openOverallModal}>
            <img src="/assets/img/gear.png" />
          </button>
        </div>
      </div>

      <div className="calendar_container">
        <Calendar
          onChange={showDate} // useState로 포커스 변경 시 현재 날짜 받아오기
          formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
          value={date}
          navigationLabel={null}
          showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
          tileContent={({ date, view }) => { // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            // 추가할 html 태그를 변수 초기화
            let html = [];
            /*
            // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
            if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              html.push(
              <div className="dot_container">
                {data.map((item) => {
                  <div style={dot_style(item.color)}></div>
                })}
              </div>);
            }
            */
            if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              html.push(
                <div className="dot_container">
                  {data.map((item) => {
                    if (moment(date).isBetween(formatDate(item.startTime), formatDate(item.endTime), null, '[]')) {
                      return <div style={dot_style(item.color)}>
                        {/*날짜에 맞는 item.title (일정) 보여주기*/}
                      </div>
                    }
                  })}
                </div>);
            }
            
            // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
            return (
              <>
                <div>
                  {html}
                </div>
              </>
            );
          }} />
      </div>
        
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className="context_container">
            <div>
              {/*
              {moment(date).format("YYYY년 MM월 DD일")}
              */}
            </div>

            <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '64rem'}}>
              {data.map((item) => {
                const start = formatDate(item.startTime);
                const end = formatDate(item.endTime);
                //isBetween 메소드로 특정 기간 내에 해당하는지 판단
                //[]:시작일과 종료일 포함한다는 뜻
                if (moment(date).isBetween(start, end, null, '[]')) {
                  return (
                    <div>
                      {showMemo && <div style={{background: 'pink', display: 'flex', justifyContent: 'flex-end', marginRight: '0.8rem', marginBottom: '0.1rem'}}>
                        <div className="speech_bubble">{item.description}</div>
                      </div>}

                      <div className="content_container">
                        <div style={{ width: '4.4375rem', height: '1.136rem', background: '#080038' }}></div>
                        <div style={{ display: 'flex' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', marginRight: '0.625rem', width: '4.4375rem', height: '5.3rem'}}>
                            <div style={{ fontWeight: '600' }}>{moment(date).format("D")}</div>
                            <div style={{ fontSize: '0.75rem' }}>{moment(date).format("ddd")}</div>
                          </div>
                          <div style={{margin: '0 0.625rem', display: 'flex'}} >
                            <div style={{height: '5.3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
                              <div style={{width: '20rem', fontSize: '1.25rem', display: 'flex', justifyContent: 'space-between'}}>
                                <div>{item.title}</div>
                                <div>
                                  <img src="/assets/img/memo.png" style={{marginRight: '0.54rem'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
                                  <img src="/assets/img/pencil.png" onClick={() => openReviseModal(item.eventId)} style={{width: '1.25rem', height: '1.25rem', cursor: 'pointer'}} />
                                </div>
                              </div>
                              <div style={{color: '#ABABAB'}}>
                                {item.startTime.slice(11, 16)} ~ {item.endTime.slice(11, 16)}, {item.location}
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                }
              })}
            </div>

          </div>
      </div>

      {showRevise && <ModalRevise isOpen={showRevise} closeModal={closeReviseModal} data={detail} />}
      {showOverall && <ModalOverall isOpen={showOverall} closeModal={closeOverallModal} date={date} />}
    </div>
  )
}