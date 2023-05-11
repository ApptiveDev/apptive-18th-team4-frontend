import {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './find_id.css';
import GradationBox from '../../components/gradation_box/gradation_box';

export default function FindId() {
    const [nickname, setNickname] = useState('');
    const [findQuesNum, setQuesNum] = useState('');
    const [findAnswer, setAnswer] = useState('');
    const question_list = ['', '내가 다닌 초등학교는?', '인상 깊게 읽은 책 이름은?', '내 별명은?'];

    const handleFindId = (e) => {
        e.preventDefault()
        if (nickname.length === 0) alert("닉네임을 입력해주세요")
        else if (findQuesNum.length === 0 || findQuesNum == '') alert("아이디 확인 질문을 선택해주세요")
        else if (findAnswer.length === 0) alert("아이디 확인 답을 입력해주세요")
        else {
            //요청 url 수정해야함
            axios.post("http://3.34.82.40:8080/auth/login", {
                    nickname: nickname,
                    findQuesNum: findQuesNum,
                    findAnswer: findAnswer
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
        <div className='find_id'>
            <GradationBox />
            <div style={{marginLeft: '105px'}}>
                <div className='navbar'>
                    <div><Link to='/'>Home</Link></div>
                    <div><Link to='/login' style={{color: '#666666'}}>Log in</Link></div>
                    <div><Link to='/signUp' style={{color: '#666666'}}>Sign up</Link></div>
                </div>

                <div className='title'>
                    아이디 찾기
                </div>

                <div className='enterNickname'>
                    <div><label htmlFor='nickname'>닉네임</label></div>
                    <input name='nickname' onChange={e => setNickname(e.target.value)} value={nickname} className="nickname" />
                </div>

                <div className='selectQues'>
                    <div><label htmlFor='state'>아이디 확인 질문</label></div>
                    <select name={findQuesNum} onChange={e => setQuesNum(parseInt(e.target.value, 10))} value={findQuesNum} className="select_ques">
                        {question_list.map((question, idx) => (
                            <option value={idx} key={idx}> {question} </option>
                        ))}
                    </select>
                </div>

                <div className='enterAnswer'>
                    <div><label htmlFor='findAnswer'>아이디 확인 답</label></div>
                    <input name='findAnswer' onChange={e => setAnswer(e.target.value)} value={findAnswer} className="findAnswer" />
                </div>

                <div>
                    <button onClick={handleFindId}>아이디 찾기</button> 
                </div>
            </div>
        </div>
    );
}