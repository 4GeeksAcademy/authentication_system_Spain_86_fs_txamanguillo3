import React, { useContext, useEffect } from 'react';
import "../../styles/productCard.css";
import { Context } from '../store/appContext';
import { Product } from '../component/product';


export const ProductCards = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getProductList();
  }, [])

  return (
    <div className="product-card-list">
      {store.productList.map(product => {
        return (
          <Product product={product}/>
        );
      })}
    </div>
  );
};
