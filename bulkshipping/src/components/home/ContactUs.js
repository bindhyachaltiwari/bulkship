import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../api';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Alert from "../../utils/alert";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: red[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

const ContactUs = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const classes = useStyles();
  const [alertDetails, setAlertDetails] = React.useState({});

  const handleCancelAlert = () => {
    const alert = {
      openAlert: false,
      titleMsg: '',
      descrMsg: ''
    }
    setAlertDetails(alert);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      const alert = {
        openAlert: true,
        titleMsg: 'Error',
        descrMsg: 'Please enter values in all fields.'
      };
      setAlertDetails(alert)
      return;
    }
    setSuccess(false);
    setLoading(true);

    let response = await api.contactUs({
      name,
      email,
      subject,
      message
    });
    if (response.data.status) {
      const alert = {
        openAlert: true,
        titleMsg: 'Success',
        descrMsg: 'Your message has been sent. Thank you!'
      };
      setAlertDetails(alert);
      setSuccess(true);
      setLoading(false);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }
  };

  return (
    <section id="contact" className="section-bg">
      <Alert alertDetails={alertDetails} handleCancelAlert={handleCancelAlert} />
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
            name='contactForm' className='contactForm' role='form' method='post' onSubmit={handleSubmit}
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
                  value={name}
                  onChange={(event) => setName(event.target.value)}
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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
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
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
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
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              ></textarea>
              <div className="validate"></div>
            </div>
            <div className={`text-center ${classes.wrapper}`}>
              <Button
                type="submit"
                disabled={loading}
              >Send Message
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
