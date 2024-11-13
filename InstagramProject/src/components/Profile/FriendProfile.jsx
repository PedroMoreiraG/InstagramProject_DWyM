/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Profile.css';
import InstagramLogo from '../../assets/Logo-Instagram.png';
import Default from '../../assets/Default.png';

export const FriendProfile = () => {
  const { id } = useParams(); 
  const myId = localStorage.getItem('id');
  const friends = JSON.parse(localStorage.getItem('friends')); // Lo vuelvo a convertir en array para poder recorrerlo.
  const [user, setUser] = useState({});
  const [isFriend, setIsFriend] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:3001/api/user/profile/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        
        if (response.ok) {
          setUser(data);

          // Verificar si el usuario es amigo
          if (friends.some(friend => id === friend._id)) { // Recorro friends buscando si el id del perfil pertenece a mi lista de amigos
            setIsFriend(true);
          }
        } else {
          setError('Error al cargar el perfil');
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProfileData();
    } else {
      setError("ID de usuario no encontrado en la URL");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <p>Cargando perfil...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleAddFriend = async (friendId) => {
    if (isFriend) return; // Si ya son amigos, no hace nada

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
        setIsFriend(true); // Actualizar el estado de amistad
      } else {
        setError(data.message || 'Error al agregar amigo');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className='profile'>
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

      <div className='profile-box'>
        <div className='profile-info'>
          <div className="profile-img">
            <img 
              src={user.user.profilePicture || Default} 
              alt="Profile" 
            />
          </div>
          <div className='profile-data'>
            <div className='profile-settings'>
              <div className='profile-username'>
                <h1>{user.user.username}</h1>
              </div>
              <div className='add-box'>
                <button 
                  className='buttonadd' 
                  onClick={() => handleAddFriend(user.user._id)} 
                  disabled={isFriend}
                >
                  {isFriend ? 'Amigo' : 'Agregar Amigo'}
                </button>
              </div>
            </div>
            <div className="profile-stats">
              <span>{posts.length} Posts</span>
              <span>{user.user.friends.length || '0'} Amigos</span>
            </div>
            <div className='profile-bio'>
              <p>{'Bienvenidos a mi perfil'}</p>
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

export default FriendProfile;
