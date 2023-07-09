import './nav_bar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return(
        <div className='nav_bar'>
            <div style={{padding: '0 14%'}} className='nav_bar'>
                <Link to="/"><img src='./assets/img/navbar_logo.png' className='logo'/></Link>
                <Link to="/nearBuilding">빈 강의실 찾기</Link>
                <Link to="/annualPlan">학사일정</Link>
                <Link to="/announcement">공지사항</Link>
                <div className='button_container'>
                    <Link to="/signup">
                        <button className='home'>Sign Up</button>
                    </Link>
                    <button className='logout'>Log Out</button>
                </div>
            </div>
        </div>
    )
}