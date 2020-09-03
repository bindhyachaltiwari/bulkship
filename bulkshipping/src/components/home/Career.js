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

const Career = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [uploadedResumeUrl, setUploadedResumeUrl] = React.useState("");
  const [uploadedResume, setUploadedResume] = React.useState({});
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

    if (!name.trim() || !email.trim() || !uploadedResume.name) {
      const alert = {
        openAlert: true,
        titleMsg: 'Error',
        descrMsg: 'Name, email or file is missing.'
      };
      setAlertDetails(alert)
      return;
    }

    setSuccess(false);
    setLoading(true);

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("file", uploadedResume);

    let response = await api.mailResume(formData);
    if (response.data.status) {
      const alert = {
        openAlert: true,
        titleMsg: 'Success',
        descrMsg: 'Resume uploaded successfully. Thank you!'
      };
      setAlertDetails(alert);
      setSuccess(true);
      setLoading(false);
      setName('');
      setEmail('');
      setUploadedResumeUrl('');
      setUploadedResume({});
    }
  };

  return (
    <section id="team">
      <div class="container text-center" data-aos="zoom-in">
        <Alert alertDetails={alertDetails} handleCancelAlert={handleCancelAlert} />
        <h3>JOIN US</h3>
        <p>Bulkcom Shipping is always looking for candidates who are passionate about ship brokering.</p>
        <p>Apply here to join us
          <a href="mailto:career@bulkcomshipping.com"> career@bulkcomshipping.com</a>
        </p>

        <form
            name='careerForm'
            className='contactForm'
            role='form'
            method='post'
            onSubmit={handleSubmit}
            className="php-email-form"
            encType='multipart/form-data'
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
              </div>
            </div>
            <div className="form-group">
            <input
              type="file"
              className="Upload__Input"
              onChange={(event) => {
                setUploadedResumeUrl(URL.createObjectURL(event.target.files[0]));
                setUploadedResume(event.target.files[0]);
              }}
            />
            </div>
            <div className={`text-center ${classes.wrapper}`}>
              <Button
                type="submit"
                disabled={loading}
                className="cta-btn"
              >Submit
              </Button>
              {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          </form>
      </div>
    </section>
  );
};

export default Career;
