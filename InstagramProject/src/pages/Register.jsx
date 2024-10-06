import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GooglePlayimg from '../assets/GooglePlayimg.png';
import Microsoftimg from '../assets/Microsoftimg.png';
import InstagramLogo from '../assets/Logo-Instagram.png';
import fbimg from '../assets/fbimg.png';
import '../App';
import './Register.css'; 

export const Register = () => {
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ mobileOrEmail, password, fullName, username });
  };

  return (
    <div className='register-container'>
      <div className='box'>
        <div className='logo'>
          <img src={InstagramLogo} alt='Instagram' className='Instagram-logo' />
        </div>
        
        <div className='fb-box'>
          <span>
            <img src={fbimg} alt='Facebook' className='fb-logo' />
          </span>
          <p className='fb-link'>Iniciar sesión con Facebook</p>
        </div>

        <p className='register-text'>Regístrate para ver fotos y vídeos de tus amigos.</p>
        <form onSubmit={handleSubmit}>
          <div className='input-box'>
            <input 
              type='text' 
              placeholder='Nombre de móvil o correo electrónico' 
              value={mobileOrEmail}
              onChange={(e) => setMobileOrEmail(e.target.value)}
              required 
            />
          </div>
          <div className='input-box'>
            <input 
              type='password' 
              placeholder='Contraseña' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <div className='input-box'>
            <input 
              type='text' 
              placeholder='Nombre completo' 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required 
            />
          </div>
          <div className='input-box'>
            <input 
              type='text' 
              placeholder='Nombre de usuario' 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className='button-container'>
            <button type='submit' className='register-button'>Registrarse</button>
          </div>
        </form>
        <div className='divider'>
          <div className='line'></div>
          <span className='or'>O</span>
          <div className='line'></div>
        </div>
      </div>

   
      <div className='footer-container'>
        <p className='footer-text'>
          ¿Tienes una cuenta? <Link to="/login" className='sign-in-span'>Entrar</Link>
        </p>
      </div>

      <div className='get-app-box'>
        <p>Descarga la aplicación.</p>
        <div className='app-store-google-play-box'>
          <img src={GooglePlayimg} alt='Google Play' className='GooglePlay-logo' />
          <img src={Microsoftimg} alt='Microsoft Store' className='Microsoft-logo' />
        </div>
      </div>
    </div>
  );
};
