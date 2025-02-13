import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import '../../styles/slider.css'

export default function Slider() {
  return (
    <Carousel className='slider'>
      <Carousel.Item>
        <img 
        className='sliderImg'
        src='https://t4.ftcdn.net/jpg/01/84/74/35/240_F_184743552_NNFIWBMRP5SffLXShX7OpNw0zes9Hr0U.jpg'
        alt=''
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img 
        className='sliderImg'
        src='https://t4.ftcdn.net/jpg/04/23/41/61/240_F_423416137_voueqROw16TIR7dZ7WWNtwvcZ1m2rMEd.jpg'
        alt=''
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img 
        className='sliderImg'
        src='https://t4.ftcdn.net/jpg/02/90/88/27/240_F_290882741_yQFSBeMjqGYcy8CpMkhu3qxEpcNX2ouq.jpg'
        alt=''
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
