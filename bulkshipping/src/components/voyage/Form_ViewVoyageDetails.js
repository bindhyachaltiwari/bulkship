import React, { Component } from 'react';
import Alert from '../../utils/alert';
import UserTable from './userTable';
import api from '../../api';

class ViewVoyageDetails extends Component {

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
  checkandRemoveObject(data) {
    let updatedArray = [];
    updatedArray = data.map((item) => {
      let udpatedItem = '';
      if(item.otherFields) {
        Object.keys(item.otherFields).forEach(function(index,value){
          udpatedItem = udpatedItem + index+":"+item.otherFields[index]+'|'
        });
        item.otherFields = udpatedItem;
      }
    })
    return data;
  }

  checkandRemoveObject(data) {
    data.map((item) => {
      let udpatedItem = '';
      if (item.otherFields) {
        Object.keys(item.otherFields).forEach((index, value) => {
          udpatedItem = udpatedItem + index + ' = ' + item.otherFields[index] + ' | '
        });
        item.otherFields = udpatedItem.trim().substring(0, udpatedItem.trim().length - 1);
      }
    })
    return data;
  }

  componentDidMount = async e => {
    const res = await api.getAllVoyageDetails();
    if (res.data.status) {
      const updatedResult = this.checkandRemoveObject(res.data.voyageList);
      this.setState({ voyageList: updatedResult });
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
      { field: 'chartererName', title: 'Charterer Name' },
      { field: 'vesselName', title: 'Vessel Name' },
      { field: 'cpDate', title: 'CP Date' },
      { field: 'vesselSize', title: ' Vessel Size' },
      { field: 'loadPort', title: ' Load Port' },
      { field: 'dischargePort', title: 'Discharge Point' },
      { field: 'cargo', title: 'Cargo' },
      { field: 'cargoIntake', title: ' Cargo Intake' },
      { field: 'ownerName', title: 'Owner Name' },
      { field: 'shipper', title: 'Shipper' },
      { field: 'loadPortAgent', title: 'Load Port Agent' },
      { field: 'dischargePortAgent', title: 'Discharge Port Agent' },
      { field: 'receiver', title: 'Receiver' },
      { field: 'onHireSurveyor', title: 'On Hire Surveyor' },
      { field: 'offHireSurveyor', title: 'Off Hire Surveyor' },
      { field: 'bunkerSupplier', title: 'Bunker Supplier' },
      { field: 'bunkerTrader', title: 'Bunker Trader' },
      { field: 'pniInsurance', title: 'PNI Insurance' },
      { field: 'weatherRoutingCompany', title: ' Weather Routing Company' },
      { field: 'otherFields', title: 'Other Details' },
      { field: 'fieldVisibility', title: 'Visible' }
    ];

    const { voyageList, alertDetails } = this.state;
    return (
      <form>
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <UserTable title={'View Voyage Details'} data={voyageList} columns={columns} onRowClick={this.onRowClick} />
      </form>
    );
  }
}

export default ViewVoyageDetails;