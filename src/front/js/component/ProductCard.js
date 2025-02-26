import React, { useContext, useEffect } from 'react';
import "../../styles/productCard.css";
import { Context } from '../store/appContext';
import { Product } from '../component/product';


export const ProductCards = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getProductList();
  }, []);

  useEffect(() => {
    console.log(store.productList)
  }, [store.productList])

  return (
    <div className="product-card-list">
      {!!store.productList.length && store.productList.length > 0 ? (
        store.productList.map((product) => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        <p>No se encontraron productos</p>
      )}
    </div>
  );
};
