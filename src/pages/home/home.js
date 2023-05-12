import { Link } from 'react-router-dom'
import './home.css'

export default function Home() {

    return (
        <div className="home">
            <div className="header" style={{display: 'flex', justifyContent: 'space-between'}}>
                <Link className="logo-button" to="/home">
                    <img src="/assets/img/logo.png" alt="Logo" />
                </Link>
                <div className="nav-links" style={{display: 'flex', alignItems: 'center'}}>
                    <Link to="/home">Home</Link>
                    <Link to="/updates">Updates</Link>
                    <Link to="/service">Service</Link>
                </div>

                <div className="auth-buttons" style={{display: 'flex', alignItems: 'center'}}>
                <Link to="/signUp">
                        <button className="signup-button">
                            <img src="/assets/img/signup.png" alt="Sign Up" />
                        </button>
                    </Link>

                    <Link to="/login">
                        <button className="login-button">Login</button>
                    </Link> 
                </div>
            </div>
            <div className="main-content">
                <button className="main-button">
                    <img src="/assets/img/Button_빈강의실찾기.png" alt="Main Button" />
                </button>
                <div className="square-image">
                    <img src="/assets/img/Button_학사일정.png" alt="Square" />
                    <img className="overlay-image" src="/assets/img/Group21.png" alt="Overlay" />
                </div>
                <h1 className="title">부산대 알리미</h1>
            </div>

            <Butt0on>test</Button>
        </div>
    )
}
