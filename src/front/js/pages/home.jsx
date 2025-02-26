import React, { useEffect, useRef, useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Loader } from "../component/loader";
import Slider from '../component/slider'
import { CardSlider } from '../component/cardSlider';
import { ProductCards } from '../component/ProductCard';
import { Footer } from '../component/footer';
import { Context } from '../store/appContext';
 


export const Home = () => {
  const { store, actions } = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
  
      return () => clearTimeout(timer); 
    }, []);



  return (isLoading) ? <Loader /> : (
    <>
    <Slider />
    <br />
    <h1>Productos más vendidos</h1>
    <ProductCards products={store.productList} />
    <h1>Productos en oferta</h1>
    <ProductCards products={store.productList} />
    <br />
    <Footer />
    </>
  )
}
