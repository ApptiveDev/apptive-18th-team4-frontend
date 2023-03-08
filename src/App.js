import './App.css';
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GoogleLoginBtn from './pages/googleLogin';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<GoogleLoginBtn />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
