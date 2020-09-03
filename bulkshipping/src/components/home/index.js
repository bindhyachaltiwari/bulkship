import React from "react";
import Intro from "./Intro";
import AboutUs from "./AboutUs";
import Services from "./Services";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import Header from "./Header";
import Career from "./Career";
import initAnimation from './animation';

import "../../../node_modules/aos/dist/aos.css";
import "../../../node_modules/owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
import "../../../node_modules/animate.css";
import "./css/style.css";
import AOS from "aos";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AOS.init({
      duration: 100,
    });
    initAnimation();
  }

  render() {
    return (
      <>
        <Header />
        <Intro />
        <main id="main">
          <AboutUs />
          <Services />
          <Career />
          <ContactUs />
        </main>
        <Footer />
        <a href="#" className="back-to-top">
          <i className="fa fa-chevron-up"></i>
        </a>
      </>
    );
  }
}

export default Home;
