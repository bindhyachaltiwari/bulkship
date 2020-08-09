import React from 'react';
import './style.scss';
import { connect } from 'react-redux';
import actionTypes from './../../store/actions/constants';
import dummy from './../../assets/images/dummy.webp';
import ship from './../../assets/images/ship.jpg';
import AboutUs from './aboutus';
import Career from './career';
import ContactUs from './contactus';
import Services from './services';

class Login extends React.Component {
    constructor() {
        super();
        this.defaultError = {
            required: '*Field is required',
            pattern: '*Please enter valid value',
            wrongCredentials: 'Wrong credentials. Please try again...',
        };
        this.state = {
            forgotPassword: false,
            formData: {
                email: '',
                password: '',
                rememberMeChecked: false
            },
            error: {
                emailError: '',
                passwordError: '',
                formError: ''
            }
        };

        this.forgotPasswordHandler = this.forgotPasswordHandler.bind(this);
        this.onInputHandler = this.onInputHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.anchorClickHandler = this.anchorClickHandler.bind(this);
    }

    anchorClickHandler(e) {
        document.querySelector(e.target.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    }

    forgotPasswordHandler = () => {
        this.setState({ forgotPassword: true });
    }

    onInputHandler = (e) => {
        const value = e.target.value;
        const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        const { formData, error } = this.state;
        if (e.target.name === 'email') {
            formData.email = value;
            if (validEmail) {
                error.emailError = '';
            } else {
                error.emailError = this.defaultError.pattern;
            }
        } else if (e.target.name === 'password') {
            formData.password = value;
            if (error.passwordError) {
                error.passwordError = '';
            }
        } else if (e.target.name === 'rememberMe') {
            formData.rememberMeChecked = !formData.rememberMeChecked;
        }

        this.setState({ formData, error });
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

        const valid = (!formData.email || !formData.password || error.emailError) ? false : true;

        this.setState({ error });

        return valid;
    }

    checkValidityforgotPasswordForm = () => {
        const { formData, error } = this.state;
        const { email } = formData;
        if (!email) {
            error.emailError = this.defaultError.required;
        }

        const valid = (!formData.email || error.emailError) ? false : true;
        this.setState({ error });
        return valid;
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const { formData } = this.state;
        const isLoginForm = e.target.name === 'loginForm';
        if (isLoginForm) {
            if (this.checkValidityLoginForm()) {
                const { email, password, rememberMeChecked } = formData;
                const formDataToBeSend = new FormData();
                formDataToBeSend.append('email', email);
                formDataToBeSend.append('password', password);
                formDataToBeSend.append('rememberMe', rememberMeChecked);
                const { saveUsername } = this.props;
                window.location.hash = '';
                saveUsername(formDataToBeSend);
            }
        } else {
            if (this.checkValidityforgotPasswordForm()) {
                const { email } = formData;
                const formDataToBeSend = new FormData();
                formDataToBeSend.append('email', email);
                formData.email = '';
                this.setState({ forgotPassword: false, formData });
            }
        }
    }

    callInitials = () => {
        const { loggedIn } = this.props;
        if (loggedIn) {
            this.props.history.replace('/home');
        }
    }

    render() {
        const { formData, error, forgotPassword } = this.state;
        const { email, password, rememberMeChecked } = formData;
        const { emailError, passwordError } = error;
        const { loggedIn } = this.props;
        return (
            <div className='wrapper login'>
                <div className="header">
                    <nav className='nav-navbar navbar-default navbar-fixed-top'>
                        <ul className='ulnavbar ulnavbar-nav'>
                            <li><a className='navhome' href='#homeSection' onClick={this.anchorClickHandler}>Home</a></li>
                            <li><a className='navhome' href='#aboutSection' onClick={this.anchorClickHandler}>About Us</a></li>
                            <li><a className='navhome' href='#servicesSection' onClick={this.anchorClickHandler}>Services</a></li>
                            <li><a className='navhome' href="#loginSection" onClick={this.anchorClickHandler}>Login</a></li>
                            <li><a className='navhome' href="#careerSection" onClick={this.anchorClickHandler}>Career</a></li>
                            <li><a className='navhome' href="#contactUsSection" onClick={this.anchorClickHandler}>Contact Us</a></li>
                        </ul>
                    </nav>
                </div>
                <div className='container'>
                    <div className='home-section inner-section' id='homeSection'>
                        <div>
                            <h2>YOUR TRUE COMPANION FOR DRY BULK COMMODITY SHIPMENTS</h2>
                            <p>by relying on u you can save both time and money on shipments allowing you to focus on your core business</p>
                            <div className='banner-image'>
                                <img src={ship} />
                            </div>
                        </div>
                    </div>
                    <div className='about-us-section inner-section' id='aboutSection'>
                        <AboutUs />

                    </div>
                    <div className='services-section inner-section' id="servicesSection">
                        <Services />

                    </div>
                    <div className='login-wrapper inner-section' id='loginSection'>
                        <div className='video-section desktop-only'>
                            <div className='video'>
                                <img src={dummy} alt='dummy image' />
                            </div>
                        </div>
                        <div className='form-section'>
                            {!forgotPassword ? <div>
                                <form name='loginForm' role='form' onSubmit={this.onSubmitHandler} method='post' encType='multipart/form-data'>
                                    <fieldset>
                                        <legend>Account Login</legend>
                                        <div className='form-group'>
                                            <label htmlFor='email'>Email Address</label>
                                            <input type='text' name='email' value={email} tabIndex='1' onChange={this.onInputHandler} />
                                            {emailError && <p className='error'>{emailError}</p>}
                                            <p className='info'>We'll never share your email with anyone else.</p>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='password'>Password</label>
                                            <input type='password' name='password' value={password} tabIndex='2' onChange={this.onInputHandler} />
                                            {passwordError && <p className='error'>{passwordError}</p>}
                                        </div>
                                        <div className='form-group'>
                                            <div className='remember-block'>
                                                <input type='checkbox' name='rememberMe' tabIndex='3' checked={rememberMeChecked} onChange={this.onInputHandler} /><label htmlFor='rememberMe'>Remember Me</label>
                                            </div>
                                        </div>
                                        <button type='submit' className='submit-btn' tabIndex='4'>Submit</button>
                                        {loggedIn === false && <p className='error'>{this.defaultError.wrongCredentials}</p>}
                                    </fieldset>
                                </form>
                                <div className='account-actions'>
                                    <div className='forget-password' onClick={this.forgotPasswordHandler} tabIndex='5'>
                                        <span>Forgot Password</span>
                                    </div>
                                </div>
                            </div>
                                :
                                <div className='forgot-password-wrapper'>
                                    <form name='forgotPassword' role='form' onSubmit={this.onSubmitHandler} method='post' encType='multipart/form-data'>
                                        <fieldset>
                                            <legend>Forgot Password</legend>
                                            <div className='form-group'>
                                                <label htmlFor='email'>Email Address</label>
                                                <input type='text' name='email' value={email} tabIndex='1' onChange={this.onInputHandler} />
                                                {emailError && <p className='error'>{emailError}</p>}
                                                <p className='info'>We'll never share your email with anyone else.</p>
                                            </div>
                                            <button type='submit' className='submit-btn' tabIndex='2'>Submit</button>
                                        </fieldset>
                                    </form>
                                </div>}
                        </div>

                    </div>
                    <div className='career-section inner-section' id='careerSection'>
                        <Career />

                    </div>
                    <div className='contact-us-section inner-section' id='contactUsSection'>
                        <ContactUs/>

                    </div>
                    <div className='inner-section footer-section'>
                        <div className="social-list-section">
                            <ul className="social-list">
                                <li><a target="_blank" href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a></li>
                                <li><a target="_blank" href="https://twitter.com/"><i className="fa fa-twitter"></i></a></li>
                                <li><a target="_blank" href="https://www.linkedin.com/"><i className="fa fa-linkedin"></i></a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    const { loggedIn } = state;
    return {
        loggedIn
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveUsername: (data) => {
            dispatch({
                type: actionTypes.LOGIN,
                data
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);