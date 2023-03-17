import './App.css';
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from './pages/issue_code/test';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Test />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
