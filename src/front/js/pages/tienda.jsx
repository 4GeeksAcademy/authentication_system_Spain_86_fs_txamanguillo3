import React, { useState, useEffect } from 'react'
import { Loader } from "../component/loader";
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { ProductCards } from '../component/ProductCard';
import '../../styles/tienda.css'
import { Footer } from '../component/footer';


export const Tienda = () => {
  const cld = new Cloudinary({ cloud: { cloudName: 'dmo7oubln' } });

  const img = cld
    .image('cld-sample-5')
    .format('auto') // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality('auto')
    .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const inicioLoader = async () => {
    setIsLoading(true);
    await waitingWearever();
    setIsLoading(false);
    
  }
  
  useEffect(() => {
    inicioLoader();
  }, [])
  
  
  
  return (isLoading) ? <Loader /> : (
    <>
    <div className='shop'>
      <h1>Tienda</h1>
      <br />
      <h2 className='d-flex justify-content-center'>Categoría 1</h2>
      <ProductCards />
      <br></br>
      <br></br>
      <h2 className='d-flex justify-content-center'>Categoría 2</h2>
      <ProductCards />
      <br></br>
      <br></br>
      <h2 className='d-flex justify-content-center'>Categoría 3</h2>
      <ProductCards />
      </div>
      <Footer />
    </>
  )
}
