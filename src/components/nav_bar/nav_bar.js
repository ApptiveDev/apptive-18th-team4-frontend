import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './nav_bar.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    if (token) {
      api.get('/api/member/nickname', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => setNickname(response.data))
      .catch(error => console.log(error));
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, nickname, setNickname }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function Navbar() {
  const { token, setToken, nickname } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직
    localStorage.removeItem('accessToken');
    // 로그아웃 후 토큰 상태를 null로 변경
    setToken(null);
    // 리다이렉트를 통해 페이지 리렌더링
    navigate("/");
  };
    
  return(
    <div className='nav_bar'>
      <div style={{padding: '0 14%'}} className='nav_bar'>
        <Link to="/"><img src='./assets/img/navbar_logo.png' className='logo'/></Link>
        <Link to="/nearBuilding">빈 강의실 찾기</Link>
        <Link to="/announcement">공지사항</Link>
        <Link to="/annualPlan">학사일정</Link>
        <div className='button_container'>
          {token ? (
            <>
              <div>{nickname}</div>
              <button className='logout' onClick={handleLogout}>Log Out</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className='login'>Login</button>
              </Link>
              <Link to="/signUp">
                <button className='signup'>Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}