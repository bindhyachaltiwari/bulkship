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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.defaultError = {
      required: "*Field is required",
      pattern: "*Please enter valid value",
      wrongCredentials: "Invalid credentials. Please try again...",
    };
    this.state = {
      forgotPassword: false,
      formData: {
        email: "",
        password: "",
        rememberMeChecked: false,
      },
      error: {
        emailError: "",
        passwordError: "",
        formError: "",
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
      if (validEmail) {
        error.emailError = "";
      } else {
        error.emailError = this.defaultError.pattern;
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

  checkValidityLoginForm = () => {
    const { formData, error } = this.state;
    const { email, password } = formData;
    if (!email) {
      error.emailError = this.defaultError.required;
    }
    if (!password) {
      error.passwordError = this.defaultError.required;
    }

    const valid =
      !formData.email || !formData.password || error.emailError ? false : true;

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
    const { formData, error, forgotPassword } = this.state;
    const { email, password, rememberMeChecked } = formData;
    const { emailError, passwordError } = error;
    const { loggedIn } = this.props;

    return (
      <>
        <Header />
        <br />
        <main id="main" className="login-container">
          <form
            name="loginForm"
            role="form"
            onSubmit={this.onSubmitHandler}
            method="post"
            encType="multipart/form-data"
          >
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                value={email}
                tabIndex="1"
                onChange={this.onInputHandler}
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={password}
                tabIndex="2"
                onChange={this.onInputHandler}
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
				  id="customCheck1"
				  name='rememberMe' tabIndex='3' checked={rememberMeChecked} onChange={this.onInputHandler}
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            <p className="forgot-password text-right">
              <a href="#">Forgot password?</a>
            </p>
			{loggedIn === false && <p className='error'>{this.defaultError.wrongCredentials}</p>}
          </form>
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
