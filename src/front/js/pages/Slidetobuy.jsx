import React, {useState, useEffect, useContext} from 'react'
import { Loader } from "../component/loader";
import Tinderslider from '../component/tinderSlider';
import { Footer } from '../component/footer';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';



export const Slidetobuy = () => {

  const [isLoading, setIsLoading] = useState(false);
  const { store, actions } = useContext(Context);
    useEffect(() => {
      fetchData()
  }, []);

  const fetchData = async() => {
    setIsLoading(true);
    await actions.getProductList();
    setIsLoading(false);
  }
      
  


  return (isLoading) ? <Loader /> : (
    <>
      <h4>!Pruebe nuestro novedoso carrito "Tinder"¡</h4>
      <h4>pulse&nbsp;<Link to="/cart"><strong>aquí</strong></Link>&nbsp;para ir directamente al carrito y efectuar el pago</h4>
      <Tinderslider productList={store.productList}/>
      <Footer />
    </>
  )
}
