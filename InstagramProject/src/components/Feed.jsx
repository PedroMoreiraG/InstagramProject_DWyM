/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './Feed.css';
import InstagramLogo from '../assets/Logo-Instagram.png';

import {useNavigate, Link } from 'react-router-dom';
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const username = localStorage.getItem('username');
  const id = localStorage.getItem('id');
   useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token'); 
    
      try {
        const response = await fetch('http://localhost:3001/api/posts/feed', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        const data = await response.json();
    
        if (response.ok) {
          setPosts(data); // Guardar los posts en el estado
        } else {
          setError('Error al cargar los posts');
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
    
  }, []);

  if (loading) {
    return <p>Cargando posts...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div className='container'>
       <div className='left-box'>
         <div className='box-1-logo'>
           <button className='home-img' onClick={() => navigate('/feed')}><img src={InstagramLogo} alt='#'className='Instagram-logo-feed'/></button>
           </div>
         <div className='home-button-box'>
           <button className='home-button' onClick={() => navigate('/feed')}>Inicio</button>
         </div>
         <div className='notificaciones-button-box'>
           <button className='notificaciones-button' onClick={() => navigate('/notificaciones')}>Notifications</button>
         </div>
         <div className='create-button-box'>
           <button className='create-button' onClick={() =>  navigate('/create')}>Crear</button>
         </div>
         <div className='home-button-box'>
           <button className='profile-button' onClick={()=> navigate(`/profile/${id}`)}>Perfil</button>
         </div>
       </div>

    <div className="feed-container">
      {posts.length === 0 ? (
        <p>No hay posts para mostrar.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="post">
            <div className="post-header">
              <h4>{post.username}</h4>
              <span>{new Date(post.createdAt).toLocaleString()}</span>
            </div>
            <div className="post-image">
              <img src={post.imageUrl} alt="Post" />
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default Feed;