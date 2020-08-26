import React, { Component } from 'react';
import Alert from '../../utils/alert';
import UserTable from './userTable';
import api from '../../api';

class ViewVoyageDetails extends Component {

  constructor(props) {
    super(props);
    this.originalObjectArray = [];
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
    const res = await api.getAllVoyageDetails();
    if (res.data.status) {
      for (var i = 0; i < res.data.voyageList.length; i++) {
        const id = res.data.voyageList[i]._id;
        res.data.voyageList[i].viewDetails = <button style={{ color: 'blue', textAlign: 'center' }} type='button' id={id} onClick={this.handleClickState}>View</button>;
        res.data.voyageList[i].viewDocuments = <button style={{ color: 'blue', textAlign: 'center' }} type='button' id={id} onClick={this.handleViewDocuments}>View</button>;
      }
    }
    this.setState({ voyageList: res.data.voyageList })
  }

  handleCancelAlert = () => this.setState({
    alertDetails: {
      openAlert: false,
      titleMsg: '',
      descrMsg: ''
    },
  });

  handleClickState = async e => {
    const id = e.target.id;
    const { voyageList } = this.state;
    const result = voyageList.filter(item => item['_id'] === id);
    delete result[0].viewDetails;
    delete result[0].viewDocuments;
    this.props.history.push({
      pathname: '/voyageDetails',
      state: { result: result }
    });
  }

  handleViewDocuments = async e => {
    const id = e.target.id;
    this.props.history.push({
      pathname: '/voyageDocuments',
      state: { voyageId: id }
    });
  }


  onRowClick = (event, rowData) => {
    this.props.handleRowClicked(rowData);
  }

  render() {
    let columns = [
      { field: 'chartererName', title: 'Charterer Name', editable: 'never' },
      { field: 'vesselName', title: 'Vessel Name', editable: 'never' },
      { field: 'cpDate', title: 'CP Date', editable: 'never' },
      { field: 'viewDetails', title: 'View Details', editable: 'never', export: false },
      { field: 'viewDocuments', title: 'Documents', editable: 'never', export: false },
    ];

    const { voyageList, alertDetails } = this.state;
    return (
      <form>
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <UserTable title={'View Voyage Details'} data={voyageList} columns={columns} onRowClick={this.onRowClick} originalArray={this.originalObjectArray} handleClickState={this.handleClickState} handleViewDocuments={this.handleViewDocuments} />
      </form>
    );
  }
}

export default ViewVoyageDetails;