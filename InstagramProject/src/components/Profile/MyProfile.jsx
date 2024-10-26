/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Profile.css';
import InstagramLogo from '../../assets/Logo-Instagram.png';
import Default from '../../assets/Default.png';

export const Profile = () => {
  const username = localStorage.getItem('username');
  const id = localStorage.getItem('id');

  const [profileData, setProfileData] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      
      const token = localStorage.getItem('token');
      try {
        // Ruta para obtener datos del perfil y posts
        const response = await fetch(`http://localhost:3001/api/user/profile/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProfileData(data);
          localStorage.setItem('photoProfile', data.profilePicture);
        } else {
          setError('Error al cargar el perfil');
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id]);

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='profile'>
      <div className='left-box'>
        <div className='box-1-logo'>
          <button className='home-img' onClick={() => navigate('/feed')}>
            <img src={InstagramLogo} alt='#' className='Instagram-logo-feed' />
          </button>
        </div>
        <div className='home-button-box'>
          <button className='home-button' onClick={() => navigate('/feed')}>Inicio</button>
        </div>
        <div className='notificaciones-button-box'>
          <button className='notificaciones-button' onClick={() => navigate('/notificaciones')}>Notificaciones</button>
        </div>
        <div className='create-button-box'>
          <button className='create-button' onClick={() => navigate('/create')}>Crear</button>
        </div>
        <div className='home-button-box'>
          <button className='profile-button' onClick={() => navigate(`/profile/${id}`)}>Perfil</button>
        </div>
      </div>

      <div className='profile-box'>
        <div className='profile-info'>
          <div className="profile-img">
            <img src={ profileData.profilePicture|| Default} alt={`${username}'s avatar`} /> 
          </div>
          <div className='profile-data'>
            <div className='profile-settings'>
              <div className='profile-username'>
                <h1>{profileData.username || username}</h1>
              </div>
              <div className='edit-box'>
                <button className='button' onClick={() => navigate('/editprofile')}>Editar Perfil</button>
              </div>
            </div>
            <div className="profile-stats">
              <span>{posts.length} Posts</span>
              <span>{profileData.followers || '0'} Followers</span>
              <span>{profileData.following || '0'} Following</span>
            </div>
            <div className='profile-bio'>
              <p>{profileData.bio || 'Bienvenidos a mi perfil'}</p>
            </div>
          </div>
        </div>

        <div className="profile-posts">
          {posts.map((post, index) => (
            <img key={index} src={post.imageUrl} alt={`Post ${index}`} className="post-image" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
