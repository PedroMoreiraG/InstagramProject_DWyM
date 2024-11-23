/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Profile.css';
import InstagramLogo from '../../assets/Logo-Instagram.png';
import Default from '../../assets/Default.png';

export const Profile = () => {

  const username = localStorage.getItem('username');
  const  id  =  localStorage.getItem('id');
  const photo = localStorage.getItem('photoProfile');

  const [user, setUser] = useState({});

  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      // Obtén el token del almacenamiento local
      const token = await localStorage.getItem("token");
      if (!token) throw new Error("Token no encontrado");      

      // Fetch para obtener todos los posts
      const response = await fetch("http://localhost:3001/api/posts/feed", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al obtener el feed");

      const allPosts = await response.json();

      console.log(allPosts);

      // Filtra los posts del usuario logueado
      const filteredPosts = allPosts.filter(post => post.user._id === id);

      // Actualiza el estado con los posts filtrados
      setPosts(filteredPosts);
      console.log(posts);
      setPostCount(filteredPosts.length);
      console.log(postCount);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

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
          localStorage.setItem('friends', JSON.stringify(data.user.friends));
          console.log('friends', localStorage.getItem('friends'));
          console.log(data);
          console.log(user);
        } else {
          setError('Error al cargar el perfil');
        }
      } catch (error) {
        setError('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
              src= {user.user.profilePicture || Default } 
              alt="Profile" 
            />
          </div>
          <div className='profile-data'>
            <div className='profile-settings'>
              <div className='profile-username'>
                <h1>{user.user.username || username}</h1>
              </div>
              <div className='edit-box'>
                <button className='button' onClick={() => navigate('/editprofile')}>Editar Perfil</button>
              </div>
              <div className='add-box'>
                <button className='buttonadd' onClick={() => navigate('/addfriend')}>Agregar Amigos</button>
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
            <img key={index} src={`http://localhost:3001/${post.imageUrl.split("\\").join("/")}`} alt={`Post ${index}`} className="post-image" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
