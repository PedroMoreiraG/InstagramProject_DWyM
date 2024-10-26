// /* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../../App';
// import InstagramLogo from '../../assets/Logo-Instagram.png';
// import Default from '../../assets/Default.png';
// import Modal from '../Modal/Modal';
// export const EditProfile = () => {
  
//   const [username, setUsername] = useState('');
//   const [description, setDescription] = useState ('');
//   const [profilePicture, setProfilePicture] = useState('');
//   const [error, setError] = useState ('');
//   const [isModalOpen, setModalOpen] = useState(false);

//   const navigate = useNavigate();
  
//   const id = localStorage.getItem('id');
//   const Photo = localStorage.getItem('photoProfile');
//   const user = localStorage.getItem('username') ;
  
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePicture(reader.result); // Guarda la imagen base64 o URL
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleChangePhoto = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };
//   const handleEdit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     try {
//       const response = await fetch(`http://localhost:3001/api/user/profile/edit`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, profilePicture }),
//       });

//       const data = await response.json();
//       if (response.ok) {
//         navigate(`/profile/${id}`); 
//         setModalOpen(false);
//       } else {
//         setError(data.message || 'Error en el registro');
//       }
//     } catch (error) {
//       setError('Error al conectar con el servidor');
//     }
//   };
  


//   return (
//     <div className='container-edit'>
//             <div className='left-box'>
//         <div className='box-1-logo'>
//           <button className='home-img' onClick={() => navigate('/feed')}>
//             <img src={InstagramLogo} alt='#' className='Instagram-logo-feed' />
//           </button>
//         </div>
//         <div className='home-button-box'>
//           <button className='home-button' onClick={() => navigate('/feed')}>Inicio</button>
//         </div>
//         <div className='notificaciones-button-box'>
//           <button className='notificaciones-button' onClick={() => navigate('/notificaciones')}>Notificaciones</button>
//         </div>
//         <div className='create-button-box'>
//           <button className='create-button' onClick={() => navigate('/create')}>Crear</button>
//         </div>
//         <div className='home-button-box'>
//           <button className='profile-button' onClick={() => navigate(`/profile/${id}`)}>Perfil</button>
//         </div>
//       </div>
//     <div className='edit-container'>
//         <div className='title-box'>
//             <h1 className='title-edit'>Editar Perfil</h1>
//         </div>
        
//         <div className='box-photoedit'>
//             <div className="profileedit-img">
//                 <img src={Photo || Default} alt={`${username}'s avatar`} /> 
//             </div>
//             <div className='edit-username'>
//                 <h1>{username || user}</h1>
//               </div>
//               <div className='edit-box'>
//                 <button className='button-photoedit' onClick={handleChangePhoto}>Cambiar Foto</button>
//               </div>
//         </div>

      
//       <form onSubmit={handleEdit}>
//       {error && <p className="error">{error}</p>}

//         <div className='login-button-box'>
//           <button className='login-button'  type="submit" onClick={handleEdit}>Enviar</button>
//           </div>
//       </form>
//       </div>
//       <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
//         <h2>Cambiar foto del perfil</h2>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//         />
//         {profilePicture && (
//           <div>
//             <h3>Vista previa:</h3>
//             <img src={profilePicture} alt="Vista previa" style={{ width: '100px', height: '100px' }} />
//           </div>)}
//           <button
//           className="add-button"
//           onClick={handleEdit}
//         >
//           Cambiar
//         </button>
//       </Modal>
//     </div>
    
//   );
// };

// export default EditProfile;

/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App';
import InstagramLogo from '../../assets/Logo-Instagram.png';
import Default from '../../assets/Default.png';
import Modal from '../Modal/Modal';

export const EditProfile = () => {
  
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();
  
  const id = localStorage.getItem('id');
  const Photo = localStorage.getItem('photoProfile');
  const user = localStorage.getItem('username');
  
  const handleImageChange = (e) => {
    setProfilePicture(e.target.files[0]); // Guardar el archivo en lugar de la URL o base64
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
    
    // Usamos FormData para enviar la imagen y otros datos
    const formData = new FormData();
    formData.append('username', username);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await fetch(`http://localhost:3001/api/user/profile/edit`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        navigate(`/profile/${id}`);
        setModalOpen(false);
      } else {
        setError(data.message || 'Error en la actualización');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
      setModalOpen(false); 
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
            <button className='button-photoedit' onClick={handleChangePhoto}>Cambiar Foto</button>
          </div>
        </div>

        <form onSubmit={handleEdit}>
          {error && <p className="error">{error}</p>}
          <div className='login-button-box'>
            <button className='login-button' type="submit">Enviar</button>
          </div>
        </form>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Cambiar foto del perfil</h2>
        <button>
          <input className='image-change'
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        </button>
        {profilePicture && (
          <div>
            <h3>Vista previa:</h3>
            <img src={URL.createObjectURL(profilePicture)} alt="Vista previa" style={{ width: '100px', height: '100px' }} />
          </div>
        )}
        <button className="login-button" onClick={handleEdit}>Cambiar</button>
      </Modal>
    </div>
  );
};

export default EditProfile;
