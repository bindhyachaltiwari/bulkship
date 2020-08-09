import React, { Component } from 'react'
import { Formik } from 'formik'
import { object, ref, string } from 'yup'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import api from '../../api'
import Spinner from '../../utils/Spinner'

export default class FormPasswordReset extends Component {

  state = {
    passChangeSuccess: false,
    user: this.props.username,
  }

  _handleModalClose = () => {
    this.setState(() => ({
      passChangeSuccess: false,
    }))
  }

  _renderModal = () => {
    const onClick = () => {
      this.setState(() => ({ passChangeSuccess: false }))
    }

    // return (
    //   <Alert
    //     isOpen={this.state.passChangeSuccess}
    //     onClose={this._handleClose}
    //     handleSubmit={onClick}
    //     title='Password Reset'
    //     text='Your password was changed successfully'
    //     submitButtonText='Done'
    //   />
    // )
  }

  _handleSubmit = async ({
    confirmPass,
    setSubmitting,
    resetForm,
  }) => {

    let resp = await api.updatePassword({ user: this.state.user, confirmPass });
    resp = resp.data;
    setSubmitting(false);
    if (!resp.status) {
      this.setState(() => ({
        passChangeSuccess: false,
      }));
      return;
    } else {
      this.setState(() => ({
        passChangeSuccess: true,
      }))
    }

    resetForm();
  }

  render() {
    return (
      <Formik
        initialValues={{
          newPass: '',
          confirmPass: '',
        }}
        validationSchema={object().shape({
          newPass: string().required('New password is required'),
          confirmPass: string()
            .oneOf([ref('newPass')], 'Passwords do not match')
            .required('Password is required'),
        })}
        onSubmit={(
          { newPass, confirmPass },
          { setSubmitting, resetForm }
        ) =>
          this._handleSubmit({
            newPass,
            confirmPass,
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
          return isSubmitting ? (
            <Spinner />
          ) : (
              <Paper className='form form--wrapper' elevation={10}>
                <form className='form' onSubmit={handleSubmit}>
                  <FormControl fullWidth margin='dense' error={Boolean(touched.newPass && errors.newPass)}>
                    <InputLabel htmlFor='password-new' error={Boolean(touched.newPass && errors.newPass)}>
                      {'New Password'}
                    </InputLabel>
                    <Input
                      id='password-new'
                      name='newPass'
                      type='password'
                      autoComplete='off'
                      value={values.newPass}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.newPass && errors.newPass)} />
                    <FormHelperText error={Boolean(touched.newPass && errors.newPass)}>
                      {touched.newPass && errors.newPass ? errors.newPass : ''}
                    </FormHelperText>
                  </FormControl>
                  <FormControl fullWidth margin='dense' error={Boolean(touched.confirmPass && errors.confirmPass)}>
                    <InputLabel htmlFor='password-confirm' error={Boolean(touched.confirmPass && errors.confirmPass)}>
                      {'Confirm Password'}
                    </InputLabel>
                    <Input
                      id='password-confirm'
                      name='confirmPass'
                      type='password'
                      value={values.confirmPass}
                      autoComplete='off'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.confirmPass && errors.confirmPass)} />
                    <FormHelperText error={Boolean(touched.confirmPass && errors.confirmPass)}>
                      {touched.confirmPass && errors.confirmPass ? errors.confirmPass : ''}
                    </FormHelperText>
                  </FormControl>
                  <Button
                    type='submit'
                    variant='raised'
                    color='primary'
                    disabled={Boolean(!isValid || isSubmitting)}
                    style={{ margin: '16px' }} >
                    {'Reset Password'}
                  </Button>
                </form>
                {this._renderModal()}
              </Paper>
            )
        }}
      />
    )
  }
}
