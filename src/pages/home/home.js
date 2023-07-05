import { Link } from 'react-router-dom'
import './home.css'

export default function Home() {
    return (
        <div>
            <div className="top_container">
                {/*상단 navbar*/}
                <div style={{padding: '0 14%'}} className='home_nav'>
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
                {/*상단 로고, 아이콘*/}
                <div className="sub_container">
                    <div style={{}}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '7.125rem',
                            height: '7.125rem',
                            background: '#fff',
                            borderRadius: '0.8125rem', 
                        }}>
                            <img src="/assets/img/logo_home2.png" />
                        </div>

                        <div style={{display: 'flex'}}>
                            <div>
                                <div style={{
                                    width: '30rem',
                                    color: '#13005E',
                                    fontSize: '4rem',
                                    fontStyle: 'normal',
                                    fontWeight: '600',
                                    padding: '2.44rem 0'
                                }}>
                                    부산대 알리미
                                </div>
                                <div style={{
                                    color: '#FFF',
                                    fontSize: '1.5rem'
                                }}>
                                    여러분의 소중한 시간을 지켜드리는
                                </div>
                            </div>
                            <div style={{display: 'flex', alignItems: 'flex-end'}}>
                                <a href='#s1'>
                                    <div className='shortcutBtn'>
                                        <img src="/assets/img/home_icon1.png" />
                                        빈 강의실 찾기
                                    </div>
                                </a>
                                <a href='#s2'>
                                    <div className='shortcutBtn'>
                                        <img src="/assets/img/home_icon2.png" />
                                        학사일정
                                    </div>
                                </a>
                                <a href='#s3'>
                                    <div className='shortcutBtn'>
                                        <img src="/assets/img/home_icon3.png" />
                                        공지사항
                                    </div>
                                </a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            
            <div id="s1">
                <img src="/assets/img/home_icon1.png" style={{backgroundColor: 'black'}}/>
                빈 강의실
            </div>
            <div id="s2">학사일정</div>
            <div id="s3">공지사항</div>

        </div>
    )
}