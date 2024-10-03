/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import GooglePlayimg from '../assets/GooglePlayimg.png'
import Microsoftimg from '../assets/Microsoftimg.png'
import InstagramLogo from '../assets/Logo-Instagram.png'
import fbimg from '../assets/fbimg.png'
import '../../src/App'
export const Login = () => {
  return (
    <div className='login-container'>
        <div className='box-1'>
            <div className='box-1-logo'>
                <img src={InstagramLogo} alt='#'className='Instagram-logo'/>
            </div>
            <div className='input-box'>
                <input 
                type='text' 
                placeholder='Teléfono, usuario o correo electrónico'                
                />
            </div>
            <div className='input-box'>
                <input 
                type="password" 
                placeholder='Contraseña' 
                />
            </div>
            <div className='login-button-box'>
                <button className='login-button'>Entrar</button>
            </div>
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
                ¿No tienes una cuenta? <span className='sign-up-span'>Regístrate</span>
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
