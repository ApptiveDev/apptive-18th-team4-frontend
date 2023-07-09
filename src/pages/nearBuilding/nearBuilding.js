import { useState, useEffect } from "react";
import Navbar from "../../components/nav_bar/nav_bar";
import Modal_nearBuilding from "../../components/modal_nearBuilding/modal";
import Tab from "../../components/tab/tab";
import Map from "../../components/map_nearBuilding/map";
import './nearBuilding.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NearBuilding() {
    return(
        <div style={{background: '#F9F9F9'}}>
            <Navbar />
            <div className="nearBuilding">
                <span style={{
                    fontSize: '2.25rem',
                    fontWeight: '600'
                }}>
                    빈 강의실 찾기
                </span>    
                <Modal_nearBuilding />
                <Tab />
                <div style={{marginTop: '5rem'}}>
                    <button className="current-location">현재 위치</button>
                    <Map />
                </div>
                
            </div>
            
        </div>
    )
}