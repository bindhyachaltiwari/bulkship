import React, { Component } from 'react';
import { connect } from 'react-redux';
import Alert from '../../utils/alert';
import './style.scss';
import UserTable from './userTable';
import PieCharts from './PieCharts';
import api from '../../api';

class Client extends Component {

  constructor(props) {
    super(props);
    this.getAllVoyage();
    this.clientDisplay = props.detail.clientDisplay;
    this.toSendVesselList = [];
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
    }
  }

  getAllVoyage = async () => {
    const { detail } = this.props;
    let voyage, performance, documents = false;
    await api.getAllVoyage({ 'companyName': detail.companyName }).then(res => {
      if (res.data.status) {
        this.toSendVesselList = res.data.vesselList;
        if (detail.clientDisplay.length) {
          detail.clientDisplay.indexOf('View Documents') >= 0 ? documents = true : documents = false;
          detail.clientDisplay.indexOf('View Performance') >= 0 ? performance = true : performance = false;
          detail.clientDisplay.indexOf('View Voyage Details') >= 0 ? voyage = true : voyage = false;
          for (var i = 0; i < res.data.vesselList.length; i++) {
            if (documents) {
              res.data.vesselList[i].viewDocuments = <button style={{ color: 'blue', textAlign: 'center' }} type='button' id={res.data.vesselList[i]._id} onClick={this.handleViewDocuments}>View</button>;
            }
            if (performance) {
              res.data.vesselList[i].vesselPerformance = <button style={{ color: 'blue', textAlign: 'center' }} type='button' id={res.data.vesselList[i]._id} onClick={this.handleVesselPerformance}>View</button>;
            }
            if (voyage) {
              res.data.vesselList[i].voyageDetails = <button style={{ color: 'blue', textAlign: 'center' }} type='button' id={res.data.vesselList[i]._id} onClick={this.handleVoyageDetails}>View</button>;;
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
      pathname: '/voyage',
      state: {
        detail: {
          'shipper': c.shipper,
          'bunkerSupplier': c.bunkerSupplier,
          'bunkerTrader': c.bunkerTrader,
          'cargo': c.cargo,
          'cargoIntake': c.cargoIntake,
          'chartererName': c.chartererName,
          'cpDate': c.cpDate,
          'dischargePort': c.dischargePort,
          'loadPort': c.loadPort,
          'loadPortAgent': c.loadPortAgent,
          'dischargePortAgent': c.dischargePortAgent,
          'offHireSurveyor': c.offHireSurveyor,
          'receiver': c.receiver,
          'ownerName': c.ownerName,
          'onHireSurveyor': c.onHireSurveyor,
          'vesselSize': c.vesselSize,
          'weatherRoutingCompany': c.weatherRoutingCompany,
          'tableData': { id: 0 },
          'vId': c.vId,
          'vesselName': c.vesselName,
          'pniInsurance': c.pniInsurance
        },
        fieldVisibility: c.fieldVisibility
      }
    });
  }

  handleVesselPerformance = e => {
    const { vesselList } = this.state;
    const c = vesselList.find(m => m['_id'] === e.target.id);
    this.props.history.push({
      pathname: '/performance',
      state: {
        detail: c.chartererName,
        loadPort: c.loadPort,
        cpDate: c.cpDate,
        dischargePort: c.dischargePort,
        vesselName: c.vesselName
      }
    });
  }

  handleViewDocuments = e => {
    this.props.history.push({
      pathname: '/viewDocuments'
    });
  }

  render() {
    const columns = [{ field: 'vesselName', title: 'Vessel Name', editable: 'never' },
    { field: 'cpDate', title: 'CP Date', editable: 'never' },
    { field: 'voyageDetails', title: 'View Voyage', check: 'View Voyage Details', editable: 'never' },
    { field: 'vesselPerformance', title: 'View Performance', check: 'View Performance', editable: 'never' },
    { field: 'viewDocuments', title: 'View Documents', check: 'View Documents', editable: 'never' }
    ];
    const { detail } = this.props;
    var index = columns.length;
    while (index--) {
      if (columns[index].check && !detail.clientDisplay.includes(columns[index].check)) {
        columns.splice(index, 1);
      }
    }

    const { vesselList } = this.state;
    const ourCount = {};
    let previousYearDate = new Date();
    const pastYear = previousYearDate.getFullYear() - 1;
    previousYearDate.setFullYear(pastYear);
    vesselList.forEach(v => {
      if (!ourCount[v.cargo]) {
        ourCount[v.cargo] = 0;
      }
      if (new Date(v.cpDate).getTime() <= new Date().getTime() && new Date(v.cpDate).getTime() > previousYearDate.getTime()) {
        ourCount[v.cargo] += parseInt(v.cargoIntake);
      }
    });
    return (
      <form>
        <UserTable title={'Fixture List'} data={vesselList} columns={columns} />
        <PieCharts vesselDetails={ourCount} />
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
