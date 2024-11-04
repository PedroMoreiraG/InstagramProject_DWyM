/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './AddFriends.css';
import InstagramLogo from '../assets/Logo-Instagram.png';
import Default from '../assets/Default.png';
import { useNavigate } from 'react-router-dom';
const AddFriend = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3001/api/user/all', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        
        if (response.ok) {
          setUsers(data.flat()); 
        } else {
          setUsers([]); 
          setError('Error al cargar la lista de usuarios');
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
        setUsers([]);
      }
    };

    fetchUsers();
  }, []); 

  const handleAddFriend = async (friendId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:3001/api/user/add-friend/${friendId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        setError(data.message || 'Error al agregar amigo');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className='container'>
        <div className='left-box'>
        <div className='box-1-logo'>
          <button className='home-img' onClick={() => navigate('/feed')}>
            <img src={InstagramLogo} alt='Instagram Logo' className='Instagram-logo-feed' />
          </button>
        </div>
        <div className='home-button-box'>
          <button className='home-button' onClick={() => navigate('/feed')}>Inicio</button>
        </div>
        <div className='create-button-box'>
          <button className='create-button' onClick={() => navigate('/addfriend')}>Agregar</button>
        </div>
        <div className='home-button-box'>
          <button className='profile-button' onClick={() => navigate(`/profile/${id}`)}>Perfil</button>
        </div>
      </div>
    <div className="add-friend-page">
      <h2 className='title'>Agregar Amigos</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className="user-cards-container">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <img src={user.profilePicture || Default} alt={`${user.username}'s profile`} className="profile-picture" />
            <h3>@{user.username}</h3>
            <button onClick={() => handleAddFriend(user._id)}>Agregar Amigo</button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default AddFriend;
