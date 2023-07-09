import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './find_pw.css';
import GradationBox from '../../components/gradation_box/gradation_box';

export default function FindPw() {
    const [email, setEmail] = useState('');
    const [verification_code, setCode] = useState('');

    const handleFindPw = (e) => {
        e.preventDefault()
        if (email.length === 0) alert("아이디를 입력해주세요")
        else if (verification_code.length === 0) alert("인증번호를 입력해주세요")
        else {
            //요청 url 수정해야함
            axios.post("http://3.34.82.40:8080/auth/login", {
                    email: email,
                    verification_code: verification_code
                }, { headers: { 'Content-Type': 'application/json'} })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    return(
        <div className='find_pw'>
            <GradationBox />
            <div style={{marginLeft: '105px'}}>
                <div className='navbar'>
                    <div><Link to='/'>Home</Link></div>
                    <div><Link to='/login' style={{color: '#666666'}}>Log in</Link></div>
                    <div><Link to='/signUp' style={{color: '#666666'}}>Sign up</Link></div>
                </div>

                <div className='title'>
                    비밀번호 찾기
                </div>

                <div className='enterEmail'>
                    <div><label htmlFor='email'>아이디</label></div>
                    <input name='email' onChange={e => setEmail(e.target.value)} value={email} className="email" />
                </div>

                <div className='enterCode'>
                    <div><label htmlFor='verification_code'>인증번호</label></div>
                    <input name='verification_code' onChange={e => setCode(e.target.value)} value={verification_code} className="verification_code" />
                </div>

                <div className='sendCode'>
                    {/*onClick 이벤트 등록해야 됨*/ }
                    <button>인증번호 발송</button> 
                </div>

                <div>
                    <button onClick={handleFindPw} className='findPW_btn'>비밀번호 찾기</button> 
                </div>
            </div>
        </div>
    );
}