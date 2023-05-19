import './nav_bar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return(
        <div className='nav_bar'>
            <div style={{padding: '0 14%'}} className='nav_bar'>
                <img src='./assets/img/navbar_logo.png' className='logo'/>
                <Link to="/announcement">공지사항</Link>
                <Link to="/nearBuilding">빈 강의실 찾기</Link>
                <Link to="/annualPlan">학사일정</Link>
                <div className='button_container'>
                    <button className='home'>Home</button>
                    <button className='logout'>Log Out</button>
                </div>
            </div>
        </div>
    )
}