import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import '../../css/Admin.css';
import Select from 'react-select';
import FormHelperText from '@material-ui/core/FormHelperText'
class AddNewClient extends Component {

  userDetails = {
    userName: '',
    companyName: '',
    displayName: '',
    password: '',
    role: '',
    clientType: '',
    success: true,
    errorMsg: ''
  };

  roles = [{ label: "Admin", value: "Admin" }, { label: "Client", value: "Client" }, { label: "Manager", value: "Manager" }];
  clientType = [{ label: "Owner", value: "Owner" }, { label: "Charterer", value: "Charterer" }];

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
    const { userName, password, displayName, companyName, role, clientType } = this.state;
    if (!userName || !displayName || !password || !role || !companyName || (role === 'Client' && !clientType)) {
      this.setState({
        success: false,
        errorMsg: 'Please fill the required details'
      });
      return;
    }

    if (!clientType) {
      this.state.clientType = role;
    }

    let data = (await axios.post('http://localhost:3003/userDetails/insertUserDetails', {
      headers: { 'Content-Type': 'application/json' },
      data: {
        ...this.state
      }
    }));
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
            name="clientType"
          />
        </td>
      </tr>
    }
    return (
      <div className="about_us_2 about_us_2_animated">
        <Button variant="contained" color="primary" onClick={this.handleBackButton} style={{ top: "4%", left: "10%", position: "fixed" }}>
          Back
        </Button>
        <h2>Add New User</h2>
        <FormHelperText style={{ textAlign: 'center', fontSize: 'large' }} error={Boolean(!this.state.success)}>
          {this.state.success ? '' : this.state.errorMsg}
        </FormHelperText>
        <form id='userDetailsForm' onSubmit={this.handleAddNewUserSubmit} style={{ margin: "1%" }}>
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
                  <input type="email" name="userName" required onChange={this.handleUserDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Company Name *
                </label>
                </td>
                <td>
                  <input type="text" name="companyName" required onChange={this.handleUserDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Display Name *
                </label>
                </td>
                <td>
                  <input type="text" name="displayName" required onChange={this.handleUserDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Password *
                </label>
                </td>
                <td>
                  <input type="password" name="password" required onChange={this.handleUserDetailsChange} autoComplete="off" />
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
            type="submit"
            variant="raised"
            color="primary"
            style={{ margin: '16px' }}>
            {'Submit'}
          </Button>
        </form>
      </div>
    );
  }
}

export default AddNewClient;