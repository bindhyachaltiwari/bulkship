import React, { Component } from 'react';
import Alert from '../../utils/alert';
import UserTable from './userTable';
import api from '../../api';

class ViewAllUsers extends Component {

  constructor(props) {
    super(props);
    this.originalObjectArray = [];
    this.state = {
      alertDetails: {
        openAlert: false,
        titleMsg: '',
        descrMsg: ''
      },
      originalColumns : [],
    }
    this.handleCancelAlert = this.handleCancelAlert.bind(this);
  }

  componentDidMount = async e => {
    const res = await api.getAllUserDetails();
    if (res.data.status) {
      const onceArray = Array.from(res.data.clientList);
      this.originalObjectArray = JSON.parse(JSON.stringify(res.data.clientList))
      this.setState({
        originalColumns : onceArray
      })
      for (var i = 0; i < res.data.clientList.length; i++) {
        let singleClientId = res.data.clientList[i]
        if (singleClientId.role ==='Manager' && singleClientId.managerRoles && singleClientId.managerRoles.length) {
          singleClientId.managerRoles = <select>{singleClientId.managerRoles.map((e) => <option>{e}</option>)}</select>
        }
      }
      
      this.setState({ clientList: res.data.clientList });
    }
  }


  onRowClick = (event, rowData) => {
    if(!event.target.tagName === 'SELECT') {
      this.props.handleRowClicked(rowData);
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
    const columns = [{ field: 'userName', title: 'User Name', editable: 'never' },
    { field: 'displayName', title: 'Display Name', editable: 'never' },
    { field: 'companyName', title: 'Company Name', editable: 'never' },
    { field: 'role', title: 'Role', editable: 'never' },
    { field: 'clientType', title: 'User Type', editable: 'never' },
    { field: 'clientDisplay', title: 'Client Display', editable: 'never' },
    { field: 'managerRoles', title: 'Roles', editable: 'never' },
    ];

    const { clientList, alertDetails } = this.state;
    return (
      <form>
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <UserTable title={'View All Users'} data={clientList} columns={columns} onRowClick={this.onRowClick} originalColumns = {this.state.originalColumns} originalArray = {this.originalObjectArray}/>
      </form>
    );
  }
}

export default ViewAllUsers;