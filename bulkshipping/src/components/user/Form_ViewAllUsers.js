import React, { Component } from 'react';
import Alert from '../../utils/alert';
import UserTable from './userTable';
import api from '../../api';

class ViewAllUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alertDetails: {
        openAlert: false,
        titleMsg: '',
        descrMsg: ''
      },
    }
    this.handleCancelAlert = this.handleCancelAlert.bind(this);
  }

  componentDidMount = async e => {
    const res = await api.getAllUserDetails();
    if (res.data.status) {
      this.setState({ clientList: res.data.clientList });
    }
  }

  handleCancelAlert = () => this.setState({
    alertDetails: {
      openAlert: false,
      titleMsg: '',
      descrMsg: ''
    },
  });

  render() {
    const columns = [{ field: 'userName', title: 'User Name' },
    { field: 'displayName', title: 'Display Name' },
    { field: 'companyName', title: 'Company Name' },
    { field: 'role', title: 'Role' },
    { field: 'clientType', title: 'User Type' },
    { field: 'viewVesselList', title: 'View' }];

    const { clientList, alertDetails } = this.state;
    return (
      <form>
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <UserTable title={'View All Users'} data={clientList} columns={columns} />
      </form>
    );
  }
}

export default ViewAllUsers;