import './search.css';
import { buildings } from './buildingList';
import { useState } from 'react';

export default function Search({ onBuildingSelect }) {
    const [cur, setCur] = useState(false);
    const [building, setBuilding] = useState('');

    const handleSelect = (buildingName) => {
        setBuilding(buildingName);
        setCur(false);
    }

    const handleInput = () => {
        if (building === '') alert("건물을 선택해주세요.")
        else {
            /*상위 컴포넌트(nearBuilding.js)에 선택한 건물명 전달*/
            onBuildingSelect(building);
        }
    }

    return(
        <div>
            <div className='search-box'>
                <img src="/assets/img/searchIcon.png" />
                <input 
                    className='search-input'
                    onClick={() => setCur(true)}
                    value={building}
                />
                <span onClick={handleInput}>+</span>
            </div>

            {cur &&
                <div style={{display: 'flex', justifyContent: 'center', width: '21.75rem', position: 'absolute', zIndex: '2'}}>
                    <div className='building-list'>
                        <ul style={{overflowY: 'scroll', height: '100%', padding: '0 2rem'}}>
                            {buildings.map((building) => (
                                <li key={building}>
                                    {building}
                                    <button 
                                        className='building-select-btn'
                                        onClick={() => {handleSelect(building)}}>선택</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            }

            {/*밑에 tab*/}
            <div style={{ position: "absolute", top: '15rem', zIndex: "1", background: 'pink'}}>
                
            </div>
        </div>
    );
}