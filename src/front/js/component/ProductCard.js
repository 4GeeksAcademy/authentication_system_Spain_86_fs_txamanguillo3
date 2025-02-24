import React, { useContext, useEffect } from 'react';
import "../../styles/productCard.css";
import { Context } from '../store/appContext';
import { Product } from '../component/product';
import { useCart } from '../store/appContext';


export const ProductCards = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getProductList();
  }, [])

  return (
    <div className="product-card-list">
      {store.productList.map((product, index) => (
      <div className="product-card" style={{ "--order": index + 1 }} key={product.id}>
        <Product product={product} />
      </div>
  ))}
</div>
  );
};
