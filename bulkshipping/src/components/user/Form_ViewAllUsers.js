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
        if ((singleClientId.role === 'Manager' && singleClientId.managerRoles && singleClientId.managerRoles.length)
          || (singleClientId.role === 'Client' && singleClientId.clientDisplay && singleClientId.clientDisplay.length)) {
          if (singleClientId.role === 'Manager') {
            singleClientId.displayRoles = <select>{singleClientId.managerRoles.map((e) => <option key={e}>{e}</option>)}</select>
          } else if (singleClientId.role === 'Client') {
            singleClientId.displayRoles = <select>{singleClientId.clientDisplay.map((e) => <option key={e}>{e}</option>)}</select>
          }
        }
        if (singleClientId.role === 'Client') {
          singleClientId.viewDetails = <button style={{ backgroundColor: '#1e4356', color: 'white', textAlign: 'center' }} type='button' id={singleClientId.id} onClick={this.handleClickState}>View</button>;
        }
      }

      this.setState({ clientList: res.data.clientList });
    }
  }

  handleClickState = async e => {
    const id = e.target.id;
    const { clientList } = this.state;
    const result = clientList.find(item => item.id === id);
    delete result.viewDetails;
    this.props.history.push({
      pathname: '/clientDetails',
      state: { companyName: result.companyName }
    });
  }


  onRowClick = (event, rowData) => {
    this.props.handleRowClicked(rowData);
  }

  showAlert = (event) => {
    let str;
    let title = 'Success'
    if (typeof event !== 'string') {
      str = 'User Activated Successfully.'
      if (!event.isActive) {
        str = 'User Deactivated Successfully.'
      }
    } else {
      title = 'Error'
      str = event
    }

    this.setState({
      alertDetails: {
        openAlert: true,
        titleMsg: title,
        descrMsg: str
      },
    });
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
    { field: 'displayRoles', title: 'Client Display / Manager Roles', editable: 'never', export: false },
    { field: 'viewDetails', title: 'View Details', editable: 'never', export: false },
    ];

    const { clientList, alertDetails } = this.state;
    return (
      <form>
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <UserTable title={'View All Users'} data={clientList} columns={columns} showAlert={this.showAlert} onRowClick={this.onRowClick} originalColumns={this.state.originalColumns} originalArray={this.originalObjectArray} handleClickState={this.handleClickState} />
      </form>
    );
  }
}

export default ViewAllUsers;