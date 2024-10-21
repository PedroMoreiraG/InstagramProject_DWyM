/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../../src/App';
import InstagramLogo from '../assets/Logo-Instagram.png'
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState ('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token); // Guardar token después del registro
        navigate('/'); // Redirigir al home
      } else {
        setError(data.message || 'Error en el registro');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };


  return (
    <div className='login-container'>
      <div className='box-1'>
            <div className='box-1-logo'>
                <img src={InstagramLogo} alt='#'className='Instagram-logo'/>
            </div>
      
      <div className='singup--box'>
      <form onSubmit={handleSignup}>
      {error && <p className="error">{error}</p>}
        <div className='input-box'>
        <input
          className='user-signup-box' 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input
          className='user-signup-box' 
          type="text" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        </div>
        <div className='input-box'>
        <input 
          className='user-signup-box' 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        </div>
        <div className='login-button-box'>
          <button className='login-button'  type="submit" onClick={handleSignup}>Registrarse</button>
          </div>
      </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;