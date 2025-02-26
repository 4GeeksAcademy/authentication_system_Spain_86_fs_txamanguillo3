import React, { useState, useMemo, useRef, useContext, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import '../../styles/tinderSlider.css';
import { Product } from './product';
import { Context } from '../store/appContext';

export default function TinderSlider() {
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

  const swipe = async (dir) => {
    if (currentIndex !== null && currentIndex >= 0) {
      await childRefs[currentIndex].current.swipe(dir);
    }
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
      <h1>🔥🔥🔥🔥 Promo del día 🔥🔥🔥🔥</h1>
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
                <button 
                  className="delete-btn"
                  onClick={() => handleDeletePromotion(product.id)}
                >
                  ❌ Eliminar
                </button>
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
          onClick={() => swipe('left')}
        >
          Swipe left!
        </button>
        <button
          disabled={currentIndex === null || currentIndex >= store.promotionsList.length - 1}
          onClick={() => goBack()}
        >
          Undo swipe!
        </button>
        <button
          disabled={currentIndex === null || currentIndex < 0}
          onClick={() => swipe('right')}
        >
          Swipe right!
        </button>
      </div>
    </div>
  );
}
