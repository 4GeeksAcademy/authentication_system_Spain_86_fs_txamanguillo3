import React, { useContext, useState } from 'react';
import CloudinaryUploadWidget from '../component/CloudinaryUploadWidget';
import "../../styles/addProductForm.css"; // Importamos el archivo CSS para darle estilo a esto(revisar importación)
import { Actions } from '@cloudinary/url-gen/index';
import { Context } from '../store/appContext';

const AddProductForm = ({ onProductAdded }) => {
  const { actions } = useContext(Context);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      name,
      price,
      description,
      image_url
    }
    actions.addProduct(product);
  };

  return (
    <div className="add-product-form">
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
      <CloudinaryUploadWidget folder='products' setImageURL={setImageURL} />
      <button className="form-button" onClick={handleSubmit}>Add Product</button>
    </div>
  );
};

export default AddProductForm;
