import React, { useState } from 'react';
import { uploadImageToCloudinary } from '../CloudinaryUploadWidget';
import "../../styles/addProductForm.css"; // Importamos el archivo CSS para darle estilo a esto(revisar importación)

const AddProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file) {
      alert('Debes seleccionar una imagen');
      return;
    }

    // Subir la imagen a Cloudinary
    const imageUrl = await uploadImageToCloudinary(formData.file);
    if (!imageUrl) {
      alert('Error al subir la imagen');
      return;
    }

    // Crear el objeto producto
    const newProduct = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      image_url: imageUrl,
    };

    // Llama a la función del padre para agregar el producto
    onProductAdded(newProduct);

    // Limpiar el formulario
    setFormData({
      name: '',
      price: '',
      description: '',
      file: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="form-input"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="form-input"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="form-textarea"
        required
      ></textarea>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="form-input"
        required
      />
      <button type="submit" className="form-button">Add Product</button>
    </form>
  );
};

export default AddProductForm;
