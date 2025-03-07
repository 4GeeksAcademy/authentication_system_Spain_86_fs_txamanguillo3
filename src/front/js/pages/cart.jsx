import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext'
import { Product } from '../component/product'
import { Link } from 'react-router-dom'
import '../../styles/cart.css'

export const Cart = () => {

  const { store, action } = useContext(Context);

  useEffect(() => {
    
  }, [store.cart])

  return (<>
    <div className='cart-container'>
      <h1> Tu Carrito: {store.cartTotalAmount} € </h1>
      <div>
        {store.cart.length === 0 ? (
          <h4>Tu carrito está vacío</h4>
        ) : (<>
          {store.cart.map(product => {
            return (<div className='products-container'>
              <Product product={product} />
            </div>)
          })}
        </>)
        }
      </div>
      <Link to="/session/payment">
        <h1>Checkout</h1>
      </Link>
    </div>
  </>)
}
