import React, { useState } from 'react';
import { uploadImageToCloudinary } from '../component/CloudinaryUploadWidget';
import "../../styles/addProductForm.css"; // Importamos el archivo CSS para darle estilo a esto(revisar importación)

const AddProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    file: null,
  });

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price,
      description,
      image_url
    }
    console.log(product);
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-input"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="form-input"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-textarea"
        required
      ></textarea>
      <CloudinaryUploadWidget folder='products' setImageUrl={setImageUrl}/>
      <button type="submit" className="form-button">Add Product</button>
    </form>
  );
};

export default AddProductForm;
