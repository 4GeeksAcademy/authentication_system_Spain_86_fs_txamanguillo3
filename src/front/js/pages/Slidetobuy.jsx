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
      <Tinderslider productList={store.productList}/>
      <Footer />
    </>
  )
}
