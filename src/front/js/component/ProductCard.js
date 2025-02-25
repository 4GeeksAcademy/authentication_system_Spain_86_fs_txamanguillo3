import React, { useContext, useEffect } from 'react';
import "../../styles/productCard.css";
import { Context } from '../store/appContext';
import { Product } from '../component/product';
import { useCart } from '../store/appContext';


export const ProductCards = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getProductList();
  }, []);

  return (
    <div className="product-card-list">
      {store.filteredProducts.length > 0 ? (
        store.filteredProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        <p>No se encontraron productos</p>
      )}
    </div>
  );
};