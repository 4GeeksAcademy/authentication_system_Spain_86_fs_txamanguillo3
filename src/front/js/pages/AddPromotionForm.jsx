import React, { useContext, useState } from 'react';
import CloudinaryUploadWidget from '../component/CloudinaryUploadWidget';
import "../../styles/addProductForm.css"; 
import { Context } from '../store/appContext';

const AddPromotionForm = ({ onPromotionAdded }) => {
  const { actions } = useContext(Context);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image_url, setImageURL] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promotion = {
      name,
      price,
      description,
      image_url
    }
    await actions.addPromotion(promotion);
    if (onPromotionAdded) onPromotionAdded();
  };

  return (
    <div className="add-product-form">
      <h2>Agregar Promoción</h2>
      <input
        type="text"
        name="name"
        placeholder="Nombre del Producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-input"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="form-input"
        required
      />
      <textarea
        name="description"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-textarea"
        required
      ></textarea>
      <CloudinaryUploadWidget folder='promotions' setImageURL={setImageURL} />
      <button className="form-button" onClick={handleSubmit}>Agregar Promoción</button>
    </div>
  );
};

export default AddPromotionForm;
