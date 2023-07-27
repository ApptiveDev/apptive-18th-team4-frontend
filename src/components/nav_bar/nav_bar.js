import { useEffect, useState } from 'react';
import './nav_bar.css';
import { Link, useNavigate  } from 'react-router-dom';
import { instance } from '../ApiContoller';

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('accessToken') !== null) {
            setIsLogin(true)
        }
    }, [isLogin]);

    const navigate = useNavigate();
    const handleLogOut = () => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        instance.post("/auth/logout", {
            accessToken: accessToken, 
            refreshToken: refreshToken
        })
        setIsLogin(false);
        navigate('/');
        localStorage.clear();
    }

    return(
        <div className='nav_bar'>
            <div style={{padding: '0 14%'}} className='nav_bar'>
                <Link to="/"><img src='./assets/img/logo_white.png' className='logo'/></Link>
                <Link to="/nearBuilding">빈 강의실 찾기</Link>
                <Link to="/annualPlan">학사일정</Link>
                <Link to="/announcement">공지사항</Link>
                <div className='button_container'>
                    {!isLogin ? (
                        <Link to="/signup">
                            <button className='home'>Sign Up</button>
                        </Link>
                    ) : (
                        <button className='logout' onClick={handleLogOut}>Log Out</button>
                    )}
                    {!isLogin && (
                        <Link to="/login">
                            <button className='logout'>Log In</button>
                        </Link>  
                    )}
                </div>
            </div>
        </div>
    )
}