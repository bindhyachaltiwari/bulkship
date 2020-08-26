import React from "react";

const Services = () => {
  return (
    <section id="services">
      <div className="container" data-aos="fade-up">
        <header className="section-header wow fadeInUp">
          <h3>Services</h3>
        </header>

        <div className="row">
          <div
            className="col-lg-6 col-md-6 box"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="icon">
              <i className="ion-ios-analytics-outline"></i>
            </div>
            <h4 className="title">
              <a href="">Dry cargo broking</a>
            </h4>
            <p className="description">
              Besides maintaining a strong database of ships, ship owners &
              charterer's, we have inhouse strategy to cover our client each
              requirement to entire satisfaction
            </p>
          </div>
          <div
            className="col-lg-6 col-md-6 box"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="icon">
              <i className="ion-ios-bookmarks-outline"></i>
            </div>
            <h4 className="title">
              <a href="">Freight consultancy</a>
            </h4>
            <p className="description">
              Backed by market information we provide freight consultancy on
              specific routes to our clients for them to focus on their core
              work of trading. Your freight is too important to trust to amateur
              and most important aspect for a trade deal to conclude and the
              cargo bid to succeed. The difference in word is, EXPERIENCE &
              being professional's our team is fully capable to provide you the
              best service in industry by feeding all the desired information.
            </p>
          </div>
          <div
            className="col-lg-6 col-md-6 box"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="icon">
              <i className="ion-ios-paper-outline"></i>
            </div>
            <h4 className="title">
              <a href="">Time chartering</a>
            </h4>
            <p className="description">
              This is a specialised service provided to certain clients on
              request depending upon their risk appetite. With necessary risk
              management provided by us for time chartering our client is able
              to maximize profit and lead the segment among his competitors.
            </p>
          </div>
          <div
            className="col-lg-6 col-md-6 box"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="icon">
              <i className="ion-ios-speedometer-outline"></i>
            </div>
            <h4 className="title">
              <a href="">Vessel Management</a>
            </h4>
            <p className="description">
              Post fixture vessel management is the neglected but most important
              aspect of vessel chartering. Be it voyage charter or time charter,
              our team is available 24x7 and fully capable to monitor vessel
              performance to optimize client earnings. We have expertise in
              handling laytime/ demurrage and other shipping claims/ disputes on
              behalf of our clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
