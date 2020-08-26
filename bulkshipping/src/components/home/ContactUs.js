import React from "react";

const ContactUs = () => {
  return (
    <section id="contact" className="section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-header">
            <h3>Contact Us</h3>
          </div>

          <div className="row contact-info">
            <div className="col-md-4">
              <div className="contact-address">
                <i className="ion-ios-location-outline"></i>
                <h3>Address</h3>
                <address>
                  Unit No 35, 7th Floor, Emaar Emerald Plaza, Sector-65,
                  Gurugram (Delhi-NCR), INDIA
                </address>
              </div>
            </div>

            <div className="col-md-4">
              <div className="contact-phone">
                <i className="ion-ios-telephone-outline"></i>
                <h3>Phone Number</h3>
                <p>
                  <a href="tel:+911244241476">+91 124 424 1476</a>
                  <br />
                  <a href="tel:+911244251476">+91 124 425 1476</a>
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="contact-email">
                <i className="ion-ios-email-outline"></i>
                <h3>Email</h3>
                <p>
                  <a href="mailto:fix@bulkcomshipping.com"
                    >fix@bulkcomshipping.com</a
                  >
                </p>
              </div>
            </div>
          </div>

          <div className="form">
            <form
              action="forms/contact.php"
              method="post"
              role="form"
              className="php-email-form"
            >
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Your Name"
                    data-rule="minlen:4"
                    data-msg="Please enter at least 4 chars"
                  />
                  <div className="validate"></div>
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    data-rule="email"
                    data-msg="Please enter a valid email"
                  />
                  <div className="validate"></div>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  id="subject"
                  placeholder="Subject"
                  data-rule="minlen:4"
                  data-msg="Please enter at least 8 chars of subject"
                />
                <div className="validate"></div>
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="message"
                  rows="5"
                  data-rule="required"
                  data-msg="Please write something for us"
                  placeholder="Message"
                ></textarea>
                <div className="validate"></div>
              </div>
              <div className="mb-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">
                  Your message has been sent. Thank you!
                </div>
              </div>
              <div className="text-center">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>
  );
};

export default ContactUs;
