import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import "../../styles/product.css";

export const Product = ({ product }) => {  
  const { actions } = useContext(Context);

  const handleAgregarAlCarrito = () => {
    if (product) {
      actions.agregarAlCarrito({
        id: product.id,
        imageId: product.imageId || product.image_url, 
        name: product.name,
        price: product.price,
        cantidad: 1
      });
    }
  };

  return (
    <div className="product">
      <div className="product-image-container">
        <img src={product.imageId || product.image_url} alt={product.name} />
      </div>
      <div className="product-card-body">
        <h3 className="product-title">{product.name}</h3>  
        <p className="product-description">{product.description}</p>
        <p className="product-price">{product.price} €</p>
      </div>
      <button className='addTooCart' onClick={handleAgregarAlCarrito}>
        <i className="fa-solid fa-cart-plus"></i>
      </button>
    </div>
  );
};
