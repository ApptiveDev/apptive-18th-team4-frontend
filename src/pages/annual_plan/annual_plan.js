import { useState } from "react";
import Calendar from 'react-calendar';
import moment from 'moment';
import Modal_annualPlan from "../../components/modal_annualPlan/modal";
//import 'react-calendar/dist/Calendar.css';
import './annual_plan.css'
import data from './data.json'; //나중에 삭제
import Navbar from '../../components/nav_bar/nav_bar'

export default function AnnualPlan() {
  /*
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://3.34.82.40:8080/api/annualplan/my')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [data]);
  */

  /*날짜 형식 바꾸기*/
  const formatDate = (date) => {
    return date.split("T")[0];
  };

  const [date, showDate] = useState(new Date());
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
  console.log(mark)
  console.log(data)
  return (
    <div>
      <Navbar />
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '4.813rem'}}>
        <div style={{display: 'flex', justifyContent: 'flex-end', width: '64rem'}}>
          <Modal_annualPlan selectedDate={moment(date).format("YYYY-MM-DD")} selectedDayWeek={date.getDay()} style={{marginRight: '0.625rem'}}/> {/* 모달에 선택한 날짜 전달 */}
          <button className="calendar_sub" style={{marginLeft: '0.625rem'}}>
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
                      console.log(formatDate(item.startTime), formatDate(item.endTime))
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
                      {showMemo && <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '0.8rem', marginBottom: '0.1rem'}}><div className="speech_bubble">{item.description}</div></div>}

                      <div className="content_container">
                        <div style={{ width: '4.4375rem', height: '0.5625rem', background: '#080038' }}></div>
                        <div style={{ display: 'flex' }}>
                          <div style={{ textAlign: 'center', width: '4.4375rem', marginRight: '0.625rem' }}>
                            <div style={{ fontWeight: '600' }}>{moment(date).format("D")}</div>
                            <div style={{ fontSize: '0.75rem' }}>{moment(date).format("ddd")}</div>
                          </div>
                          <div style={{width: '20rem', margin: '0 0.625rem', display: 'flex', justifyContent: 'space-between'}} >
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.875rem' }}>{item.title}</div>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              <img src="/assets/img/memo.png" style={{marginRight: '0.54rem'}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}/>
                              <img src="/assets/img/gear_colored.png" style={{width: '1.25rem', height: '1.25rem'}} />
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
    </div>
  )
}