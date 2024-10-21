/* eslint-disable no-unused-vars */
import '../App'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Profile.css';
import { fetchProfileData } from '../api/mockApi';
import InstagramLogo from '../assets/Logo-Instagram.png';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { username } = useParams(); // Obtiene usuarios desde el url
  const [profileData, setProfileData] = useState({});
  const [posts, setPosts] = useState([]);


  return (
    <div className='profile'>
      <div className='left-box'>
        <div className='box-1-logo'>
          <img src={InstagramLogo} alt='#'className='Instagram-logo-feed'/>
          </div>
        <div className='home-button-box'>
          <button className='home-button'><Link to={'/feed'}>Home</Link></button>
        </div>
        <div className='notificaciones-button-box'>
          <button className='notificaciones-button'><Link to={'/Notifications'}>Notifications</Link></button>
        </div>
        <div className='create-button-box'>
          <button className='create-button'><Link to={'/Create'}>Create</Link></button>
        </div>
        <div className='home-button-box'>
          <button className='profile-button'><Link to={'/profile/:username'}>Profile</Link></button>
        </div>
      </div>
      <div className='profile-box'>
        <div className='profile-info'>
        <div className="profile-img">
          <img src={profileData.avatar} alt={`${username}'s avatar`} /> 
        </div>
        <div className='profile-data'>
        <div className='profile-username'>
          <h1>{profileData.username}</h1>
        </div>
        <div className="profile-stats">
          <span>{posts.length} Posts</span>
          <span>{profileData.followers} Followers</span>
          <span>{profileData.following} Following</span>
          
        </div>
        <div className='profile-bio'>
          <p>{profileData.bio}</p>
        </div>
        </div>
        </div>
        <div className="profile-posts">
          {posts.map((post, index) => (
            <img key={index} src={post.imageUrl} alt={`Post ${index}`} />
          ))}
        </div>
      </div>
    </div>
  );
}


export default Profile;