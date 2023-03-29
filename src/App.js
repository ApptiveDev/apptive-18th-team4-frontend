import './App.css';
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SignUp from './pages/signUp/signUp'
import Login from './pages/login/login'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
