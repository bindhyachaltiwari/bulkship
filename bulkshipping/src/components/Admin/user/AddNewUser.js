import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import '../../../css/Admin.css';
import Select from 'react-select';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import api from '../../api';

class AddNewUser extends Component {

  userDetails = {
    userName: '',
    companyName: '',
    displayName: '',
    password: '',
    role: '',
    clientType: '',
    success: true,
    errorMsg: '',
    managerRoles: {
      AddUser: false,
      ViewUsers: false,
      EditUser: false,
      AddVessel: false,
      ViewVessels: false,
      EditVessels: false,
      FillVoyage: false,
      ViewVoyage: false,
      EditVoyage: false,
      FillPerformance: false,
      ViewPerformance: false,
      EditPerformance: false,
    },
  };

  roles = [{ label: 'Client', value: 'Client' }, { label: 'Manager', value: 'Manager' }];
  clientType = [{ label: 'Owner', value: 'Owner' }, { label: 'Charterer', value: 'Charterer' }];

  constructor(props) {
    super(props);
    this.state = { ...this.userDetails };
    this.handleUserDetailsChange = this.handleUserDetailsChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleClientTypeChange = this.handleClientTypeChange.bind(this);
    this.handleAddNewUserSubmit = this.handleAddNewUserSubmit.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleUserDetailsChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      success: true,
      errorMsg: ''
    });
  };

  handleMultiSelect = (event) => {
    console.log(event);
    this.setState({
      ...this.state, managerRoles: {
        ...this.state.managerRoles,
        [event.target.name]: event.target.checked
      }
    });
  };

  handleBackButton() {
    this.props.history.goBack();
  }

  handleRoleChange = e => {
    this.setState({
      role: e.value,
      success: true,
      errorMsg: ''
    });
  }

  handleClientTypeChange = e => {
    this.setState({
      clientType: e.value,
      success: true,
      errorMsg: ''
    });
  }

  async handleAddNewUserSubmit(event) {
    event.preventDefault();
    const { userName, password, displayName, companyName, role, clientType, managerRoles } = this.state;
    if (!userName || !displayName || !password || !role || !companyName || (role === 'Client' && !clientType)) {
      this.setState({
        success: false,
        errorMsg: 'Please fill the required details'
      });
      return;
    }

    if (role === 'Manager') {
      const { AddUser, ViewUsers, EditUser, AddVessel, ViewVessels, EditVessels, FillVoyage, ViewVoyage, EditVoyage, FillPerformance, ViewPerformance, EditPerformance } = managerRoles;
      const error = [AddUser, ViewUsers, EditUser, AddVessel, ViewVessels, EditVessels, FillVoyage, ViewVoyage, EditVoyage, FillPerformance, ViewPerformance, EditPerformance].filter((v) => v).length < 1;
      if (error) {
        this.setState({
          success: false,
          errorMsg: 'Please select minimum one role'
        });
        return;
      }
    }

    if (!clientType) {
      this.state.clientType = role;
    }

    let data = await api.insertUserDetails({ ...this.state });
    if (data.data.status.errors || data.data.status.errmsg) {
      if (data.data.status.errmsg.indexOf('duplicate key error') >= 0) {
        data.data.status.errmsg = 'Username already exits.'
      }
      this.setState({
        success: false,
        errorMsg: data.data.status.errmsg
      });
      return;
    } else {
      document.getElementById('userDetailsForm').reset();
      this.setState({
        ...this.userDetails,
        success: false,
        errorMsg: 'Success!! New user created = ' + userName
      });
      return;
    }
  }

  render() {
    const role = this.state.role;
    const { AddUser, ViewUsers, EditUser, AddVessel, ViewVessels, EditVessels, FillVoyage, ViewVoyage, EditVoyage, FillPerformance, ViewPerformance, EditPerformance } = this.state.managerRoles;
    const error = [AddUser, ViewUsers, EditUser, AddVessel, ViewVessels, EditVessels, FillVoyage, ViewVoyage, EditVoyage, FillPerformance, ViewPerformance, EditPerformance].filter((v) => v).length < 1;
    let tableData;
    if (role === 'Client') {
      tableData = <tr>
        <td>
          <label>
            Client Type *
        </label>
        </td>
        <td>
          <Select
            value={this.clientType.filter(({ value }) => value === this.state.clientType)}
            onChange={this.handleClientTypeChange}
            options={this.clientType}
            placeholder='Select Client Type'
            name='clientType'
          />
        </td>
      </tr>
    } else if (role === 'Manager') {
      tableData = <tr>
        <td>
          <label>
            Select Manager Roles *
          </label>
        </td>
        <td>
          <FormControl required error={error} component='fieldset' style={{ display: 'flex' }}>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={AddUser} onChange={this.handleMultiSelect} name='AddUser' />}
                label='Add New User'
              />
              <FormControlLabel
                control={<Checkbox checked={ViewUsers} onChange={this.handleMultiSelect} name='ViewUsers' />}
                label='View All Users'
              />
              <FormControlLabel
                control={<Checkbox checked={EditUser} onChange={this.handleMultiSelect} name='EditUser' />}
                label='Edit User Details'
              />
              <FormControlLabel
                control={<Checkbox checked={AddVessel} onChange={this.handleMultiSelect} name='AddVessel' />}
                label='Add New Vessel'
              />
              <FormControlLabel
                control={<Checkbox checked={ViewVessels} onChange={this.handleMultiSelect} name='ViewVessels' />}
                label='View All Vessels'
              />
              <FormControlLabel
                control={<Checkbox checked={EditVessels} onChange={this.handleMultiSelect} name='EditVessels' />}
                label='Edit Vessel Details'
              />
              <FormControlLabel
                control={<Checkbox checked={FillVoyage} onChange={this.handleMultiSelect} name='FillVoyage' />}
                label='Fill Voyage Details'
              />
              <FormControlLabel
                control={<Checkbox checked={ViewVoyage} onChange={this.handleMultiSelect} name='ViewVoyage' />}
                label='View All Voyage Details'
              />
              <FormControlLabel
                control={<Checkbox checked={EditVoyage} onChange={this.handleMultiSelect} name='EditVoyage' />}
                label='Edit Voyage Details'
              />
              <FormControlLabel
                control={<Checkbox checked={FillPerformance} onChange={this.handleMultiSelect} name='FillPerformance' />}
                label='Fill Performance Details'
              />
              <FormControlLabel
                control={<Checkbox checked={ViewPerformance} onChange={this.handleMultiSelect} name='ViewPerformance' />}
                label='View All Performance Details'
              />
              <FormControlLabel
                control={<Checkbox checked={EditPerformance} onChange={this.handleMultiSelect} name='EditPerformance' />}
                label='Edit Performance Details'
              />
            </FormGroup>
            <FormHelperText>Please select minimum one role</FormHelperText>
          </FormControl>
        </td>
      </tr>
    }
    return (
      <div className='about_us_2 about_us_2_animated'>
        <Button variant='contained' color='primary' onClick={this.handleBackButton} style={{ top: '4%', left: '10%', position: 'fixed' }}>
          Back
        </Button>
        <h2>Add New User</h2>
        <FormHelperText style={{ textAlign: 'center', fontSize: 'large' }} error={Boolean(!this.state.success)}>
          {this.state.success ? '' : this.state.errorMsg}
        </FormHelperText>
        <form id='userDetailsForm' onSubmit={this.handleAddNewUserSubmit} style={{ margin: '1%' }} autoComplete='off'>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label>
                    User Name *
                </label>
                </td>
                <td>
                  <input type='email' name='userName' required onChange={this.handleUserDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Company Name *
                </label>
                </td>
                <td>
                  <input type='text' name='companyName' required onChange={this.handleUserDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Display Name *
                </label>
                </td>
                <td>
                  <input type='text' name='displayName' required onChange={this.handleUserDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Password *
                </label>
                </td>
                <td>
                  <input type='password' name='password' required onChange={this.handleUserDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Role *
                </label>
                </td>
                <td>
                  <div>
                    <Select
                      value={this.roles.filter(({ value }) => value === this.state.role)}
                      onChange={this.handleRoleChange}
                      options={this.roles}
                      placeholder='Select Role'
                    />
                  </div>
                </td>
              </tr>
              {tableData}
            </tbody>
          </table>
          <Button
            type='submit'
            variant='contained'
            size='small'
            color='primary'
            style={{ margin: '16px' }}>
            Submit </Button>
        </form>
      </div>
    );
  }
}

export default AddNewUser;