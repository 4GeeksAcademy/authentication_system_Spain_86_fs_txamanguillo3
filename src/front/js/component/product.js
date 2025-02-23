import React, { useContext } from 'react';
import { Context } from '../store/appContext';
import "../../styles/product.css"

export const Product = ({ product }) => {

  const { store, actions } = useContext(Context);

  const handleAgregarAlCarrito = () => {
    if (product) {
      actions.agregarAlCarrito({
        id: product.id,
        imageId: product.imageId,
        title: product.title,
        price: product.price,
        cantidad: 1
      })
    }
  }


  return (<>
    <div className="product" key={product.id}>
      <div className="product-image-container">
        <img src={product.imageId} />
      </div>
      <div className="product-card-body">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{product.price} €</p>
      </div>
      <button className='addTooCart' onClick={handleAgregarAlCarrito}><i class="fa-solid fa-cart-plus"></i></button>
    </div>
  </>)
}