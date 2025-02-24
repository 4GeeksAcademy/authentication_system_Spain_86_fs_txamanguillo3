import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import { Product } from '../component/product'
import { Link } from 'react-router-dom'

export const Cart = () => {

  const {store, action} = useContext(Context);

  return (<>
    <div className='cart-container'>
      <h2> Tu Carrito </h2>
        { store.cart.length === 0 ? (
          <span>Tu carrito está vacío</span>
        ) : (
          <>
          {store.cart.map(product => {
            return (
              <Product product={product}/>
            )
          })}
          </>
        )
      }
      <Link to="/session/payment">
        <h1>Checkout</h1>
      </Link>
      <h3>{store.cartTotalAmount}</h3>
    </div>
  </>)
}
