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

export const Tienda = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dmo7oubln' } });

  const img = cld
    .image('cld-sample-5')
    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  const [isLoading, setIsLoading] = useState(false);
  const { store, actions } = useContext(Context);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Verifica si ya hay productos cargados para evitar llamadas innecesarias
    if (store.productList.length === 0) {
        actions.getProductList().finally(() => setIsLoading(false));
    } else {
        setIsLoading(false);
    }

}, []);

  return (isLoading) ? <Loader /> : (
    <>
      <div className='shop'>
        <h1>Tienda</h1>
        <br />
        <h2 className=''>Productos</h2>
        <div className="product-card-list">
          {store.filteredProducts && store.filteredProducts.length > 0 ? (
            store.filteredProducts.map((product) => (
              <ProductCards products={store.filteredProducts} />
            ))
          ) : (
            <p>No se encontraron productos</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
