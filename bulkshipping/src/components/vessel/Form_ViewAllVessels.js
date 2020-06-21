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
      { field: 'vesselName', title: 'Vessel Name' },
      { field: 'IMO', title: 'IMO' },
      { field: 'DWT', title: ' DWT (MT)' },
      { field: 'flag', title: 'Flag' },
      { field: 'vesselType', title: 'Vessel Type' },
      { field: 'built', title: 'Built Year' },
      { field: 'draft', title: 'Draft' },
      { field: 'LOA', title: 'LOA (M)' },
      { field: 'beam', title: 'Beam (M)' },
      { field: 'GRT', title: 'GRT (MT)' },
      { field: 'NRT', title: 'NRT (MT)' },
      { field: 'TPC', title: 'TPC (MT/CBM)' },
      { field: 'holdsHatches', title: 'Holds/Hatches' },
      { field: 'grainCapacity', title: 'Grain Capacity (CBM)' },
      { field: 'baleCapacity', title: 'Bale Capacity (CBM)' },
      { field: 'cranes', title: 'Cranes (MT)' },
      { field: 'grabs', title: 'Grabs (CBM)' },
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