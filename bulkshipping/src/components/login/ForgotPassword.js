import React, { Component } from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Spinner from '../../utils/Spinner'
import FormPasswordReset from './FormPasswordReset';
import Typography from '@material-ui/core/Typography'
import SaveIcon from '@material-ui/icons/Save';
import api from '../../api'

class ForgotPassword extends Component {
  state = {
    passChangeSuccess: false,
  }

  _handleModalClose = () => {
    this.setState(() => ({
      passChangeSuccess: false,
    }))
  }

  _handleSubmit = async ({
    username,
    setSubmitting,
    resetForm,
  }) => {
    let resp = await api.checkUsername({ username });
    setSubmitting(false);
    resp = resp.data;
    if (!resp.status) {
      this.setState(() => ({
        passChangeSuccess: false,
        error: true,
        errorMsg: 'Username not found'
      }))
      return;
    } else {
      this.setState(() => ({
        username,
        passChangeSuccess: true,
        error: false,
      }))
    }

    resetForm();
  }

  render() {
    return (
      <Formik
        initialValues={{
          username: '',
        }}
        validationSchema={object().shape({
          username: string().required('Please enter a valid email address.'),
        })}
        onSubmit={(
          { username },
          { setSubmitting, resetForm }
        ) =>
          this._handleSubmit({
            username,
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

          let showData;
          if (isSubmitting) {
            showData = <Spinner />
          } else if (this.state.passChangeSuccess) {
            showData = <div className='ForgotPasswordForm'>
              <Typography variant='h5' style={{ margin: '16px 0' }}> Password Reset </Typography>
              <FormPasswordReset username={this.state.username} />
            </div>
          } else {
            showData = <div className='ForgotPasswordForm'>
              <Paper className='form form--wrapper' elevation={10}>
                <form className='form' onSubmit={handleSubmit}>
                  <FormControl fullWidth margin='dense'>
                    <InputLabel
                      htmlFor='username'
                      error={Boolean(touched.username && errors.username)}>
                      {'Enter your username'}
                    </InputLabel>
                    <Input
                      id='username'
                      name='username'
                      type='email'
                      autoComplete='off'
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.username && errors.username)}
                    />
                    <FormHelperText error={Boolean(touched.username && errors.username)}>
                      {touched.username && errors.username ? errors.username : ''}
                    </FormHelperText>
                    <FormHelperText error={Boolean(this.state.error)}>
                      {this.state.error ? this.state.errorMsg : ''}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    // className={`${!(!isValid || isSubmitting) ? 'white-color' : 'grey-color'} btn-save`}
                    variant='contained'
                    size='large'
                    startIcon={<SaveIcon />}
                    type='submit'
                    disabled={Boolean(!isValid || isSubmitting)}
                    onClick={this.handleSubmit}> Check Username  </Button>

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

export default ForgotPassword;