import './App.css';
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/*<Route path="/" element={<SearchCafe />} />*/}
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
