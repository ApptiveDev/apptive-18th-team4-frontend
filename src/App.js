import './App.css';
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/home/home'
import SignUp from './pages/signUp/signUp'
import Login from './pages/login/login'

import Test from './pages/geolocation/index'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          <Route path="/test" element={<Test />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
