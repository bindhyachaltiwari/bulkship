import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import UserTable from './userTable';
import PieCharts from './PieCharts';
import api from '../../api';
import ScrollableTabsButtonAuto from '../sub-component/ScrollableTabsButtonAuto';

class Client extends Component {

  constructor(props) {
    super(props);
    this.getAllVoyage();
    this.clientDisplay = props.detail.clientDisplay;
    this.toSendVesselList = [];
    this.columns = [];
    this.leftValue = 0;
    this.state = {
      vesselList: [],
      voyageDetails: [],
      tableData: [],
      performanceDetails: {},
      showDetails: false,
      hoveredVessel: []
    }
  }

  getAllVoyage = async () => {
    const { detail } = this.props;
    let voyage, performance, documents, comp, isAdminPage;
    if (this.props.history.location.pathname === '/clientDetails') {
      voyage = performance = documents = isAdminPage = true;
      comp = this.props.history.location.state.companyName;
    } else {
      voyage = performance = documents = isAdminPage = false;
      comp = detail.companyName;
    }
    const res = await api.getAllVoyage({ 'companyName': comp });
    if (res.data.status) {
      this.columns = [{ field: 'vesselNameEdited', title: 'Vessel Name', editable: 'never' },
      { field: 'cpDate', title: 'CP Date', editable: 'never' },
      ];
      this.toSendVesselList = JSON.parse(JSON.stringify(res.data.vesselList));
      if (detail.clientDisplay.length || isAdminPage) {
        if (detail.clientDisplay.length) {
          detail.clientDisplay.indexOf('View Documents') >= 0 ? documents = true : documents = false;
          detail.clientDisplay.indexOf('View Performance') >= 0 ? performance = true : performance = false;
          detail.clientDisplay.indexOf('View Voyage Details') >= 0 ? voyage = true : voyage = false;
        }
        for (var i = 0; i < this.toSendVesselList.length; i++) {
          this.toSendVesselList[i].vesselNameEdited = <span style={{ color: '#1e4356', textAlign: 'center' }} onClick={this.handleClickState} onMouseEnter={this.handleHoverState} onMouseLeave={this.handleHoverStateLeave} id={i}>{this.toSendVesselList[i].vesselName}</span>
          if (documents) {
            if (!this.columns.some(s => s.field === 'viewDocuments')) {
              this.columns.push({ field: 'viewDocuments', title: 'View Documents', editable: 'never' });
            }
            this.toSendVesselList[i].viewDocuments = <button style={{ backgroundColor: '#1e4356', color: 'white', textAlign: 'center' }} type='button' id={this.toSendVesselList[i]._id} onClick={this.handleViewDocuments}>View</button>;
          }
          if (performance) {
            if (!this.columns.some(s => s.field === 'vesselPerformance')) {
              this.columns.push({ field: 'vesselPerformance', title: 'View Performance', editable: 'never' });
            }
            this.toSendVesselList[i].vesselPerformance = <button style={{ backgroundColor: '#1e4356', color: 'white', textAlign: 'center' }} type='button' id={this.toSendVesselList[i]._id} onClick={this.handleVesselPerformance}>View</button>;
          }
          if (voyage) {
            if (!this.columns.some(s => s.field === 'voyageDetails')) {
              this.columns.push({ field: 'voyageDetails', title: 'View Voyage', editable: 'never' });
            }
            this.toSendVesselList[i].voyageDetails = <button style={{ backgroundColor: '#1e4356', color: 'white', textAlign: 'center' }} type='button' id={this.toSendVesselList[i]._id} onClick={this.handleVoyageDetails}>View</button>;;
          }
        }
      }
      this.setState({
        vesselList: res.data.vesselList,
        companyName: comp,
      });
    } else {
      this.setState({ companyName: comp });
      return;
    }
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
    const c = vesselList.filter(m => m['_id'] === e.target.id);
    this.props.history.push({
      pathname: '/voyageDetails',
      state: { result: c }
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
    const id = e.target.id;
    this.props.history.push({
      pathname: '/voyageDocuments',
      state: { voyageId: id }
    });
  }

  handleHoverState = async e => {
    const targetValue = e.target.textContent.split('_')[0];
    const index = parseInt(e.target.id + '0') + 30;
    this.leftValue = index + '%';
    await api.getAllVesselsDetails().then(res => {
      if (res.data.status) {
        const result = res.data.vesselList.filter(item => item.vesselName === targetValue);
        this.setState({
          showDetails: true,
          hoveredVessel: result
        })
      }
    });
  }
  handleHoverStateLeave = e => {
    this.setState({
      showDetails: false,
    })
  }

  handleClickState = async e => {
    const { hoveredVessel } = this.state;
    if (!hoveredVessel.length) {
      return;
    }
    this.props.history.push({
      pathname: '/vesselDetails',
      state: {
        result: hoveredVessel
      }
    });
  }

  handleIconDetail = (event, value) => {
    if (value === 1) {
      this.props.history.goBack();
      return;
    }
  };

  getTabData = () => {
    const tabs = {
      tabsLabel: [{
        label: <span className='labelColor'>FIXTURE LIST</span>
      }, {
        label: <span className='labelColor'>BACK</span>
      }],
      tabPanelChild: [{
        child: this.getTemplate()
      },
      {}]
    }

    return tabs;
  }

  getTemplate = () => {
    const { vesselList, showDetails, hoveredVessel } = this.state;
    const ourCount = {};
    let previousYearDate = new Date();
    const pastYear = previousYearDate.getFullYear() - 1;
    previousYearDate.setFullYear(pastYear);
    let sum = 0;
    vesselList.forEach(v => {
      if (v.cargo) {
        if (!ourCount[v.cargo]) {
          ourCount[v.cargo] = 0;
        }
        if (new Date(v.cpDate).getTime() <= new Date().getTime() && new Date(v.cpDate).getTime() > previousYearDate.getTime()) {
          ourCount[v.cargo] += parseFloat(v.cargoIntake);
          sum += parseFloat(v.cargoIntake);
        }
      }
    });

    return <div className="float-container1">
      <div className="float-child1">
        <UserTable title={'DASHBOARD'} data={this.toSendVesselList} columns={this.columns} history={this.props.history} />
        {showDetails ?
          (<div className='absolute-position' style={{ top: this.leftValue }}>
            {hoveredVessel.length ?
              hoveredVessel.map((item, i) =>
                <table className='tableListTable' key={i}>
                  <tbody key='list'>
                    <tr><td className='tdList'>Vessel Name</td><td className='tdList'>{item.vesselName}</td></tr>
                    <tr><td className='tdList'>DWT </td><td className='tdList'>{item.DWT}</td></tr>
                    <tr><td className='tdList'>Built Year</td><td className='tdList'>{item.built}</td></tr>
                    <tr><td className='tdList'>Draft</td><td className='tdList'>{item.draft}</td></tr>
                    <tr><td className='tdList'>GRT</td><td className='tdList'>{item.GRT}</td></tr>
                    <tr><td className='tdList'>NRT</td><td className='tdList'>{item.NRT}</td></tr>
                    <tr><td className='tdList'>Cranes</td><td className='tdList'>{item.cranes}</td></tr>
                    <tr><td className='tdList'>Grabs</td><td className='tdList'>{item.grabs}</td></tr>
                  </tbody>
                </table>
              ) : <p key='dwt'>Vessel details have been deleted. Please contact admin for more details...</p>}
          </div>) : ''
        }
      </div>
      <div className="float-child2">
        {ourCount && Object.keys(ourCount).length ? <PieCharts vesselDetails={ourCount} role={this.props.detail.role} /> : ''}
        <p style={{ paddingLeft: '110px', textAlign: 'left', marginTop: '5%' }}>Total Volume = {sum} MT</p>
      </div>
    </div>
  }

  render() {
    const role = this.props.detail.role;
    const { localClickedtTab } = this.state;
    return (
      <>
        {role === 'Client' ? this.getTemplate() :
          <div className='my-profile'>
            <ScrollableTabsButtonAuto paper={true} tabs={this.getTabData()} onChange={this.handleIconDetail} TabIndicatorProps={{ style: { background: '#e37933' } }} newTabVal={localClickedtTab} />
          </div>
        }
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { ui, detail } = state;
  return {
    ui,
    detail
  };
}

export default connect(mapStateToProps, null)(Client);
