import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Loader } from "../component/loader";
import Slider from '../component/slider'
import { CardSlider } from '../component/cardSlider';
import { ProductCards } from '../component/ProductCard';
import { Footer } from '../component/footer';
 


export const Home = () => {

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
    <Slider />
    <br />
    <h1>Productos más vendidos</h1>
    <ProductCards />
    <h1>Productos en oferta</h1>
    <ProductCards />
    <br />
    <Footer />
    </>
  )
}
