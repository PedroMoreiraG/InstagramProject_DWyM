/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/MyProfile';
import { Login } from './components/Login';
import Signup from './components/Signup'
import Feed from './components/Feed';
import './App.css'
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('authenticated') === 'true'
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('authenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authenticated');
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route
          path="/feed"
          element={<Feed onLogout={handleLogout} />}
        />
      </Routes>
    </Router>
  );
}

export default App;



// /* eslint-disable no-unused-vars */
// import React from 'react';
// import './App.css'
// import { Login } from './components/Login';
// import { Routes, Route, Navigate, Router } from "react-router-dom";
// import Profile from './components/MyProfile';
// function App() {

//   return (
//     <>
//     {/* <Router> 
//       <Routes>
//         <Route path="/profile/:username" element={<Profile />} /> 
//       </Routes>

//     </Router> */}
//       <div className='App'>
//         <Login/>
//       </div>
//     </>
//   );
// }

// export default App
