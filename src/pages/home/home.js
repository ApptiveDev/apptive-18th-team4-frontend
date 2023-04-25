import { Link } from 'react-router-dom'
import './home.scss'

export default function Home() {
    return (
        <div className="home_container">
            <div className='top_container'>
                <div className='top_container1'>
                    <img src="/assets/img/logo_home.png" />
                    <p>부산대 알리미</p>
                </div>
                
                <div className='top_container2'>
                    <Link to="/signUp">
                        <button name="SignUp">SignUp</button>
                    </Link>
                    <Link to="/login">
                        <button name="Login">Login</button>
                    </Link>
                </div>
            </div>

            <div className='middle_container'>
                여러분의 소중한 시간을 지켜드리는<br/>부산대 알리미
            </div>

            <div className='bottom_container'>
                <div className='notice'>
                    <div className='bottom_container1'>
                        <span>공지사항</span>
                        <img src='/assets/img/plus_button.png' />
                    </div>
                </div>
                <div className='annual_plan'>
                    <div className='bottom_container1'>
                        <span>학사일정</span>
                        <img src='/assets/img/plus_button.png' />
                    </div>
                </div>
                <div className='near_building'>
                    <div className='bottom_container1'>
                        <span>빈 강의실 찾기</span>
                        <img src='/assets/img/plus_button.png' />
                    </div>
                </div>
            </div>
                
        </div>
    )
}