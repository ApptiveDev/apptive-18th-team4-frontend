import { Link } from 'react-router-dom'
import './home.css'
import {ScrollMenu} from "react-horizontal-scrolling-menu";
import {useEffect, useRef, useState} from "react";

const elemPrefix = "test";
const getId = (index) => `${elemPrefix}${index}`;

const getItems = () =>
    Array(20)
        .fill(0)
        .map((_, ind) => ({ id: getId(ind) }));

const cardStyle = {
    // position: "absolute",
    minWidth: 500,
    minHeight: 300,
    borderRadius: "25px",
    background: "#D9D9D9",
    marginLeft: 25
}

export default function Home() {
    const ref = useRef(null);

    let autoScrollTimer = undefined;
    const scrollOffset = 525;
    const scrollDelay = 1000;

    useEffect(() => {
        autoScrollTimer = setInterval(() => {
            console.log("ref.current.scrollWidth", ref.current.scrollWidth - ref.current.clientWidth, ref.current.scrollLeft)

            let nextPos = 0;

            while(nextPos <= ref.current.scrollLeft)
                nextPos += scrollOffset;

            if(ref.current.scrollWidth - ref.current.clientWidth <= ref.current.scrollLeft)
                ref.current.scrollLeft = 0;
            else
                ref.current.scrollLeft = nextPos;
        }, scrollDelay);

        return () => {
            clearInterval(autoScrollTimer);
            autoScrollTimer = undefined;
        };
    }, []);

    return (
        <div>
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
            </div>

            <div ref={ref} style={{scrollBehavior: "smooth", marginLeft:"20%", width: "80%", overflow: "scroll", display: "flex", position: "absolute", top:720}}>
                {/*top 알아서 수정*/}
                {getItems().map((value, index) => {
                    return (
                        <div style={{...cardStyle}} key={value.id}>{value.id}</div>
                    );
                })}

            </div>


        </div>
    )
}
