import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import './tab.css';

function Tab() {
    const [selectedTab, setSelectedTab] = useState('tab1');

    const handleTabClick = (tabID) => {
        setSelectedTab(tabID);
    }
    
    return ( 
        <div className='tab' style={{height: '19rem', background: '#fff', marginTop: '1.06rem'}}>
            <Nav justify variant="tabs">
                <Nav.Item onClick={() => handleTabClick('tab1')}>
                    <Nav.Link active={selectedTab === 'tab1'} style={{ background: selectedTab === 'tab1' ? '#fff' : '#E2E2E2' }}>제6공학관</Nav.Link>
                    
                </Nav.Item>
                <Nav.Item onClick={() => handleTabClick('tab2')}>
                    <Nav.Link active={selectedTab === 'tab2'} style={{ background: selectedTab === 'tab2' ? '#fff' : '#E2E2E2' }}>제7공학관</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => handleTabClick('tab3')}>
                    <Nav.Link active={selectedTab === 'tab3'} style={{ background: selectedTab === 'tab3' ? '#fff' : '#E2E2E2' }}>제8공학관</Nav.Link>
                </Nav.Item>
            </Nav>

            {selectedTab === 'tab1' && <div style={{display: 'flex'}}>
                <div style={{width: '50%', overflowY: 'scroll', height: '260px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '2rem 3rem'}}>
                        <span>현재 빈 강의실 목록 </span>
                        <span>사용 가능한 시간</span>
                    </div>
        
                </div>

                <div style={{width: '50%'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', margin: '2rem 3rem'}}>
                        <span>수업이 곧 끝나는 강의실 </span>
                        <span>사용 가능한 시간</span>
                    </div>
                </div>
            </div>}
            
        </div>

    );
}
  
export default Tab;
