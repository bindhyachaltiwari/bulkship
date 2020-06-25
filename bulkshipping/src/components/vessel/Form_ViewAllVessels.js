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
      this.setState({ vesselList: res.data.vesselList });
    }
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
      { field: 'flag', title: 'Flag', editable: 'never' },
      { field: 'vesselType', title: 'Vessel Type', editable: 'never' },
      { field: 'built', title: 'Built Year', editable: 'never' },
      { field: 'draft', title: 'Draft', editable: 'never' },
      { field: 'LOA', title: 'LOA (M)', editable: 'never' },
      { field: 'beam', title: 'Beam (M)', editable: 'never' },
      { field: 'GRT', title: 'GRT (MT)', editable: 'never' },
      { field: 'NRT', title: 'NRT (MT)', editable: 'never' },
      { field: 'TPC', title: 'TPC (MT/CBM)', editable: 'never' },
      { field: 'holdsHatches', title: 'Holds/Hatches', editable: 'never' },
      { field: 'grainCapacity', title: 'Grain Capacity (CBM)', editable: 'never' },
      { field: 'baleCapacity', title: 'Bale Capacity (CBM)', editable: 'never' },
      { field: 'cranes', title: 'Cranes (MT)', editable: 'never' },
      { field: 'grabs', title: 'Grabs (CBM)', editable: 'never' },
      // { field: 'otherFields', title: 'Other Details' }
    ];
    const { vesselList, alertDetails } = this.state;
    return (
      <form>
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <UserTable title={'View All Vessels'} data={vesselList} columns={columns} onRowClick={this.onRowClick} />
      </form>
    );
  }
}

export default ViewAllVessels;