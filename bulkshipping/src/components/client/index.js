import React, { Component } from 'react';
import ScrollableTabsButtonAuto from '../sub-component/ScrollableTabsButtonAuto';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import ConfirmationAlert from '../../utils/confirmationAlert';
import Alert from '../../utils/alert';
import './style.scss';
import UserTable from './userTable';
import api from '../../api';

class Client extends Component {

  constructor(props) {
    super(props);
    this.getAllVoyage();
    this.clientDisplay = props.detail.clientDisplay;
    this.state = {
      vesselList: [],
      vesselDetails: {
        vesselName: '',
        vesselSize: '',
        cpDate: '',
        loadPort: '',
        dischargePort: '',
        cargo: '',
        cargoIntake: '',
        ownerName: ''
      },
      tableData: [],
      performanceDetails: {},
      isPeformancePage: false,
      error: false,
      userName: '',
      alertDetails: {
        openAlert: false,
        titleMsg: '',
        descrMsg: ''
      },
    }
    this.handleCancelAlert = this.handleCancelAlert.bind(this);
  }
  handleCancelAlert = () => this.setState({
    alertDetails: {
      openAlert: false,
      titleMsg: '',
      descrMsg: ''
    },
  });

  getAllVoyage = async () => {
    const { detail } = this.props;
    let voyage,performance,documents = false;
    await api.getAllVoyage({ 'companyName': detail.companyName }).then(res => {
      if (res.data.status) {
        if (detail.clientDisplay.length) {
          detail.clientDisplay.indexOf('View Documents') >= 0 ? documents = true : documents = false;
          detail.clientDisplay.indexOf('View Performance') >= 0 ? performance = true : performance = false;
          detail.clientDisplay.indexOf('View Voyage Details') >= 0 ? voyage = true : voyage = false;
          for (var i =0 ;i<res.data.vesselList.length;i++) {
            if (documents) {
              res.data.vesselList[i].viewDocuments = <button style={{ color: 'blue', textAlign: 'center' }}  type='button' onClick={this.handleViewDocuments}>View</button>;
            }
            if (performance) {
              res.data.vesselList[i].vesselPerformance = <button style={{ color: 'blue', textAlign: 'center' }} type='button' onClick={this.handleVesselPerformance}>View</button>;
            }
            if (voyage) {
              res.data.vesselList[i].voyageDetails = <button style={{ color: 'blue', textAlign: 'center' }}  type='button' onClick={this.handleVoyageDetails}>View</button>;;
            }
          }
        }
        this.setState({
          vesselList: res.data.vesselList,
          companyName: detail.companyName,
          error: false,
        });
      } else {
        this.setState({
          error: true,
          companyName: detail.companyName,
        });
        return;
      }
    });
  }

  handlePerformanceClick = e => {
    const { vesselList } = this.state;
    const c = vesselList.find(m => m['_id'] === e.target.id);
    this.props.history.push({
      pathname: '/CheckPerformance',
      state: { detail: c }
    });
  }

  handleVoyageDetails = e => {
    const { vesselList } = this.state;
    const c = vesselList.find(m => m['_id'] === e.target.id);
    this.props.history.push({
      pathname: '/viewVoyageDetails',
      state: { detail: c }
    });
  }

  handleVesselPerformance = e => {
    const { vesselList } = this.state;
    const c = vesselList.find(m => m['_id'] === e.target.id);
    this.props.history.push({
      pathname: '/viewPerformanceDetails',
      state: { detail: c }
    });
  }

  handleViewDocuments = e => {
    this.props.history.push({
      pathname: '/viewDocuments'
    });
  }



  // buildCustomTableBodyCell = ({ cellVal, column, rowId }) => {
  //   let val;
  //   switch (column.id) {
  //     case 'checkPerformance':
  //       val = <button style={{ color: 'blue', textAlign: 'center' }} id={rowId} type='button' onClick={this.handlePerformanceClick}>Check Performance</button>;
  //       break;
  //     case 'vesselName':
  //       val = this.getPopupContent(cellVal, rowId);
  //       break;
  //     case 'VoyageDetails':
  //       val = <button style={{ color: 'blue', textAlign: 'center' }} id={rowId} type='button' onClick={this.handleVoyageDetails}>View</button>;
  //       break;
  //     case 'VesselPerformance':
  //       val = <button style={{ color: 'blue', textAlign: 'center' }} id={rowId} type='button' onClick={this.handleVesselPerformance}>View</button>;
  //       break;
  //     case 'ViewDocuments':
  //       val = <button style={{ color: 'blue', textAlign: 'center' }} id={rowId} type='button' onClick={this.handleViewDocuments}>View</button>;
  //       break;
  //     default:
  //       val = <div style={{ color: 'blue' }}>{cellVal}</div>;
  //       break;
  //   }
  //   return val;
  // };

  render() {
    const columns = [{ field: 'vesselName', title: 'Vessel Name', editable: 'never' },
    { field: 'cpDate', title: 'CP Date',editable: 'never' },
    { field: 'voyageDetails', title: 'Voyage Details',check:'View Voyage Details', editable: 'never' },
    { field: 'vesselPerformance', title: 'Vessel Performance', check: 'View Performance' ,editable: 'never' },
    { field: 'viewDocuments', title: 'View Documents',check:'View Documents', editable: 'never' }
    ];
    const { detail } = this.props;
    var index = columns.length;
    while (index--) {
      if (columns[index].check && !detail.clientDisplay.includes(columns[index].check)) { 
        columns.splice(index, 1);
      } 
  }



    const { clientList, alertDetails,vesselList } = this.state;
    return (
      <form>
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <UserTable title={'Fixture List'} data={vesselList} columns={columns} onRowClick={this.onRowClick} />
      </form>
    );
  }

  capitalize = s => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }


  // getPopupContent = (cellVal, rowId) => {
  //   const { vesselList } = this.state;
  //   let vesselDetails = vesselList.find(m => m['_id'] === rowId);
  //   vesselDetails = (({ vesselName, vesselSize, cpDate, loadPort, cargo, cargoIntake, ownerName }) => (
  //     { vesselName, vesselSize, cpDate, loadPort, cargo, cargoIntake, ownerName }))(vesselDetails);

  //   const content = <div>
  //     <Popup trigger={<a id={rowId} style={{ color: 'blue', textAlign: 'center', textDecoration: 'underline', cursor: 'pointer' }}> {cellVal} </a>}
  //       modal closeOnDocumentClick >
  //       <div className='content'>
  //         <DisplaySelectedVesselDetails vesselDetails={vesselDetails} />
  //       </div>
  //     </Popup>
  //   </div>

  //   return content;
  // }
}

const mapStateToProps = (state, ownProps) => {
  const { ui, detail } = state;
  return {
    ui,
    detail
  };
}

export default connect(mapStateToProps, null)(Client);
