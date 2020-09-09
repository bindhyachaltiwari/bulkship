import React from "react";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 footer-info">
              <h3>Bulkcom Shipping</h3>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li>
                  <i className="ion-ios-arrow-right"></i>
                  <a href="/#intro">Home</a>
                </li>
                <li>
                  <i className="ion-ios-arrow-right"></i>
                  <a href="/#about">About Us</a>
                </li>
                <li>
                  <i className="ion-ios-arrow-right"></i>
                  <a href="/#services">Services</a>
                </li>
                <li>
                  <i className="ion-ios-arrow-right"></i>
                  <a href="/#team">Career</a>
                </li>
                <li>
                  <i className="ion-ios-arrow-right"></i>
                  <a href="/#contact">Contact Us</a>
                </li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-contact"></div>

            <div className="col-lg-3 col-md-6 footer-contact">
              <h4>Contact Us</h4>
              <p>
                Unit No 35, 7th Floor, <br />
                    Emaar Emerald Plaza, Sector-65
                    <br />
                    Gurugram (Delhi-NCR), INDIA <br />
                <strong>Phone:</strong> +91 124 424 1476, 425 1476
                    <br />
                <strong>Email:</strong> fix@bulkcomshipping.com
                    <br />
              </p>

              {/* <div className="social-links">
                <a href="#" className="twitter">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="#" className="facebook">
                  <i className="fa fa-facebook"></i>
                </a>
                <a href="#" className="linkedin">
                  <i className="fa fa-linkedin"></i>
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright <strong>Bulkcom Shipping</strong>. All Rights Reserved
            </div>
      </div>
    </footer>
  );
};

export default Footer;
