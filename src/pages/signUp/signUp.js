import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import { instance } from '../../components/ApiContoller';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPW] = useState("");
  const [checkedPassword, setPW2] = useState("");
  const [nickname, setNickname] = useState("");
  const [state, setState] = useState("");
  const [findQuesNum, setQuesNum] = useState("");
  const [findAnswer, setAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const state_list = ["Choose your state", "대학생", "대학원생", "휴학생", "신입생"];
  const question_list = [
    "Choose a question",
    "내가 다닌 초등학교는?",
    "인상 깊게 읽은 책 이름은?",
    "내 별명은?",
    "내가 좋아하는 캐릭터는?",
    "자신의 인생 좌우명은?", 
    "내가 좋아하는 색깔은?"
  ];
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  console.log(findQuesNum);

  const navigate = useNavigate();
  const handleCheckNickname = (e) => {
    e.preventDefault();
    instance
      .get("/auth/checknickname", { params: { nickname } })
      .then((response) => {
        if (response.data === true) {
          alert("사용 가능한 닉네임입니다.");
          setIsNicknameValid(true);
        } else {
          alert("중복된 닉네임입니다.");
          setIsNicknameValid(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (email.length === 0) alert("아이디를 입력해주세요.");
    else if (!isNicknameValid) alert("닉네임 중복 확인이 필요합니다.");
    else if (password.length < 6) alert("비밀번호는 6자리 이상으로 설정해주세요.");
    else if (password !== checkedPassword) alert("비밀번호가 일치하지 않습니다.");
    else if (state === 0 && state.length !== 0) alert("학적 상태를 선택해주세요.");
    else if (findQuesNum == 0 && findAnswer.length !== 0) alert("아이디 확인 질문을 선택해주세요.");
    else if (findQuesNum != 0 && findAnswer.length === 0) alert("아이디 확인 질문의 답을 최소 1자 이상 입력해주세요.");
    else if (!isChecked) alert("약관에 동의하지 않을 경우, 회원가입이 어렵습니다.");
    else {
      const form = new FormData();
      form.append("username", email);
      form.append("password", password);
      form.append("nickname", nickname);
      form.append("state", state); //수정해야 됨
      form.append("findQuesNum", findQuesNum);
      form.append("findAnswer", findAnswer);
      instance
        .post("/auth/signup", form)
        .then(function (response) {
          console.log(response);
          if (response.data.nickname) {
            alert(`${response.data.nickname}님, 회원가입을 환영합니다!`);
            
          } else {
            alert("회원가입을 환영합니다!");
          }
          navigate("/login");
        })
        .catch(function (error) {
          alert(error);
        });
    }
  };
  return (
    <div className="signUp">
      <div className="logo_container">
        <Link to="/">
          <img src="/assets/img/logo_black.png" />
        </Link>
      </div>
      <div className="title_container">회원가입</div>
      <div className="form_container">
        <form onSubmit={handleSignup}>
          <div className="enterEmail">
            <div>
              <label htmlFor="email">아이디 (이메일 형식)</label>
            </div>
            <input
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              className="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="enterPW">
            <div>
              <label htmlFor="password">비밀번호</label>
            </div>
            <input
              name="password"
              onChange={(e) => setPW(e.target.value)}
              value={password}
              className="password"
              placeholder="Enter your password"
            />
            <div className="limitation">최소 6자리 이상</div>
          </div>
          <div className="checkPW">
            <div>
              <label htmlFor="check_password">비밀번호 확인</label>
            </div>
            <input
              name="checkedPassword"
              onChange={(e) => setPW2(e.target.value)}
              value={checkedPassword}
              className="password2"
              placeholder="Check your password"
            />
          </div>
          <div className="state">
            <div>
              <label htmlFor="state">학적 상태</label>
            </div>
            <select
              name={state}
              onChange={(e) => setState(parseInt(e.target.value, 10))}
              value={state}
              className="select-state"
            >
              {state_list.map((state, idx) => (
                <option value={idx} key={idx}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="enterNickname">
            <div>
              <label htmlFor="nickname">닉네임</label>
            </div>
            <input
              name="nickname"
              onChange={(e) => {
                setNickname(e.target.value);
                setIsNicknameValid(false);
              }}
              value={nickname}
              className="nickname"
              placeholder="Enter your nickname"
            />
            <button onClick={handleCheckNickname}>중복 확인</button>
            
          </div>
          <div className="selectMajor">
            <div>
              <label htmlFor="state">아이디 확인 질문</label>
            </div>
            <select
              name={findQuesNum}
              onChange={(e) => setQuesNum(parseInt(e.target.value, 10))}
              value={findQuesNum}
              className="major"
            >
              {question_list.map((question, idx) => (
                <option value={idx} key={idx}>
                  {question}
                </option>
              ))}
            </select>
          </div>
          <div className="enterAnswer">
            <div>
              <label htmlFor="findAnswer">답</label>{" "}
            </div>
            <input
              name="findAnswer"
              onChange={(e) => setAnswer(e.target.value)}
              value={findAnswer}
              className="findAnswer"
              placeholder="Enter your answer"
            />
          </div>
          <div className="agreement">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <label htmlFor="agreement_content">
              이용약관 및 개인정보 취급방침에 동의합니다.
            </label>
          </div>
          <div>
            <button type="submit">회원가입</button>
          </div>
          <div className="link_to_login">
            Already have an account? <Link to="/login" style={{marginLeft: '0.5rem'}}>Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
