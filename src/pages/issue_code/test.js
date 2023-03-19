import {useState} from 'react'
import axios from 'axios'

export default function Test () {
    const [keyword, setKeyword] = useState('');
    const [state, setState] = useState('');
    const [code, setCode] = useState('');

    const state_list = ['대학생', '대학원생', '휴학생', '신입생']
    const [selectedState, setSelectedState] = useState('')

    // 생성된 코드 가져와서 div에 보여주기 (api 완성이 안돼서 일단 주석 처리)
    function getCode(e) {
        e.preventDefault();
        // state와 keyword 백에 보내기
        axios.post("http://127.0.0.1:8080/test/usercreate", 
            {
                state: state,
                keyword: keyword
            }, 
            {headers: { "Content-Type": `application/json`}})
            .then((response) => {
                console.log(response)
            }) .catch((error) => {
                console.log(error)
            })
        
            /*
        axios.get("{url}")
        .then(function(response) {
            console.log(response)
            setCode(response.data.code)
            //localStorage.setItem('code', code)
            
            }) .catch(function(error) {
                console.log(error)
            })
        */
    }

   // 사용자가 선택한 학과 추출하기
    /*function handleMajor(e) {
        setSelectedMajor(e.target.value);
        console.log(e.target.value)
        setUserDto({
          ...userDto,
          major: e.target.value
        })
        //localStorage.setItem('major', major)
      }*/

    // 사용자의 state 추출하기
    const handleState = (e) => {
        e.preventDefault()
        const getState = e.target.value
        setSelectedState(getState)
        if (getState === "대학생") setState(1)
        else if (getState === "대학원생") setState(2)
        else if (getState === "휴학생") setState(3)
        else if (getState === "신입생") setState(4)
        else if (getState.length === 0) alert("신분을 선택해주세요") 
    }

    // 사용자가 추가한 키워드 추출하기
    const handleKeyword = (e) => {
        setKeyword(e.target.value)
        //localStorage.setItem('keywords', keywords)
      };

    // 이미 코드 발급한 적이 있는 경우 사용자에게 입력받은 코드 백엔드에 전달 (api 완성이 안돼서 일단 주석 처리)
    /*function insertCode(e) {
        e.preventDefault();
        axios.post("{url}", code, {headers})
        .then(function(response) {
            console.log(response)
            setCode(response)
        }) .catch(function(error) {
            console.log(error)
        })

        axios.get("{url}")
        .then(function(response) {
            console.log(response)
            // 사용자 정보(학과, 키워드) 가져오는 코드 영역
        }) .catch(function(error) {
            console.log(error)
        })

        //localstorage.getItem(code)
    }*/

    return (
        <div>
            <p>1. 처음 사용하는 경우</p>
            <div className='selectMajor'>
                <select name={state} onChange={handleState} value={selectedState} className="major">
                    {state_list.map((major) => (
                        <option value={major} key={major}> {major} </option>
                    ))}
                </select>
            </div>
            <div>
                <input name='keyword' onChange={handleKeyword} value={keyword} className="addKeyword"/>
            </div>
            <div>
                <button onClick={getCode}>코드 생성</button> 
            </div>
            <div>
                {code}
            </div>

            <p>2. 이전에 코드 발급한 적이 있는 경우</p>
            {/*
            <input name='code' onChange={onChange} value={code} className="addKeyword"/>
            <button>코드 입력</button> {/*insertCode 함수 연결시키기 */}
        </div>
    )
}