import { useState, useEffect } from "react";
import Pagination from 'react-js-pagination';
import { Link } from "react-router-dom";
import Navbar from "../../components/nav_bar/nav_bar";
import { majors, institutions } from "../../components/dropdown";
import './pagination.css';
import './announcement.css';
import { instance } from "../../components/ApiContoller";

export default function Announcement() {
    // 로그인 여부에 따라 다른 elem 보여주기
    const [isLogin, setIsLogin] = useState(false);
    const [data, setData] = useState(null);
    useEffect(() => {
        if (localStorage.getItem('accessToken') !== null) {
            setIsLogin(true);
            instance.get('/api/announce/my')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
        }
    }, [isLogin, data]);

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

    const [pageRes, setPageRes] = useState(1);
    const handleResPageChange = (pageNumber) => {
        setPageRes(pageNumber);
    }
    const startIndex_res = (pageRes - 1) * 10;
    const endIndex_res = startIndex_res + 10;

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

    const [keyword, setKeyword] = useState(null);
    const [res, setRes] = useState(null);
    const [show, setShow] = useState(false);

    let requestURL = '';
    const handleResult = () => {
        if (selectedDept === '' && selectedInstt === '') {
            alert("학과 또는 기관을 선택해주세요.");
        } else {
            if (selectedVal === "학사 공지사항") {
                if (keyword) {
                    requestURL = `/api/announce/${selectedDept}` + `?keyword=${keyword}`;
                } else {
                    requestURL = `/api/announce/${selectedDept}`;
                }
                instance.post(requestURL)
                    .then((res) => {
                        setRes(res.data.content);
                        setShow(true);
                    })
                    .catch((err) => console.log(err));
            } 
            else if (selectedVal === "기관 공지사항") {
                if (keyword) {
                    requestURL = `/api/announce/${selectedInstt}` + `?keyword=${keyword}`;
                } else {
                    requestURL = `/api/announce/${selectedInstt}`;
                }
                instance.post(requestURL)
                    .then((res) => {
                        setRes(res.data.content);
                        setShow(true);
                    })
                    .catch((err) => console.log(err));
            }
        }
    }

    let likeReqURL = '';
    const handleLike = () => {
        if (!isLogin) alert("즐겨찾기는 로그인 후 사용 가능합니다");
        else {
            if (selectedVal === "학사 공지사항") likeReqURL = `/api/announce/${selectedDept}/like`;
            else if (selectedVal === "기관 공지사항") likeReqURL = `/api/announce/${selectedInstt}/like`;
            instance.post(likeReqURL)
                .then(() => {
                    alert("즐겨찾기 추가되었습니다.");
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                    alert("즐겨찾기를 실패하였습니다.")
                });
        }
    }

    return (
        <div className="announcement_container">
            <Navbar />
            <div className="title">
                <img src="/assets/img/bell.png" />
                <span style={{ paddingLeft: '1.92%' }}>공지사항</span>
            </div>

            {isLogin && data !== null (
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
                                        <span>{item.departmentName}</span>
                                        <button className="showBtn" onClick={() => handleShowing(index)}>
                                            {clickedIndexes.includes(index) ? '닫기' : '보기'}
                                        </button>
                                        <button className="removeBtn">제거</button>
                                    </div>

                                    <div style={{BorderBottomLeftRadius: '1.875rem', borderBottomLeftRadius: '1.875rem'}}>
                                        {clickedIndexes.includes(index) &&
                                            item.announcements.slice(startIndex, endIndex).map((notice) => (
                                            <div className="isClickedDiv">
                                                <div style={{ width: '90%'}}>
                                                    <a href={notice.urls}>{notice.title}</a>
                                                </div>
                                                <span>{notice.date}</span>
                                            </div>
                                            ))}
                                        {clickedIndexes.includes(index) && (
                                            <div className="pagination">
                                                <Pagination
                                                    activePage={page}
                                                    itemsCountPerPage={itemsPerPage}
                                                    totalItemsCount={item.announcements.length}
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
            )}

            <div style={{padding: '4.84% 14.4%'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <button className="searchBtn" style={{width: '5.313rem'}}>분류</button>
                    <div style={{display: 'flex', alignItems: 'center', width: '80%'}}>

                            <select id="classification" value={selectedVal} onChange={handleValChange}>
                                <option value="학사 공지사항">학사 공지사항</option>           
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
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', marginTop: '3.48%'}}>
                    <input className="enterKeyword" onChange={(e) => setKeyword(e.target.value)}/>
                    <button 
                        onClick={handleResult}
                        className="searchBtn" 
                        style={{width: '4.688rem'}}>조회</button>
                </div>
                

                <div className="result">
                    {show && res !== null && res.slice(startIndex_res, endIndex_res).map((item) => (
                        <div>
                            <div>
                                <button onClick={handleLike}>즐겨찾기</button>
                                {selectedDept || selectedInstt}
                            </div>
                            <a href={item.urls} style={{color: '#000', textDecoration: 'none'}}>
                                {item.title}
                            </a>
                            {item.date}
                        </div>
                        
                    ))}

                    {show && res !== null && <div>
                        <Pagination
                            activePage={pageRes}
                            itemsCountPerPage={10}
                            totalItemsCount={res.length}
                            pageRangeDisplayed={5}
                            prevPageText="‹"
                            nextPageText="›"
                            onChange={handleResPageChange}
                        />
                    </div>}
                    
                </div>
            </div>        
        </div>
    );
}