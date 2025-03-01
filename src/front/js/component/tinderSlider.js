import React, { useState, useMemo, useRef, useContext, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import '../../styles/tinderSlider.css';
import { Product } from './product';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

export default function TinderSlider({product}) {
  const { store, actions } = useContext(Context);
  const [currentIndex, setCurrentIndex] = useState(null);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    actions.getPromotionsList();
  }, []);

  useEffect(() => {
    if (store.promotionsList.length > 0) {
      setCurrentIndex(store.promotionsList.length - 1);
    }
  }, [store.promotionsList]);

  const childRefs = useMemo(() =>
    store.promotionsList.map(() => React.createRef()), [store.promotionsList]
  );

  const swiped = (direction, nameToDelete, index) => {
    setCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    if (currentIndexRef.current >= idx && childRefs[idx]?.current) {
      childRefs[idx].current.restoreCard();
    }
  };

  const swipe = async (dir, product) => {
    if (currentIndex !== null && currentIndex >= 0) {
      await childRefs[currentIndex].current.swipe(dir);
  
      if (dir === "right" && product) {
        actions.agregarAlCarrito(product); 
      }
      if (dir === "left" && product){
        handleReducirCart(product)
      }
    }
  };

  const handleReducirCart= (product) => {
    if (!product) return;
  
    let nuevoCarrito = store.cart
      .map((item) =>
        item.id === product.id ? { ...item, cantidad: item.cantidad - 1 } : item
      )
      .filter((item) => item.cantidad > 0); 
  
    actions.actualizarCarrito(nuevoCarrito);
  };
  
  

  const goBack = async () => {
    if (currentIndex !== null && currentIndex < store.promotionsList.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      await childRefs[newIndex].current.restoreCard();
    }
  };

  const handleDeletePromotion = async (id) => {
    const success = await actions.deletePromotion(id);
    if (success) {
      setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    }
  };


  return (
    <div className='containerBody'>
      <h1>🔥 ¡Pruebe nuestro novedoso carrito "Tinder"! 🔥</h1>
      <div className='cardContainer'>
        {store.promotionsList.length > 0 ? (
          store.promotionsList.map((product, index) => (
            <TinderCard
              ref={childRefs[index]}
              className='swipe'
              key={product.id}
              onSwipe={(dir) => swiped(dir, product.name, index)}
              onCardLeftScreen={() => outOfFrame(product.name, index)}
            >
              <div className="product-container">
                <Product product={product} />
              </div>
            </TinderCard>
          ))
        ) : (
          <p>No hay promociones disponibles</p>
        )}
      </div>
      <div className='buttons'>
        <button
          disabled={currentIndex === null || currentIndex < 0}
          onClick={() => swipe('left', store.promotionsList[currentIndex])}
        >
          <i class="fa-solid fa-xmark" style={{color: "#ff0000"}}></i>
        </button>
        <button
          disabled={currentIndex === null || currentIndex >= store.promotionsList.length - 1}
          onClick={() => goBack()}
        >
          <i class="fa-solid fa-arrow-rotate-left" style={{color: "#FFD43B"}}></i>
        </button>
        <button
          disabled={currentIndex === null || currentIndex < 0}
          onClick={() => swipe('right', store.promotionsList[currentIndex])}
        >
          <i class="fa-solid fa-heart" style={{color: "#35f00f"}}></i>
        </button>
      </div>
      <Link to="/cart"><h4>O dirígete al carrito</h4></Link>
    </div>
  );
}
