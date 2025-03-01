import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';
import "../../styles/product.css"
import { cartoonify } from '@cloudinary/url-gen/actions/effect';

export const Product = ({ product, cantidad }) => {

  const { store, actions } = useContext(Context);

  const [unidades, setUnidades] = useState([]);

  const handleAgregarAlCarrito = () => {
    if (product) {
      actions.agregarAlCarrito({
        id: product.id,
        imageId: product.imageId || product.image_url, 
        name: product.name,
        price: product.price,
        cantidad: product.quantity
      })
    }
  };

  const handleReducirCarrito = () => {
    let nuevoCarrito = store.cart
      .map((item) =>
        item.id === product.id ? { ...item, cantidad: item.cantidad - 1 } : item
      )
      .filter((item) => item.cantidad > 0);
    actions.actualizarCarrito(nuevoCarrito);
  };

  const handleBorrarCarrito = () => {
    let nuevoCarrito = store.cart.filter((item) => item.id != product.id)
    actions.actualizarCarrito(nuevoCarrito)
  }


  useEffect(() => {
    let producto = store.cart?.filter((item) => item.id == product.id)
    producto ? setUnidades(producto) : null
  }, [store.cart])

  useEffect(() => {
    
  }, [])


  return (<>
    <div className="product" key={product.id}>
      <div className="product-image-container">
        <img src={product.imageId || product.image_url} alt={product.name} />
      </div>
      <div className="product-card-body">
        <h3 className="product-title">{product.title}</h3>  
        <p className="product-description">{product.description}</p>
        <p className="product-price">{product.price} €</p>
        <p className='product-quantity'>{unidades.length > 0 && unidades[0]?.cantidad > 0 ? `Cantidad: ${unidades[0].cantidad}` : ""} </p>
      </div>
      <button className='addTooCart' onClick={handleAgregarAlCarrito}><i class="fa-solid fa-cart-plus"></i></button>
      <button className='deleteFromCart' onClick={handleReducirCarrito}>Eliminar</button>
      <button className='deleteAllCart' onClick={handleBorrarCarrito}>Eliminar todo</button>
    </div>
  </>);
};
