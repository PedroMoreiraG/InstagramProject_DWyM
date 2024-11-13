/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import Profile from './components/Profile/MyProfile';
import { Login } from './components/Login';
import Signup from './components/Signup'
import Feed from './components/Feed';
import {EditProfile } from './components/Profile/EditProfile';
import AddFriend from './components/AddFriends';
import FriendProfile from './components/Profile/FriendProfile';
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/addfriend" element={<AddFriend />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profileFriend/:id" element={<FriendProfile />} />
        <Route
          path="/feed"
          element={<Feed onLogout={handleLogout} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
