import React, {useContext} from 'react'
import { Context } from '../store/appContext'
import { Product } from '../component/product'

export const Cart = () => {

  const {store, action} = useContext(Context);

  return (
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
    
    </div>
  )
}
