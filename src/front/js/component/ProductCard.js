import React, { useContext, useEffect } from 'react';
import "../../styles/productCard.css";
import { Context } from '../store/appContext';


export const ProductCards = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getProductList();
  }, [])

  return (
    <div className="product-card-list">
      {store.productList.map(product => {
        return (
          <div className="product" key={product.id}>
            <div className="product-image-container">
              <img src={product.imageId} />
            </div>
            <div className="product-card-body">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">{product.price}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
