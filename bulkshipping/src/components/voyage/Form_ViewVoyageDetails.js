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
      { field: 'chartererName', title: 'Charterer Name', editable: 'never' },
      { field: 'vesselName', title: 'Vessel Name', editable: 'never' },
      { field: 'cpDate', title: 'CP Date', editable: 'never' },
      { field: 'vesselSize', title: ' Vessel Size', editable: 'never' },
      { field: 'loadPort', title: ' Load Port', editable: 'never' },
      { field: 'dischargePort', title: 'Discharge Point', editable: 'never' },
      { field: 'cargo', title: 'Cargo', editable: 'never' },
      { field: 'cargoIntake', title: ' Cargo Intake', editable: 'never' },
      { field: 'ownerName', title: 'Owner Name', editable: 'never' },
      { field: 'shipper', title: 'Shipper', editable: 'never' },
      { field: 'loadPortAgent', title: 'Load Port Agent', editable: 'never' },
      { field: 'dischargePortAgent', title: 'Discharge Port Agent', editable: 'never' },
      { field: 'receiver', title: 'Receiver', editable: 'never' },
      { field: 'onHireSurveyor', title: 'On Hire Surveyor', editable: 'never' },
      { field: 'offHireSurveyor', title: 'Off Hire Surveyor', editable: 'never' },
      { field: 'bunkerSupplier', title: 'Bunker Supplier', editable: 'never' },
      { field: 'bunkerTrader', title: 'Bunker Trader', editable: 'never' },
      { field: 'pniInsurance', title: 'PNI Insurance', editable: 'never' },
      { field: 'weatherRoutingCompany', title: ' Weather Routing Company', editable: 'never' },
      { field: 'otherFields', title: 'Other Details', editable: 'never' },
      { field: 'fieldVisibility', title: 'Visible', editable: 'never' }
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