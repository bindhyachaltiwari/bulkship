import React, { Component } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Spinner from '../Others/Spinner'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom';
import Page from '../Others/Page'
import api from '../api'

export default class LoginHome extends Component {

    state = {
        isLoggedIn: localStorage.getItem('authToken') ? true : false,
        role: localStorage.getItem('userRole') ? localStorage.getItem('userRole') : '',
        errorMsg: '',
        error: localStorage.getItem('authToken') ? false : true
    }

    // handleLogoutClick = (e) => {
    //     localStorage.setItem('authToken', '');
    //     localStorage.setItem('userRole', '');
    //     localStorage.setItem('userName', '');
    //     this.setState({
    //         isLoggedIn: false,
    //         role: '',
    //         errorMsg: '',
    //         error: false,
    //     });
    // }

    _handleSubmit = async ({
        username,
        password,
        setSubmitting,
        resetForm,
    }) => {
        this.setState(() => ({
            isLoggedIn: false,
            error: false,
            role: '',
        }));

        let resp = await api.login({ username, password, });
        resp = resp.data;
        setSubmitting(false);
        if (!resp.status) {
            this.setState(() => ({
                isLoggedIn: false,
                errorMsg: resp.err,
                error: true,
                role: '',
            }))
            return;
        } else {
            this.setState(() => ({
                isLoggedIn: true,
                error: false,
                errorMsg: '',
            }))
            localStorage.setItem('authToken', resp.token);
            localStorage.setItem('userRole', resp.role);
            localStorage.setItem('displayName', resp.displayName);
            localStorage.setItem('userName', resp.userName);
            localStorage.setItem('companyName', resp.companyName);
            localStorage.setItem('managerRoles', JSON.stringify(resp.managerRoles));
        }

        resetForm();
    }

    render() {
        return (
            <Formik
                initialValues={{
                    username: '',
                    password: '',
                }}
                validationSchema={object().shape({
                    username: string().required('Please enter a valid email address.'),
                    password: string().required('Password is required'),
                })}
                onSubmit={(
                    { username, password },
                    { setSubmitting, resetForm }
                ) =>
                    this._handleSubmit({
                        username,
                        password,
                        setSubmitting,
                        resetForm,
                    })
                }
                render={props => {
                    const {
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isValid,
                        isSubmitting,
                    } = props

                    const { error } = this.state;
                    const authToken = localStorage.getItem('authToken');
                    const userRole = localStorage.getItem('userRole');
                    let showData;
                    if (isSubmitting) {
                        showData = <Spinner />
                    } else if (userRole && !error) {
                        showData = <div>
                            <Page />
                            {/* <LogoutButton onClick={this.handleLogoutClick} ></LogoutButton> */}
                        </div>
                    } else {
                        showData = <div className='ForgotPasswordForm'>
                            <Typography variant='h4' style={{ margin: '10px 0' }}> Login </Typography>
                            <Paper className='form form--wrapper' elevation={10}>
                                <form className='form' onSubmit={handleSubmit}>
                                    <FormControl fullWidth margin='dense'>
                                        <InputLabel htmlFor='username' error={Boolean(touched.username && errors.username)}>
                                            {'Enter your username'}
                                        </InputLabel>
                                        <Input
                                            id='username'
                                            name='username'
                                            type='email'
                                            required
                                            autoComplete='off'
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.username && errors.username)} />
                                        <FormHelperText error={Boolean(touched.username && errors.username)}>
                                            {touched.username && errors.username ? errors.username : ''}
                                        </FormHelperText>
                                    </FormControl>
                                    <FormControl
                                        fullWidth
                                        margin='dense'
                                        error={Boolean(touched.password && errors.password)}>
                                        <InputLabel htmlFor='password' error={Boolean(touched.password && errors.password)}>
                                            {'Enter your password'}
                                        </InputLabel>
                                        <Input
                                            id='password'
                                            name='password'
                                            type='password'
                                            autoComplete='off'
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.password && errors.password)}
                                        />
                                        <FormHelperText error={Boolean(touched.password && errors.password)}>
                                            {touched.password && errors.password ? errors.password : ''}
                                        </FormHelperText>
                                    </FormControl>
                                    <FormHelperText error={Boolean(this.state.error)}>
                                        {this.state.error ? this.state.errorMsg : ''}
                                    </FormHelperText>
                                    <Button
                                        type='submit'
                                        variant='contained'
                                        size='small'
                                        color='primary'
                                        disabled={Boolean(!isValid || isSubmitting)}
                                        style={{ margin: '16px' }}>
                                        Login </Button>
                                    <Link style={{ color: 'black' }} to='/forgotPassword'>Forgot Password !!</Link>
                                </form>
                            </Paper>
                        </div>
                    }
                    return (
                        showData
                    )
                }
                }
            />
        )
    }
}
