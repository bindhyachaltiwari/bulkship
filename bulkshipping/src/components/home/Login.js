import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import initAnimation from "./animation";
import { connect } from "react-redux";
import actionTypes from "./../../store/actions/constants";

import "../../../node_modules/aos/dist/aos.css";
import "../../../node_modules/owl.carousel/dist/assets/owl.carousel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "owl.carousel";
import "../../../node_modules/animate.css";
import "./css/style.css";
import AOS from "aos";
import api from "../../api";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.defaultError = {
      required: "*Field is required",
      pattern: "*Please enter valid value",
      wrongCredentials: "Invalid credentials. Please try again...",
      userNotFound: 'Username not found.',
    };
    this.state = {
      forgotPassword_1: false,
      formData: {
        email: "",
        password: "",
        rememberMeChecked: false,
        checkUsername: '',
      },
      error: {
        emailError: "",
        passwordError: "",
        formError: "",
        checkUsernameError: ''
      },
    };
  }

  componentDidMount() {
    AOS.init({
      duration: 100,
    });
    initAnimation();
  }

  onInputHandler = (e) => {
    const value = e.target.value;
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      value
    );
    const { formData, error } = this.state;
    if (e.target.name === "email") {
      formData.email = value;
      formData.checkUsername = value;
      if (validEmail) {
        error.emailError = "";
      } else {
        error.emailError = this.defaultError.pattern;
      }
    } else if (e.target.name === "checkUsername") {
      formData.checkUsername = value;
      if (validEmail) {
        error.checkUsernameError = "";
      } else {
        error.checkUsernameError = this.defaultError.pattern;
      }
    } else if (e.target.name === "password") {
      formData.password = value;
      if (error.passwordError) {
        error.passwordError = "";
      }
    } else if (e.target.name === "rememberMe") {
      formData.rememberMeChecked = !formData.rememberMeChecked;
    }

    this.setState({ formData, error });
  };

  forgotPasswordHandler = () => {
    this.setState({ forgotPassword_1: true });
  }

  forgotPasswordBack_1 = () => {
    const { error } = this.state;
    error.checkUsernameError = '';
    this.setState({ forgotPassword_1: false, error });
  }

  checkMailHandler = async () => {
    const { formData, error } = this.state;
    const resp = await api.checkUsername(formData.checkUsername);
    if (resp && resp.data && resp.data.status) {
      formData.checkUsername = '';
      error.checkUsernameError = 'Please check your inbox for password details.'
      this.setState({ error });
    } else {
      error.checkUsernameError = ' Error !! Please contact admin for the password.'
      this.setState({ error });
    }
  }

  checkValidityLoginForm = () => {
    const { formData, error } = this.state;
    const { email, password } = formData;
    if (!email) {
      error.emailError = this.defaultError.required;
    }
    if (!password) {
      error.passwordError = this.defaultError.required;
    }

    const valid = !formData.email || !formData.password || error.emailError ? false : true;
    this.setState({ error });
    return valid;
  };

  checkValidityforgotPasswordForm = () => {
    const { formData, error } = this.state;
    const { email } = formData;
    if (!email) {
      error.emailError = this.defaultError.required;
    }

    const valid = !formData.email || error.emailError ? false : true;
    this.setState({ error });
    return valid;
  };

  onSubmitHandler = (e) => {
    e.preventDefault();
    const { formData } = this.state;
    const isLoginForm = e.target.name === "loginForm";
    if (isLoginForm) {
      if (this.checkValidityLoginForm()) {
        const { email, password, rememberMeChecked } = formData;
        const formDataToBeSend = new FormData();
        formDataToBeSend.append("email", email);
        formDataToBeSend.append("password", password);
        formDataToBeSend.append("rememberMe", rememberMeChecked);
        const { saveUsername } = this.props;
        window.location.hash = "";
        saveUsername(formDataToBeSend);
      }
    } else {
      if (this.checkValidityforgotPasswordForm()) {
        const { email } = formData;
        const formDataToBeSend = new FormData();
        formDataToBeSend.append("email", email);
        formData.email = "";
        this.setState({ forgotPassword: false, formData });
      }
    }
  };

  render() {
    const { formData, error, forgotPassword_1 } = this.state;
    const { email, password, rememberMeChecked, checkUsername } = formData;
    const { emailError, passwordError, checkUsernameError } = error;
    const { loggedIn } = this.props;

    return (
      <>
        <Header />
        <br />

        <main id="main" className="login-container">
          {!forgotPassword_1 ?
            <form name="loginForm" role="form" onSubmit={this.onSubmitHandler} method="post" encType="multipart/form-data"            >
              <h3>Sign In</h3>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" name="email" value={email} tabIndex="1" onChange={this.onInputHandler} />
                {emailError && <p className="error">{emailError}</p>}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name="password" value={password} tabIndex="2" onChange={this.onInputHandler} />
                {passwordError && <p className="error">{passwordError}</p>}
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" id="customCheck1" name='rememberMe' tabIndex='3' checked={rememberMeChecked} onChange={this.onInputHandler} />
                  <label className="custom-control-label" htmlFor="customCheck1"> Remember me </label>
                </div>
              </div>

              <button type="submit" disabled={emailError || passwordError || !password.length || !email.length} className="btn btn-primary btn-block"> Submit </button>
              <p className="forgot-password text-right" onClick={this.forgotPasswordHandler}>
                <a href="#">Forgot password?</a>
              </p>
              {loggedIn === false && <p className='error'>{this.defaultError.wrongCredentials}</p>}
            </form> : <></>}

          {forgotPassword_1 ?
            <form name="checkMailForm" role="form" method="post" encType="multipart/form-data"            >
              <h3>Forgot Password ?</h3>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" name="checkUsername" value={checkUsername} tabIndex="1" onChange={this.onInputHandler} />
                {checkUsernameError && <p className="error">{checkUsernameError}</p>}
              </div>
              <button type="button" disabled={checkUsernameError || !checkUsername.length} style={{ width: '49.5%' }} className="btn btn-primary" onClick={this.checkMailHandler}> Get Password </button>
              <button type="button" className="btn btn-primary" style={{ width: '49.5%', marginLeft: '2px' }} onClick={this.forgotPasswordBack_1}> Back </button>
            </form> : <></>}
        </main>
        <br />
        <Footer />
        <a href="#" className="back-to-top">
          <i className="fa fa-chevron-up"></i>
        </a>
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { loggedIn } = state;
  return {
    loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUsername: (data) => {
      dispatch({
        type: actionTypes.LOGIN,
        data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
