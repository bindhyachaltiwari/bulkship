import React from "react";
import AboutMission from './img/about-mission.jpg';
import AboutPlan from './img/about-plan.jpg';

const AboutUs = () => {
  return (
    <section id="about">
      <div className="container" data-aos="fade-up">
        <header className="section-header">
          <h3>About Us</h3>
        </header>

        <div className="row about-cols">
          <div className="col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="about-col">
              <div className="img">
                <img
                  src={AboutMission}
                  alt=""
                  className="img-fluid"
                />
                <div className="icon">
                  <i className="ion-ios-speedometer-outline"></i>
                </div>
              </div>
              <h2 className="title">
                <a href="#">Who we are</a>
              </h2>
              <p>
                We came into existence in the year 2008 with a bunch of shipping
                professionals however bulkcom shipping was established in the
                year 2015 as ship brokers and freight consultants with "out of
                the box" thinking and approach to business. We take a personal
                approach to shipping and believe the best way to meet customer
                demands is by forging relationships after gaining a deep
                understanding of our customer needs. We are experts in planning,
                executing and handling any dry cargo movement in bulk across the
                globe. We have booked over 6Million MT of dry bulk cargo on all
                sizes of vessel ranging from handy to cape size.
              </p>
              <p>
                <b>
                  WE HAVE BUILT OUR REPUTATION ON EXCELLENCE IN SHIP CHARTERING
                  BOTH ON VOYAGE AND TIME CHARTER, WITH A CONSTANT FOCUS ON
                  SERVING OUR CUSTOMER.
                </b>
              </p>
            </div>
          </div>

          <div className="col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="about-col">
              <div className="img">
                <img src={AboutPlan} alt="" className="img-fluid" />
                <div className="icon">
                  <i className="ion-ios-list-outline"></i>
                </div>
              </div>
              <h2 className="title">
                <a href="#">Why choose us</a>
              </h2>
              <p>
                Our strength has always been in the shipment of directly
                controlled cargoes through our established contacts with our
                exclusive / cargo controlled charterer's and ship owners
                worldwide. We handle chartering for any dry cargo in excess of
                5000MT with greater emphasis on Iron ore Fines, IOP, Coal, Coke,
                Gypsum, Limestone, Clinker, Aggregates, Urea, Timber logs, Slag
                besides whole range of other dry bulk commodities moving across
                the globe. Shipping needs fluctuate, grow and evolve in ways
                which at times get tricky to anticipate. We can help create not
                just a solution, but a entire shipping strategy. With
                transparency and ethics as its core values we believe in adding
                VALUE to our client's business. When trust us to charter vessels
                exclsively through us, you'll know that your shipments are in
                hands of skilled, qualified professionals with decades of
                experience in shipping.
              </p>
              <p>
                <b>
                  WE AIM TO PROVIDE LEVERAGE TO YOUR BUSINESS BACKED BY OUR
                  MARKET INFORMATION
                </b>
              </p>
            </div>
          </div>

          <p>
            <i>
              Contact us today to discuss your current and furture chartering
              needs. We have trained friendly staff to provide the best customer
              service in the industry.
            </i>
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
