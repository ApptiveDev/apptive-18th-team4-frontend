import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./find_pw.css";
import GradationBox from "../../components/gradation_box/gradation_box";
import { instance } from "../../components/ApiContoller";

export default function FindPw() {
  const [email, setEmail] = useState("");
  const [nickname, setCode] = useState("");
  const navigate = useNavigate();

  const handleFindPw = (e) => {
    e.preventDefault();
    if (email.length === 0) alert("아이디를 입력해주세요");
    else if (nickname.length === 0) alert("인증번호를 입력해주세요");
    else {
      instance
        .post("/auth/send-email", {
          username: email,
          nickname: nickname,
        })
        .then((response) => {
          console.log(response.data);
          alert("가입하셨던 이메일로 임시 비밀번호가 발급되었습니다.");
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
          alert("아이디와 닉네임이 일치하지 않습니다. 재확인 해보세요");
        });
    }
  };

  return (
    <div className="find_pw">
      <GradationBox />
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div className='navbar'>
            <div><Link to='/'>Home</Link></div>
            <div><Link to='/login' style={{fontWeight: '700', color: '#000'}}>Log in</Link></div>
            <div><Link to='/signUp'>Sign up</Link></div>
        </div>

        <div className="title">비밀번호 찾기</div>

        <div className="enterEmail">
          <div>
            <label htmlFor="email">아이디</label>
          </div>
          <input
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="email"
          />
        </div>

        <div className="enterCode">
          <div>
            <label htmlFor="nickname">닉네임</label>
          </div>
          <input
            name="nickname"
            onChange={(e) => setCode(e.target.value)}
            value={nickname}
            className="nickname"
          />
        </div>

        <div>
          <button onClick={handleFindPw} className="findPW_btn">
            인증번호 발송
          </button>
        </div>
      </div>
    </div>
  );
}
