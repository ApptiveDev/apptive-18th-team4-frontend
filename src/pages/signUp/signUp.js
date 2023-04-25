import {useState} from 'react'
import axios from 'axios'
import './signUp.scss'

export default function SignUp () {
    const [email, setEmail] = useState('')
    const [password, setPW] = useState('')
    const [checkedPassword, setPW2] = useState('')
    const [nickname, setNickname] = useState('')
    const [findQuesNum, setQuesNum] = useState('')
    const [findAnswer, setAnswer] = useState('')
    const [isChecked, setIsChecked] = useState(false);
    const question_list = ['선택', '내가 다닌 초등학교는?', '인상 깊게 읽은 책 이름은?', '내 별명은?']

    console.log(email)
    console.log(password)
    console.log(nickname)
    console.log(findQuesNum)
    console.log(findAnswer)
    
    const handleSignup = (e) => {
        e.preventDefault()
        if (email.length === 0) alert("아이디를 입력해주세요.")
        else if (password.length < 6) alert("비밀번호는 6자리 이상으로 설정해주세요.")
        else if (password !== checkedPassword) alert ("비밀번호가 일치하지 않습니다.")
        else if (findQuesNum == 0 && findAnswer.length !== 0) alert("아이디 확인 질문을 선택해주세요.")
        else if (findQuesNum != 0 && findAnswer.length === 0) alert("아이디 확인 질문의 답을 최소 1자 이상 입력해주세요.")
        else if (!isChecked) alert("약관에 동의하지 않을 경우, 회원가입이 어렵습니다.")
        else {
            const form = new FormData()
            form.append('email', email)
            form.append('password', password)
            form.append('nickname', nickname)
            form.append('findQuesNum', findQuesNum)
            form.append('findAnswer', findAnswer)

            axios.post("http://3.34.82.40:8080/auth/signup", form, { headers: { 'Content-Type': 'application/json'} })
            .then(function(response) {
                console.log(response)
            }) .catch(function(error) {
                console.log(error)
            })
        }
    }

    return (
        <div className='signUp'>
            <div className='logo_container'>
                <img src="/assets/img/logo.jpg"/>
                <p>회원가입</p>
            </div>
            <div className='form_container'>
                <form onSubmit={handleSignup}>
                    <div className='enterEmail'>
                        <div><label htmlFor='email'>아이디</label></div>
                        <input name='email' onChange={e => setEmail(e.target.value)} value={email} type="email" className="email"/>
                    </div>

                    <div className='enterPW'>
                        <div><label htmlFor='password'>비밀번호</label></div>
                        <input name='password' onChange={e => setPW(e.target.value)} value={password} className="password"/>
                        <p>최소 6자리 이상</p>
                    </div>

                    <div className='checkPW'>
                        <div><label htmlFor='check_password'>비밀번호 확인</label></div>
                        <input name='checkedPassword' onChange={e => setPW2(e.target.value)} value={checkedPassword} className="password2"/>
                    </div>

                    <div className='enterNickname'>
                        <div><label htmlFor='nickname'>닉네임</label></div>
                        <input name='nickname' onChange={e => setNickname(e.target.value)} value={nickname} className="nickname"/>
                    </div>

                    <div className='selectMajor'>
                        <div><label htmlFor='state'>아이디 확인 질문</label></div>
                        <select name={findQuesNum} onChange={e => setQuesNum(parseInt(e.target.value, 10))} value={findQuesNum} className="major">
                            {question_list.map((question, idx) => (
                                <option value={idx} key={idx}> {question} </option>
                            ))}
                        </select>
                    </div>

                    <div className='enterAnswer'>
                        <div><label htmlFor='findAnswer'>답</label></div>
                        <input name='findAnswer' onChange={e => setAnswer(e.target.value)} value={findAnswer} className="findAnswer"/>
                    </div>

                    <div className='agreement'>
                        <input type="checkbox" checked={isChecked} onChange={e => setIsChecked(e.target.checked)} className="agreement"/>
                        <label htmlFor='agreement'>이용약관 및 개인정보 취급방침에 동의합니다.</label>
                    </div>

                    <div>
                        <button type="submit">회원가입</button> 
                    </div>
                </form>
            </div>
        </div>
    )
}