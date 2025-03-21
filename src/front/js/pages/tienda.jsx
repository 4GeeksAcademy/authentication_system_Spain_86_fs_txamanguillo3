import React, { useState, useEffect, useContext } from 'react'
import { Loader } from "../component/loader";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { ProductCards } from '../component/ProductCard';
import '../../styles/tienda.css'
import { Footer } from '../component/footer';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

export const Tienda = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dmo7oubln' } });

  const img = cld
    .image('cld-sample-5')
    .format('auto')
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(500).height(500));

  const [isLoading, setIsLoading] = useState(false);
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.productList.length === 0) {
      setIsLoading(true);
      actions.getProductList().finally(() => setIsLoading(false));
    }
  }, []);

  return (isLoading) ? <Loader /> : (
    <>
      <div className='shop'>
        <h1>Tienda</h1>
        <div className="product-card-list">
          {store.filteredProducts.length > 0 ? (
            <ProductCards products={store.filteredProducts} />
          ) : store.productList.length > 0 ? (
            <p>No se encontraron productos</p>
          ) : (
            <ProductCards products={store.productList} />
          )}
        </div>
        <Link to='/slidetobuy'><h1>Continúa con el proceso</h1></Link>
      </div>
    </>
  )
}
