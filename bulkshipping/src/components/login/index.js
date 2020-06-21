import React from 'react';
// import auth0Client from '../../Auth';
import './style.scss';
import { connect } from 'react-redux';
import actionTypes from './../../store/actions/constants';
import dummy from './../../assets/images/dummy.webp';

class Login extends React.Component {
    constructor(){
        super();
        this.defaultError = {
            required: '*Field is required',
            pattern: '*Please enter valid value',
            wrongCredentials: 'Wrong credentials. Please try again...',
        };
        this.state = {
            forgotPassword : false,
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
    }

    forgotPasswordHandler = () => {
        this.setState({forgotPassword: true});
    }

    onInputHandler = (e) => {
        const value = e.target.value;
        const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        const { formData, error } = this.state;
        if(e.target.name === 'email'){
            formData.email = value;
            if(validEmail) {
                error.emailError = '';
            } else {
                error.emailError = this.defaultError.pattern;
            }
        }else if(e.target.name === 'password') {
            formData.password = value;
            if(error.passwordError){
                error.passwordError= '';
            }
        }else if(e.target.name === 'rememberMe') {
            formData.rememberMeChecked = !formData.rememberMeChecked;
        }
        
        this.setState({formData, error});
    }

    checkValidityLoginForm = () => {
        const { formData, error } = this.state;
        const { email, password } = formData;
        if(!email) {
            error.emailError = this.defaultError.required;
        }
        if(!password) {
            error.passwordError = this.defaultError.required;
        }

        const valid = (!formData.email || !formData.password || error.emailError) ? false : true;

        this.setState({error});

        return valid;
    }

    checkValidityforgotPasswordForm = () => {
        const { formData, error } = this.state;
        const { email } = formData;
        if(!email) {
            error.emailError = this.defaultError.required;
        }

        const valid = (!formData.email || error.emailError) ? false : true;
        this.setState({error});
        return valid;
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const { formData } = this.state;
        const isLoginForm = e.target.name === 'loginForm';
        if(isLoginForm) {
            if(this.checkValidityLoginForm()) {
                const { email, password, rememberMeChecked } = formData;
                const formDataToBeSend = new FormData();
                formDataToBeSend.append('email', email);
                formDataToBeSend.append('password', password);
                formDataToBeSend.append('rememberMe', rememberMeChecked);
                const { saveUsername } = this.props;
                saveUsername(formDataToBeSend);
            }
        }else {
            if(this.checkValidityforgotPasswordForm()) {
                const { email} = formData;
                const formDataToBeSend = new FormData();
                formDataToBeSend.append('email', email);

                /* const config = {     
                    headers: { 'content-type': 'multipart/form-data' }
                }
                
                axios.post(url, formDataToBeSend, config)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                }); */
                formData.email = '';
                this.setState({forgotPassword: false, formData});
            }
        }
    }

    callInitials = () => {
        const { loggedIn } = this.props;
        if(loggedIn) {
            this.props.history.replace('/home');
        }
    }

    render() {
        // this.callInitials();
        const { formData, error, forgotPassword } = this.state;
        const { email, password, rememberMeChecked } = formData;
        const { emailError, passwordError } = error;
        const { loggedIn } = this.props;
        return (
            <div className='wrapper login'>
                <div className='container'>
                    <div className='login-wrapper'>
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
                                            <input type='text' name='email' value={email} tabIndex='1' onChange={this.onInputHandler}/>
                                            {emailError && <p className='error'>{emailError}</p>}
                                            <p className='info'>We'll never share your email with anyone else.</p>
                                        </div>
                                        <div className='form-group'>
                                            <label htmlFor='password'>Password</label>
                                            <input type='password' name='password' value={password} tabIndex='2' onChange={this.onInputHandler}/>
                                            {passwordError && <p className='error'>{passwordError}</p>}
                                        </div>
                                        <div className='form-group'>
                                            <div className='remember-block'>
                                                <input type='checkbox' name='rememberMe'  tabIndex='3' checked={rememberMeChecked} onChange={this.onInputHandler}/><label htmlFor='rememberMe'>Remember Me</label>
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
                                    <div className='sign-up'>
                                        <a href='/sign-up' tabIndex='6'>Create a new Account</a>
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
                                            <input type='text' name='email' value={email} tabIndex='1' onChange={this.onInputHandler}/>
                                            {emailError && <p className='error'>{emailError}</p>}
                                            <p className='info'>We'll never share your email with anyone else.</p>
                                        </div>
                                        <button type='submit' className='submit-btn' tabIndex='2'>Submit</button>
                                    </fieldset>
                                </form>
                            </div>}
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
        saveUsername : (data) => {dispatch({type: actionTypes.LOGIN,
            data})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);