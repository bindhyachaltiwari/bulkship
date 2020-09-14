import React, { Component } from 'react';
import Alert from '../../utils/alert';
import UserTable from './userTable';
import api from '../../api';

class ViewAllVessels extends Component {

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
    const res = await api.getAllVesselsDetails();
    if (res.data.status) {
      for (var i = 0; i < res.data.vesselList.length; i++) {
        res.data.vesselList[i].viewDetails = <button style={{ backgroundColor: '#1e4356', color: 'white', textAlign: 'center' }} type='button' id={res.data.vesselList[i]._id} onClick={this.handleClickState}>View</button>;
      }
    }
    this.setState({ vesselList: res.data.vesselList })
  }

  handleClickState = async e => {
    const id = e.target.id;
    const { vesselList } = this.state;
    const result = vesselList.filter(item => item['_id'] === id);
    delete result[0].viewDetails;
    this.props.history.push({
      pathname: '/vesselDetails',
      state: { result: result }
    });
  }

  handleCancelAlert = () => this.setState({
    alertDetails: {
      openAlert: false,
      titleMsg: '',
      descrMsg: ''
    },
  });

  onRowClick = (event, rowData) => {
    this.props.handleRowClicked(rowData);
  }

  render() {
    const columns = [
      { field: 'vesselName', title: 'Vessel Name', editable: 'never' },
      { field: 'IMO', title: 'IMO', editable: 'never' },
      { field: 'DWT', title: ' DWT (MT)', editable: 'never' },
      { field: 'viewDetails', title: 'View Details', editable: 'never', export: false },
    ];
    const { vesselList, alertDetails } = this.state;
    return (
      <form>
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <UserTable title={'View All Vessels'} data={vesselList} columns={columns} onRowClick={this.onRowClick} handleClickState={this.handleClickState} />
      </form>
    );
  }
}

export default ViewAllVessels;