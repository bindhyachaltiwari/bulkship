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
      originalColumns: [],
    }
    this.handleCancelAlert = this.handleCancelAlert.bind(this);
  }

  componentDidMount = async e => {
    const res = await api.getAllUserDetails();
    if (res.data.status) {
      const onceArray = Array.from(res.data.clientList);
      this.originalObjectArray = JSON.parse(JSON.stringify(res.data.clientList))
      this.setState({
        originalColumns: onceArray
      })
      for (var i = 0; i < res.data.clientList.length; i++) {
        let singleClientId = res.data.clientList[i]
        if (singleClientId.role === 'Manager' && singleClientId.managerRoles && singleClientId.managerRoles.length) {
          singleClientId.managerRoles = <select>{singleClientId.managerRoles.map((e) => <option key={e}>{e}</option>)}</select>
        }
        if (singleClientId.role === 'Client') {
          if (singleClientId.clientDisplay && singleClientId.clientDisplay.length) {
            singleClientId.clientDisplay = <select>{singleClientId.clientDisplay.map((e) => <option key={e}>{e}</option>)}</select>
          }
          singleClientId.viewDetails = <button style={{ color: 'blue', textAlign: 'center' }} type='button' id={singleClientId.id} onClick={this.handleClickState}>View</button>;
        }
      }

      this.setState({ clientList: res.data.clientList });
    }
  }

  handleClickState = async e => {
    const id = e.target.id;
    const { clientList } = this.state;
    const result = clientList.filter(item => item.id === id);
    delete result[0].viewDetails;
    delete result[0].clientDisplay;
    // this.props.history.push({
    //   pathname: '/client',
    //   state: { result: result }
    // });
  }


  onRowClick = (event, rowData) => {
    this.props.handleRowClicked(rowData);
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
    { field: 'clientDisplay', title: 'Client Display', editable: 'never', export: false },
    { field: 'managerRoles', title: 'Roles', editable: 'never', export: false },
    { field: 'viewDetails', title: 'View Details', editable: 'never', export: false },
    ];

    const { clientList, alertDetails } = this.state;
    return (
      <form>
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <UserTable title={'View All Users'} data={clientList} columns={columns} onRowClick={this.onRowClick} originalColumns={this.state.originalColumns} originalArray={this.originalObjectArray} />
      </form>
    );
  }
}

export default ViewAllUsers;