import {useState} from 'react'
import axios from 'axios'

export default function SignUp () {
    const [memberId, setID] = useState('');
    const [password, setPW] = useState('');
    const [checkedPassword, setPW2] = useState('');
    const [state, setState] = useState('');
    const [keyword, setKeyword] = useState('');
    
    const handleID = (e) => {
        setID(e.target.value)
    }
    
    const handlePW = (e) => {
        setPW(e.target.value)
    }

    const handlePW2 = (e) => {
        setPW2(e.target.value)
    }

    const state_list = ['선택', '대학생', '대학원생', '휴학생', '신입생']
    const [selectedState, setSelectedState] = useState('')

    // 사용자의 state 추출하기
    const handleState = (e) => {
        e.preventDefault()
        const getState = e.target.value
        setSelectedState(getState)
        if (getState === "대학생") setState(1)
        else if (getState === "대학원생") setState(2)
        else if (getState === "휴학생") setState(3)
        else if (getState === "신입생") setState(4)
        else if (getState === "선택") {
            setState('')
            alert("신분을 선택해주세요")
        }
    }

    const handleKeyword = (e) => {
        setKeyword(e.target.value)
      };
    
    const handleSignup = (e) => {
        e.preventDefault()
        if (memberId.length === 0) alert("아이디를 입력해주세요")
        else if (password.length === 0) alert("비밀번호를 입력해주세요")
        else if (password !== checkedPassword) alert ("비밀번호가 일치하지 않습니다")
        else {
            const form = new FormData()
            form.append('memberId', memberId)
            form.append('password', password)
            form.append('checkedPassword', checkedPassword)
            form.append('state', state)
            form.append('keyword', keyword)

            axios.post("url", form, { headers: { "Content-Type": `application/json`} })
            .then(function(response) {
                console.log(response)
            }) .catch(function(error) {
                console.log(error)
            })
        }
    }

    return (
        <div className='signUp'>
            <div className='enterID'>
                <label htmlFor='memberId'>아이디</label>
                <input name='memberId' onChange={handleID} value={memberId} className="memberId"/>
            </div>

            <div className='enterPW'>
                <label htmlFor='password'>비밀번호</label>
                <input name='password' onChange={handlePW} value={password} className="password"/>
            </div>

            <div className='checkPW'>
                <label htmlFor='check_password'>비밀번호 확인</label>
                <input name='checkedPassword' onChange={handlePW2} value={checkedPassword} className="password"/>
            </div>

            <div className='selectMajor'>
                <label htmlFor='state'>신분</label>
                <select name={state} onChange={handleState} value={selectedState} className="major">
                    {state_list.map((major) => (
                        <option value={major} key={major}> {major} </option>
                    ))}
                </select>
            </div>

            <div className='addKeyword'>
                <label htmlFor='keyword'>키워드</label>
                <input name='keyword' onChange={handleKeyword} value={keyword} className="keyword"/>
            </div>

            <div>
                <button onClick={handleSignup}>확인</button> 
            </div>
        </div>
    )
}