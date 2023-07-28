import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./find_id.css";
import GradationBox from "../../components/gradation_box/gradation_box";
import { instance } from "../../components/ApiContoller";

export default function FindId() {
  const [nickname, setNickname] = useState("");
  const [findQuesNum, setQuesNum] = useState("");
  const [findAnswer, setAnswer] = useState("");
  const navigate = useNavigate();

  const question_list = [
    "",
    "내가 다닌 초등학교는?",
    "인상 깊게 읽은 책 이름은?",
    "내 별명은?",
    "내가 좋아하는 캐릭터는?",
    "자신의 인생 좌우명은?", 
    "내가 좋아하는 색깔은?"
  ];

  const handleFindId = (e) => {
    e.preventDefault();
    if (nickname.length === 0) alert("닉네임을 입력해주세요");
    else if (findQuesNum.length === 0 || findQuesNum === "")
      alert("아이디 확인 질문을 선택해주세요");
    else if (findAnswer.length === 0) alert("아이디 확인 답을 입력해주세요");
    else {
      instance
        .post("/auth/findingId", {
          nickname: nickname,
          findQuesNum: parseInt(findQuesNum, 10),
          findAnswer: findAnswer,
        })
        .then((response) => {
          alert(`Your username is ${response.data}`);
          navigate("/login");
        })
        .catch((error) => {
          alert("정보가 올바르지 않습니다");
          console.log(error);
        });
    }
  };

  return (
    <div className="find_id">
      <GradationBox />
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div className='navbar'>
            <div><Link to='/'>Home</Link></div>
            <div><Link to='/login' style={{fontWeight: '700', color: '#000'}}>Log in</Link></div>
            <div><Link to='/signUp'>Sign up</Link></div>
        </div>

        <div className="title">아이디 찾기</div>

        <div className="enterNickname">
          <div>
            <label htmlFor="nickname">닉네임</label>
          </div>
          <input
            name="nickname"
            onChange={(e) => setNickname(e.target.value)}
            value={nickname}
            className="nickname"
          />
        </div>

        <div className="selectQues">
          <div>
            <label htmlFor="state">아이디 확인 질문</label>
          </div>
          <select
            name={findQuesNum}
            onChange={(e) => setQuesNum(parseInt(e.target.value, 10))}
            value={findQuesNum}
            className="select_ques"
          >
            {question_list.map((question, idx) => (
              <option value={idx} key={idx}>
                {" "}
                {question}{" "}
              </option>
            ))}
          </select>
        </div>

        <div className="enterAnswer">
          <div>
            <label htmlFor="findAnswer">아이디 확인 답</label>
          </div>
          <input
            name="findAnswer"
            onChange={(e) => setAnswer(e.target.value)}
            value={findAnswer}
            className="findAnswer"
          />
        </div>

        <div>
          <button onClick={handleFindId}>아이디 찾기</button>
        </div>
      </div>
    </div>
  );
}
