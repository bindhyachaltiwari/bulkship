import React from 'react';
import { Zoom } from 'react-slideshow-image';

const images = [
  '/assests/images/ship1.jpg',
  '/assests/images/ship2.jpg',
  '/assests/images/ship3.jpg',
];

const zoomOutProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  scale: 2,
  arrows: true
}

const SlideShow = () => {
  return (
    <div className="slide-container">
      <Zoom {...zoomOutProperties}>
        {
          images.map((each, index) => <img key={index} style={{ width: "100%" }} src={each} alt={each} />)
        }
      </Zoom>
    </div>
  )
}

export default SlideShow;