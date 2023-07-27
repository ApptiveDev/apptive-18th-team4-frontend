import './App.css';
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/home/home'
//기능1
import SignUp from './pages/signUp/signUp'
import Login from './pages/login/login'
import FindId from './pages/find_id/find_id';
import FindPw from './pages/find_pw/find_pw';
//기능2 (공지사항 조회)
import Announcement from './pages/announcement/announcement';
//기능3 (빈 강의실 조회)
import AnnualPlan from './pages/annual_plan/annual_plan';
//기능4 (학사일정 조회)
import NearBuilding from './pages/nearBuilding/nearBuilding';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/findId" element={<FindId />} />
          <Route path="/findPw" element={<FindPw />} />
          <Route path="/announcement" element={<Announcement />} />
          <Route path='/annualPlan' element={<AnnualPlan />} />
          <Route path="/nearBuilding" element={<NearBuilding />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
