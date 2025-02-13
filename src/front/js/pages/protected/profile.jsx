import { useState, useEffect } from 'react';
import React from 'react'
import Card from 'react-bootstrap/Card';
import Logo from '../../../img/logo.jpg';
import Profilecard from "../../../styles/profileCard.css"
import CloudinaryUploadWidget from '../../component/CloudinaryUploadWidget'

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const defaultProfileImage = Logo;
  const [profileImage, setProfileImage] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    location: '',
    description: '',
    email: '',
    profileImage: defaultProfileImage,
  });

  useEffect(() => {
    if (!!profileImage) {
      setProfileData({ ...profileData, profileImage });
    }
  }, [profileImage])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfileData((prev) => ({
  //         ...prev,
  //         profileImage: reader.result, // Guardar la imagen en base64
  //       }));
  //     };
  //     reader.readAsDataURL(file); // Convertir la imagen a base64
  //   }
  // };   ESTO NO ESTA HACIENDO NADA PERO DEJARLO POR SI ACASO

  const handleSave = async () => {
    setIsEditing(false);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.BACKEND_URL}api/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(profileData)
      })
      console.log(response)
    } catch (error) {

    }
    console.log('Datos guardados:', profileData);
  };

  const fetchProfileData = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}api/profile`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al cargar los datos del perfil');
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error al cargar los datos del perfil:', error);
      }
    } else {
      console.log('No hay token de autenticación');
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

    const eliminarToken = () => {
      if (localStorage.getItem('token')) {
          localStorage.removeItem('token');
          console.log('Token eliminado');
          alert('Has cerrado sesión correctamente');
      } else {
          console.log('No hay token almacenado');
          alert('Primero inicia sesión');
      }
  }


  return (
    <Card className="profile-card" style={{ maxWidth: '18rem', margin: 'auto', height: '100%' }}>
      <Card.Img
        variant="top"
        src={profileData.profileImage || defaultProfileImage}
        alt="Perfil"
        className="rounded-circle"
        style={{ objectFit: 'cover', width: '140px', height: '170px', margin: '0 auto' }}
      />
      <Card.Body>
        {isEditing ? (
          <>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleChange}
                className="form-control mb-2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Edad</label>
              <input
                type="number"
                id="age"
                name="age"
                value={profileData.age}
                onChange={handleChange}
                className="form-control mb-2"
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Ubicación</label>
              <input
                type="text"
                id="location"
                name="location"
                value={profileData.location}
                onChange={handleChange}
                className="form-control mb-2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={profileData.description}
                onChange={handleChange}
                className="form-control mb-2"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                className="form-control mb-2"
              />
            </div>

            {/* Input para cambiar la imagen de perfil */}
            <div className="form-group">
              <label htmlFor="profileImage">Cambiar Imagen de Perfil</label>
              <CloudinaryUploadWidget setImageURL={setProfileImage} folder="profiles" />
            </div>

            <button onClick={handleSave} className="btn btn-success btn-block">Guardar Cambios</button>
          </>
        ) : (
          <>
            <Card.Title className="text-center">{profileData.name}</Card.Title>
            <Card.Text className="text-center text-muted">
              {profileData.description}
            </Card.Text>

            <div className="about-me mb-3 text-center">
              <h5>Acerca de mí</h5>
              <p>{profileData.description}</p>
            </div>

            <div className="details mb-3">
              <p><strong>Edad:</strong> {profileData.age}</p>
              <p><strong>Ubicación:</strong> {profileData.location}</p>
              <p><strong>Correo:</strong> {profileData.email}</p>
            </div>

            <div className="social-links text-center mb-3">
              <a href="https://www.facebook.com/juanperez" target="_blank" rel="noopener noreferrer" className="social-icon m-1">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/juanperez" target="_blank" rel="noopener noreferrer" className="social-icon m-1">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com/in/juanperez" target="_blank" rel="noopener noreferrer" className="social-icon m-1">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>

            <button onClick={() => setIsEditing(true)} className="btn btn-primary btn-block">Editar Perfil</button>
            <br></br>
            <button onClick={eliminarToken}>Log out</button>
          </>
        )}
          
      </Card.Body>
    </Card>
  );
};
