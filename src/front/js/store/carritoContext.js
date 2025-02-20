import React from "react";
import { useState, createContext } from "react";

const CartContext = createContext()

export const CartProvider = ({children}) => {
	const [carrito, setCarrito] = useState([]);

	const agregarAlCarrito = (producto) => {
		setCarrito((carritoAnterior) => {
			const yaExisteElProducto = carritoAnterior.findIndex(
				(articulo) => articulo.id === product.id
			);
			if(yaExisteElProducto >= 0) {
				const carritoActualizado = [...carritoAnterior];
				carritoActualizado[yaExisteElProducto].cantidad + 1;
				return carritoActualizado;
			} else {
				return [...carritoAnterior, {...producto, cantidad: 1}]
			}
		})
	}

	return (
		<CartContext.provider value={{carrito, agregarAlCarrito}}>
			{children}
		</CartContext.provider>
	)

}
