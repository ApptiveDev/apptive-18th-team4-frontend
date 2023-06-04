import { useState } from "react";
import Pagination from 'react-js-pagination';
import Navbar from "../../components/nav_bar/nav_bar";
import { majors, institutions } from "../../components/dropdown";
import './pagination.css';
import './announcement.css';
import data from './fakeDB.json';
import keywords from './fakeDB_keywords.json';

export default function Announcement() {
    // click한 div의 index 저장하는 배열
    const [clickedIndexes, setClickedIndexes] = useState([]);

    const handleShowing = (index) => {
        if (clickedIndexes.includes(index)) {
            setClickedIndexes(clickedIndexes.filter((i) => i !== index));
        } else {
            setClickedIndexes([...clickedIndexes, index]);
        }
    };

    //pagination
    const [page, setPage] = useState(1);
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    }
    const itemsPerPage = 3;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    //단과대학 및 학부(학과) 또는 기관 선택
    const [selectedVal, setVal] = useState('학사 공지사항');
    const [selectedCollege, setSelectedCollege] = useState('');
    const [selectedDept, setSelectedDept] = useState('');
    const [selectedInstt, setInstt] = useState('');
    
    const handleValChange = (e) => {
        setVal(e.target.value);
    }

    const handleCollegeChange = (e) => {
        setSelectedCollege(e.target.value);
        setSelectedDept('');
    }

    const handleDeptChange = (e) => {
        setSelectedDept(e.target.value);
    }

    const handleInsttChange = (e) => {
        setInstt(e.target.value);
    }

    const [keyword, setKeyword] = useState('');

    return (
        <div className="announcement_container">
            <Navbar />
            <div className="title">
                <img src="/assets/img/bell.png" />
                <span style={{ paddingLeft: '1.92%' }}>공지사항</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='notification_container'>
                    {data.map((item, index) => (
                        <div style={{}}>
                            <div style={{width: '100%', height: '100%'}}>
                            <div key={index} className={`notification_list ${clickedIndexes.includes(index) ? 'opened' : ''}`}>
                                <div className='notification_element' style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    borderTopRightRadius: clickedIndexes.includes(index - 1) || index == 0 ? '1.875rem' : 0,
                                    borderTopLeftRadius: clickedIndexes.includes(index - 1) || index == 0 ? '1.875rem' : 0,
                                    borderBottomRightRadius: data.length - 1  == index || clickedIndexes.includes(index) ? '1.875rem' : 0,
                                    borderBottomLeftRadius: data.length - 1 == index || clickedIndexes.includes(index) ? '1.875rem' : 0,
                                }}>
                                    <div className="bell_container">
                                        <img src="/assets/img/bell_mini.png" alt="알림 아이콘" />
                                    </div>
                                    <span>{item.department}</span>
                                    <button className="showBtn" onClick={() => handleShowing(index)}>
                                        {clickedIndexes.includes(index) ? '닫기' : '보기'}
                                    </button>
                                    <button className="removeBtn">제거</button>
                                </div>

                                <div style={{BorderBottomLeftRadius: '1.875rem', borderBottomLeftRadius: '1.875rem'}}>
                                    {clickedIndexes.includes(index) &&
                                        item.content.slice(startIndex, endIndex).map((notice) => (
                                        <div key={notice.id} className="isClickedDiv">
                                            <span>{notice.id}</span>
                                            <div style={{ width: '90%', marginLeft: '3.75%' }}>
                                            <a href={notice.link}>{notice.title}</a>
                                            </div>
                                            <span>{notice.date}</span>
                                        </div>
                                        ))}
                                    {clickedIndexes.includes(index) && (
                                        <div className="pagination">
                                            <Pagination
                                                activePage={page}
                                                itemsCountPerPage={itemsPerPage}
                                                totalItemsCount={item.content.length}
                                                pageRangeDisplayed={5}
                                                prevPageText="‹"
                                                nextPageText="›"
                                                onChange={handlePageChange}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{padding: '4.84% 14.4%'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <button className="searchBtn" style={{width: '5.313rem'}}>분류</button>
                    <div style={{display: 'flex', alignItems: 'center', width: '80%'}}>

                            <select id="classification" value={selectedVal} onChange={handleValChange}>
                                <option value="학사 공지사항">학사 공지사항</option>           
                                <option value="석사 공지사항">석사 공지사항</option>   
                                <option value="기관 공지사항">기관 공지사항</option>                           
                            </select>
  
                            {selectedVal === "학사 공지사항" && (
                                <>
                                    <select id="college" value={selectedCollege} onChange={handleCollegeChange}>
                                        <option value="">단과대학</option>
                                        {Object.keys(majors).map((major) => (
                                            <option key={major} value={major}>{major}</option>
                                        ))}
                                    </select>

                                    <select id="dept" value={selectedDept} onChange={handleDeptChange} disabled={!selectedCollege}>
                                        <option value="">학과</option>
                                        {majors[selectedCollege] && majors[selectedCollege].map((dept) => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>
                                </>
                            )}

                            {selectedVal === "기관 공지사항" && (
                                <>
                                    <select id="instt" value={selectedInstt} onChange={handleInsttChange}>
                                        <option value="">기관</option>
                                        {institutions.map((institution) => (
                                            <option key={institution} value={institution}>{institution}</option>
                                        ))}
                                    </select>
                                </>
                            )}

                    </div>

                    <div className="checkbox_container">
                        <label><input type="checkbox" name="학사" value="학사" />학사</label>
                        <label><input type="checkbox" name="석사" value="석사" />석사</label>
                        <label><input type="checkbox" name="휴학" value="휴학" />휴학</label>
                    </div>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', marginTop: '3.48%'}}>
                    <button className="searchBtn" style={{width: '5.313rem'}} />
                    <input className="enterKeyword" onChange={(e) => setKeyword(e.target.value)}/>
                    <button className="searchBtn" style={{width: '4.688rem'}}>조회</button>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '2.69%'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '70%'}}>
                        <div>
                            <button className="searchBtn" style={{width: '5.938rem'}}>추천 키워드</button>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '70%'}}>
                            {keywords.map((keyword) => (
                                <button className="keywords" style={{width: '5.063rem'}}>{keyword}</button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="result">

                </div>
            </div>        
        </div>
    );
}