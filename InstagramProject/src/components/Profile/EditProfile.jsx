 /* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App';
import InstagramLogo from '../../assets/Logo-Instagram.png';
import Default from '../../assets/Default.png';
import Modal from '../Modal/Modal';
export const EditProfile = () => {
  
  const [username, setUsername] = useState('');
  let [profilePicture, setProfilePicture] = useState('');
  const [error, setError] = useState ('');
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  
  const id = localStorage.getItem('id');
  const Photo = localStorage.getItem('photoProfile');
  const user = localStorage.getItem('username') ;
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Guarda la imagen base64 o URL
        profilePicture = `data:image/png;base64,${profilePicture}`;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePhoto = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`http://localhost:3001/api/user/profile/edit`, {
        method: 'PUT',
        
        headers: { 'Content-Type': 'application/json',
                       Authorization: `Bearer ${token}`, 
            
         },
        body: JSON.stringify({ username, profilePicture }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('photoProfile', profilePicture)
        localStorage.setItem('username', username);
        setModalOpen(false);
        
      } else {
        setError(data.message || 'Error en el registro');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };
  


  return (
    <div className='container-edit'>
            <div className='left-box'>
        <div className='box-1-logo'>
          <button className='home-img' onClick={() => navigate('/feed')}>
            <img src={InstagramLogo} alt='#' className='Instagram-logo-feed' />
          </button>
        </div>
        <div className='home-button-box'>
          <button className='home-button' onClick={() => navigate('/feed')}>Inicio</button>
        </div>
        <div className='create-button-box'>
          <button className='create-button' onClick={() => navigate('/addfirend')}>Agregar</button>
        </div>
        <div className='home-button-box'>
          <button className='profile-button' onClick={() => navigate(`/profile/${id}`)}>Perfil</button>
        </div>
      </div>
    <div className='edit-container'>
        <div className='title-box'>
            <h1 className='title-edit'>Editar Perfil</h1>
        </div>
        
        <div className='box-photoedit'>
            <div className="profileedit-img">
                <img src={Photo || Default} alt={`${username}'s avatar`} /> 
            </div>
            <div className='edit-username'>
                <h1>{username || user}</h1>
              </div>
              <div className='edit-box'>
                <button className='button-photoedit' onClick={handleChangePhoto}>Editar</button>
              </div>
        </div>

      
      <form onSubmit={handleEdit}>
      {error && <p className="error">{error}</p>}

        <div className='login-button-box'>
          <button className='login-button'  type="submit" onClick={() => navigate(`/profile/${id}`)}>Enviar</button>
          </div>
      </form>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Editando perfil</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {profilePicture && (
          <div>
            <h3>Vista previa:</h3>
            <img src={profilePicture} alt="Vista previa" style={{ width: '100px', height: '100px' }} />
          </div>)}
          <input
          type="text"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
          <button
          className="add-button"
          onClick={handleEdit}
        >
          Cambiar
        </button>
      </Modal>
    </div>
    
  );
};

export default EditProfile;
