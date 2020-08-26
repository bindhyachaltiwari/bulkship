import React from "react";
import Carousel from './img/1.jpg';

const Intro = () => {
  return (
    <section id="intro">
      <div className="intro-container">
        <div
          id="introCarousel"
          className="carousel slide carousel-fade"
          data-ride="carousel"
        >
          <ol className="carousel-indicators"></ol>
          <div className="carousel-inner" role="listbox">
            <div
              className="carousel-item active"
              style={{ backgroundImage: `url(${Carousel})` }}
            >
              <div className="carousel-container">
                <div className="container">
                  <h2 className="animate__animated animate__fadeInDown">
                    YOUR TRUE COMPANION FOR DRY BULK COMMODITY SHIPMENTS
                  </h2>
                  <p className="animate__animated animate__fadeInUp">
                    By relying on us you can save both time and money on
                    shipments allowing you to focus on your core business
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
