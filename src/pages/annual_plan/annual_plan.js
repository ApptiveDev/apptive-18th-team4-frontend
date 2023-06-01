import { useState } from "react";
import Calendar from 'react-calendar';
import moment from 'moment';
import axios from 'axios';
import Modal from "../../components/modal/modal";
//import 'react-calendar/dist/Calendar.css';
import './annual_plan.css'
import data from './data.json'; //나중에 삭제

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
  }, []);
  */

  const [date, showDate] = useState(new Date());
  //startdate와 enddate를 mark 배열에 저장
  const mark = [];
  data.forEach(({startDate, endDate}) => {
    const start = moment(startDate, 'YYYY.MM.DD').format('YYYY-MM-DD');
    const end = moment(endDate, 'YYYY.MM.DD').format('YYYY-MM-DD');
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
    width: '4px',
    height: '4px',
    backgroundColor: color,
    borderRadius: '50%',
    marginLeft: '0.063rem',
  });

  return (
    <div className="calendar_container">
      <div>
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
              html.push(<div className="dot_container">
                {data.map((item) => {
                  if(moment(date).isBetween(moment(item.startDate, 'YYYY.MM.DD'), moment(item.endDate, 'YYYY.MM.DD'), null, '[]')) {
                    return <div style={dot_style(item.color)}></div>
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

        <div className="context_container">
          <div>
            {moment(date).format("YYYY년 MM월 DD일")}
            <Modal selectedDate={moment(date).format("MM.DD")} selectedDayWeek={date.getDay()}/> {/* 모달에 선택한 날짜 전달 */}
          </div>

          <div>
            {data.map((item) => {
              const start = moment(item.startDate, 'YYYY.MM.DD');
              const end = moment(item.endDate, 'YYYY.MM.DD');
              //isBetween 메소드로 특정 기간 내에 해당하는지 판단
              //[]:시작일과 종료일 포함한다는 뜻
              if (moment(date).isBetween(start, end, null, '[]')) {
                return <div style={{fontSize: '13px'}}>{item.context}</div>;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}