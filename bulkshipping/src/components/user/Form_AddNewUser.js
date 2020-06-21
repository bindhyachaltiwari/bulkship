import React, { Component } from 'react';
import { Paper, Grid, Button, InputLabel, Select, Checkbox, ListItemText, MenuItem, Input, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import miscUtils from '../../utils/miscUtils';
import constants from '../../utils/constants';
import ConfirmationAlert from '../../utils/confirmationAlert';
import Alert from '../../utils/alert';
import api from '../../api';

class AddNewUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDirty: false,
      confAlertDetails: {
        openAlert: false,
        titleMsg: '',
        descrMsg: '',
        buttonTitle: '',
      },
      alertDetails: {
        openAlert: false,
        titleMsg: '',
        descrMsg: ''
      },
      userDetails: {},
      validity: {},
      isformValid: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelAlert = this.handleCancelAlert.bind(this);
    this.handleSuccessAlert = this.handleSuccessAlert.bind(this);
  }

  handleCancelAlert = () => this.setState({
    confAlertDetails: {
      openAlert: false,
      titleMsg: '',
      descrMsg: '',
      buttonTitle: '',
    },
    alertDetails: {
      openAlert: false,
      titleMsg: '',
      descrMsg: ''
    },
  });

  handleSuccessAlert = async e => {
    e.preventDefault();
    const { isDirty, userDetails } = this.state;
    if (isDirty) {
      this.setState({
        confAlertDetails: {
          openAlert: false,
          titleMsg: '',
          descrMsg: '',
          buttonTitle: '',
        },
        validity: {}
      });
    }

    let resp = await api.insertUserDetails({ ...userDetails });
    if (resp.data.status.errors || resp.data.status.errorMsg || resp.data.status.errmsg || !resp.data.status) {
      if (resp && resp.data && resp.data.status && resp.data.status.errmsg && resp.data.status.errmsg.indexOf('duplicate key error') >= 0) {
        this.setState({
          alertDetails: {
            openAlert: true,
            titleMsg: 'Error !!',
            descrMsg: 'Username already exits.'
          }
        });
        return;
      }
      this.setState({
        alertDetails: {
          openAlert: true,
          titleMsg: 'Error !!',
          descrMsg: 'Failed to add new user...'
        }
      });
    } else {
      this.setState({
        isDirty: false,
        confAlertDetails: {
          openAlert: false,
          titleMsg: '',
          descrMsg: '',
          buttonTitle: '',
        },
        userDetails: {},
        validity: {},
        isformValid: true,
        alertDetails: {
          openAlert: true,
          titleMsg: 'Success !!',
          descrMsg: 'Added new user successfully..'
        },
      });
    }
    this.props.handleBlocking(false);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      confAlertDetails: {
        openAlert: true,
        titleMsg: 'Add New User ?',
        descrMsg: 'Do you want to submit?',
        buttonTitle: 'Submit'
      },
    });
  }

  handleChange = e => {
    e.preventDefault();
    const { id, value, name } = e.target;
    let { userDetails, isformValid, validity } = this.state;
    if (typeof e.target.getAttribute === 'function') {
      let validationtype = e.target.getAttribute('type');
      if (validationtype) {
        const resp = miscUtils.isFieldValid(validationtype, value, validity, id);
        isformValid = !resp.v;
        this.setState({
          validity: resp.validity,
          validationtype,
          isformValid: !resp.v
        });
      }
    }

    if (id) {
      Object.assign(userDetails, { [id]: value });
    } else {
      Object.assign(userDetails, { [name]: value });
    }

    this.updateForm(userDetails, isformValid);
  };

  updateForm(userDetails, isformValid) {
    const { userName, companyName, displayName, password, role, managerRoles, clientDisplay, clientType } = userDetails
    if (isformValid && userName && companyName && displayName && password && role) {
      if (role === 'Client' && clientType && clientDisplay && clientDisplay.length) {
        Object.assign(userDetails, { managerRoles: [] });
        this.setState({ isDirty: true, userDetails });
      } else if (role === 'Manager' && managerRoles && managerRoles.length) {
        Object.assign(userDetails, { clientType: role, clientDisplay: [] });
        this.setState({ isDirty: true, userDetails });
      } else {
        this.setState({ isDirty: false, userDetails });
      }
    } else {
      this.setState({ isDirty: false, userDetails });
    }

    this.props.handleBlocking(true);
  }

  render() {
    const { validity, isDirty, isformValid, confAlertDetails, userDetails, alertDetails } = this.state;
    let { userName, companyName, displayName, password, role } = userDetails;
    let showRoledata;
    if (role === 'Manager') {
      showRoledata = this.getManagerRoleData();
    } else if (role === 'Client') {
      showRoledata = this.getClientRoleData();
    }

    return (
      <form autoComplete="off" noValidate >
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <ConfirmationAlert confAlertDetails={confAlertDetails} handleCancelAlert={this.handleCancelAlert} handleSuccessAlert={this.handleSuccessAlert} />
        <Paper style={{ marginTop: '2%' }}>
          <Grid container>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 25 }}
                error={validity && validity.userName && validity.userName.isInvalid}
                id='userName'
                label='User Name *'
                type='email*'
                onChange={this.handleChange}
                value={userName || ''}
                autoComplete='off'
                helperText={validity && validity.userName && validity.userName.isInvalid ? miscUtils.getErrorMessage(validity.userName.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 25 }}
                error={validity && validity.companyName && validity.companyName.isInvalid}
                id='companyName'
                label='Company Name *'
                type='onlyAlphabets'
                onChange={this.handleChange}
                value={companyName || ''}
                autoComplete='off'
                helperText={validity && validity.companyName && validity.companyName.isInvalid ? miscUtils.getErrorMessage(validity.companyName.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 25 }}
                error={validity && validity.displayName && validity.displayName.isInvalid}
                id='displayName'
                label='Display Name *'
                type='onlyAlphabets*'
                onChange={this.handleChange}
                value={displayName || ''}
                autoComplete='off'
                helperText={validity && validity.displayName && validity.displayName.isInvalid ? miscUtils.getErrorMessage(validity.displayName.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 8 }}
                error={validity && validity.password && validity.password.isInvalid}
                id='password'
                label='Password *'
                type='password'
                onChange={this.handleChange}
                value={password || ''}
                autoComplete='off'
                helperText={validity && validity.password && validity.password.isInvalid ? miscUtils.getErrorMessage(validity.password.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <InputLabel id='demo-simple-select-label' className='inputLabels'>Role *</InputLabel>
              <Select
                className='field-select'
                labelId='demo-simple-select-label'
                autoWidth
                id='role'
                name='role'
                value={role || ''}
                onChange={this.handleChange}>
                {miscUtils.getOptions(constants.roles)}
              </Select>
            </Grid>
            {showRoledata}
          </Grid>
          <Button
            className={`${(isDirty && isformValid) ? 'white-color' : 'grey-color'} btn-save`}
            variant='contained'
            size='large'
            startIcon={<SaveIcon />}
            disabled={!(isDirty && isformValid)}
            onClick={this.handleSubmit}> Submit  </Button>
        </Paper>
      </form>
    );
  }

  getManagerRoleData() {
    let { managerRoles } = this.state.userDetails;
    if (!managerRoles) {
      managerRoles = [];
    }
    const names = constants.managerRolesList;
    const data = <Grid item xs={12} md={6} lg={4} className='field-grid'>
      <InputLabel id="demo-mutiple-checkbox-label" className='inputLabels'>Select Manager Roles *</InputLabel>
      <Select
        className='field-select'
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        value={managerRoles}
        name='managerRoles'
        onChange={this.handleChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={(selected) => selected.join(', ')}>
        {names.map((name) => (
          <MenuItem key={name} value={name}>
            <Checkbox checked={managerRoles.indexOf(name) > -1} />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </Grid>
    return data;
  }

  getClientRoleData() {
    let { clientType, clientDisplay } = this.state.userDetails;
    if (!clientDisplay) {
      clientDisplay = [];
    }
    const names = constants.clientDisplayList.sort();
    const data = <>
      <Grid item xs={12} md={6} lg={4} className='field-grid'>
        <InputLabel id='demo-simple-select-label' className='inputLabels'>Client Type *</InputLabel>
        <Select
          className='field-select'
          labelId='demo-simple-select-label'
          autoWidth
          id='clientType'
          name='clientType'
          value={clientType || ''}
          onChange={this.handleChange}>
          {miscUtils.getOptions(constants.clientType)}
        </Select>
      </Grid>
      <Grid item xs={12} md={6} lg={4} className='field-grid'>
        <InputLabel id="demo-mutiple-checkbox-label" className='inputLabels'>Select Client Display *</InputLabel>
        <Select
          className='field-select'
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={clientDisplay}
          name='clientDisplay'
          onChange={this.handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => selected.join(', ')}>
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={clientDisplay.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </>
    return data
  }

}

export default AddNewUser;
