/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import GooglePlayimg from '../assets/GooglePlayimg.png'
import Microsoftimg from '../assets/Microsoftimg.png'
import InstagramLogo from '../assets/Logo-Instagram.png'
import fbimg from '../assets/fbimg.png'
import '../App'
import { Link, useNavigate } from 'react-router-dom'
export const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, 
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                // Guarda el token en localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', data.username);
                localStorage.setItem('id', data._id);
                localStorage.setItem('photoProfile', data.profilePicture);

                console.log('Login exitoso', data);
                navigate('/feed'); // Redirige al feed

                // Llama a onLogin si necesitas actualizar el estado global en tu aplicación
                if (onLogin) onLogin(data);
            } else {
                setError(data.message || 'Error en el login');
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
            <form onSubmit={handleLogin}>
            <div className='input-box'>
                
                <input 
                type='text' 
                placeholder='Correo electrónico'        
                value={email}     
                onChange={(e) => setEmail(e.target.value)}
                required   
                />
            </div>
            <div className='input-box'>
                <input 
                type="password" 
                placeholder='Contraseña' 
                value={password}     
                onChange={(e) => setPassword(e.target.value)}
                required   
                />
            </div>
            <div className='login-button-box'>
                <button className='login-button' type="submit">Entrar</button>
            </div>
            </form>
            
            <div className='lines-box'>
                <div className='line-1'></div>
                <div className='or-box'>O</div>
                <div className='line-2'></div>
            </div>
            <div className='fb-box'>
                <span>
                    <img src={fbimg} alt="#" className='fb-logo' />
                </span>
                <p className='fb-link'>Iniciar sesión con Facebook</p>
            </div>
            <div className='forgotten-password-box'>
                <p className='forgotten-password-link'>¿Has olvidado tu contraseña?</p>
            </div>
        </div>
        <div className='box-2'>
            <p>
                ¿No tienes una cuenta? <Link to={"/signup"} className='sign-up-span'>Regístrate</Link>
            </p>
        </div>
        <div className='get-app-box'>
        <p>Descarga la aplicación.</p>
        </div>
        <div className='app-store-google-play-box'>
            <div className='box-store-logo'>
                <img src={GooglePlayimg} alt='#'className='GooglePlay-logo'/>
                <img src={Microsoftimg} alt='#'className='Microsoft-logo'/>
            </div>
        </div>
    </div>
  )
}
