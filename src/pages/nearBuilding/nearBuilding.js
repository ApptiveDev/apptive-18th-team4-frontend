import { useState, useEffect } from "react";
import Navbar from "../../components/nav_bar/nav_bar";
import Modal_nearBuilding from "../../components/modal_nearBuilding/modal";
import Tab from "../../components/tab/tab";
import Map from "../../components/map_nearBuilding/map";
import Search from "../../components/search/search";
import './nearBuilding.css';
//import 'bootstrap/dist/css/bootstrap.min.css';
import data from './data.json';

export default function NearBuilding() {
    const [isLogin, setIsLogin] = useState(false);
    const [selectedTime, setTime] = useState('');
    const timeZones = ['0.5', '1', '2', '3'];

    const [category, setCategory] = useState('위치순');

    useEffect(() => {
        if (localStorage.getItem('accessToken') !== null) {
            setIsLogin(true)
        }
    }, [isLogin]);

    const [selectedBuilding, setSelectedBuilding] = useState('');

    const handleBuildingSelect = (buildingName) => {
        setSelectedBuilding(buildingName);
    };

    return(
        <div style={{background: '#F9F9F9'}}>
            <Navbar />
            <div className="nearBuilding">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <span style={{
                        fontSize: '2.25rem',
                        fontWeight: '600'
                    }}>
                        빈 강의실 찾기
                    </span>  

                    {isLogin && <div style={{display: 'flex'}}>
                        <div 
                            className={category === '위치순' ? "category-btn-clicked": "category-btn" }
                            onClick={() => setCategory('위치순')}>위치순</div>
                        <div 
                            className={category === '즐겨찾기순' ? "category-btn-clicked": "category-btn" }
                            onClick={() => setCategory('즐겨찾기순')}>즐겨찾기순</div>
                    </div>}
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <Modal_nearBuilding />
                    <Search onBuildingSelect={handleBuildingSelect} />
                </div>

                <Tab selectedBuilding={selectedBuilding} />

                <div style={{marginTop: '2.25rem'}}>
                    <label style={{fontWeight: '600', fontSize: '1.5rem'}}>현재 위치</label>
                    <Map />
                </div>
            </div>
            
        </div>
    )
}