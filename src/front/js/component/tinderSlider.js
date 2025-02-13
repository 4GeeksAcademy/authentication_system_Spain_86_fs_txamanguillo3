import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import '../../styles/tinderSlider.css'

const db = [
  {
    name: 'Richard Hendricks',
    url: 'https://img.freepik.com/free-photo/happy-man-student-with-afro-hairdo-shows-white-teeth-being-good-mood-after-classes_273609-16608.jpg?semt=ais_hybrid'
  },
  {
    name: 'Erlich Bachman',
    url: 'https://thumbs.dreamstime.com/b/showing-you-two-steps-to-successful-business-portrait-friendly-looking-happy-joyful-redhead-male-beard-making-sign-135019475.jpg'
  },
  {
    name: 'Monica Hall',
    url: 'https://st4.depositphotos.com/20363444/27462/i/450/depositphotos_274625260-stock-photo-happy-curly-african-american-girl.jpg'
  },
  {
    name: 'Denise Dunn',
    url: 'https://t4.ftcdn.net/jpg/05/43/21/21/360_F_543212139_Hh4Z8sffanKvydV9su1M9ybyVb06nClI.jpg'
  },
  {
    name: 'Dinesh Chugtai',
    url: 'https://st2.depositphotos.com/1715570/5435/i/450/depositphotos_54357355-stock-photo-handsome-young-black-man-smiling.jpg'
  }
]

export default function TinderSlider () {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

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
    if (canSwipe && currentIndex < db.length) {
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
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.url + ')' }}
              className='card'
            >
              <h3>{character.name}</h3>
            </div>
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
