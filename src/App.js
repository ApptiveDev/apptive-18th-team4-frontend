import './App.css';
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/home/home'
import SignUp from './pages/signUp/signUp'
import Login from './pages/login/login'
import FindId from './pages/find_id/find_id';
import FindPw from './pages/find_pw/find_pw';

import AnnualPlan from './pages/annual_plan/annual_plan';
import Test from './pages/geolocation/index'

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

          <Route path='/annualPlan' element={<AnnualPlan />} />
          <Route path="/test" element={<Test />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
