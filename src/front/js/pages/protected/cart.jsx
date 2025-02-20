import React from 'react'
import { Link } from "react-router-dom";

export const Cart = () => {
  return (<>
    <h1>Cart</h1>
    <Link to="/session/checkout">
      <h1>Go to checkout</h1>
    </Link>
  </>)
}
