import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import '../../styles/tinderSlider.css'
import { Product } from './product'

export default function TinderSlider({ productList }) {
  const [currentIndex, setCurrentIndex] = useState(productList.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(productList.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < productList.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < productList.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div className='containerBody'>
      <h1>Slide to Buy</h1>
      <div className='cardContainer'>
        {productList.map((product, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={product.title}
            onSwipe={(dir) => swiped(dir, product.title, index)}
            onCardLeftScreen={() => outOfFrame(product.title, index)}
          >
            <Product product={product} />
          </TinderCard>
        ))}
      </div>
      <div className='buttons'>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      <div className='infoText'>
        {lastDirection ? (
          <h1 key={lastDirection} className='infoText'>
            You swiped {lastDirection}
          </h1>
        ) : (
          <h1 className='infoText'>
            Swipe a card or press a button to get Restore Card button visible!
          </h1>
        )}
      </div>
    </div>
  )
}
