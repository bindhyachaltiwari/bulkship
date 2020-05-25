import React, { Component } from 'react';
import axios from 'axios';
import DisplaySelectedVesselDetails from './DisplaySelectedVesselDetails';
import DisplaySelectedVesselPerformance from './DisplaySelectedVesselPerformance';
import ShowDropDownClient from './ShowDropDownClient';

class ClientHome extends Component {

  constructor(props) {
    super(props);
    this.getAllVessels();
    this.handleVesselListChange = this.handleVesselListChange.bind(this);
    this.handleShowPerformancePage = this.handleShowPerformancePage.bind(this);
    this.handleCpDateChange = this.handleCpDateChange.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.state = {
      vesselList: [],
      selectedVessel: 'SelectVessel',
      selectedCpDate: 'SelectCpDate',
      allCpDates: [],
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
      performanceDetails: {},
      isPeformancePage: false,
      error: false,
      userName: '',
    }

  }

  getAllVessels = async () => {
    await axios.post('http://localhost:3003/vesselDetails/getAllVessels', {
      headers: { 'Content-Type': 'application/json' },
      data: {
        'userName': this.props.userName,
      }
    }).then(res => {
      if (res.data.status) {
        this.setState({
          vesselList: res.data.vesselList,
          error: false,
        });
        this.setState({ userName: this.props.userName });
      } else {
        this.setState({ error: true });
        return;
      }
    });
  }

  handleCpDateChange = e => {
    const { vesselList, selectedVessel } = this.state;
    let vesselDetails = vesselList.find(m => m.vesselName === selectedVessel && m.cpDate === e.value);
    vesselDetails = (({ chartererName, vesselName, vesselSize, cpDate, loadPort, cargo, cargoIntake, ownerName }) => (
      { chartererName, vesselName, vesselSize, cpDate, loadPort, cargo, cargoIntake, ownerName }))(vesselDetails);
    this.setState({
      vesselDetails: vesselDetails,
      selectedCpDate: e.value,
      isPeformancePage: false
    });
  };

  handleVesselListChange = async e => {
    const { selectedVessel, vesselList } = this.state;
    if (e.value === selectedVessel) {
      return;
    }

    if (e.value !== selectedVessel) {
      this.setState({ selectedCpDate: 'SelectCpDate' });
    }

    const allCpDates = vesselList.filter(f => f.vesselName === e.value).map(m => m.cpDate);
    if (!allCpDates.length || (allCpDates.length === 1 && allCpDates[0] === '')) {
      this.setState({
        allCpDates: [],
        selectedVessel: e.value,
        selectedCpDate: 'SelectCpDate',
        isPeformancePage: false,
        error: true
      });
      return;
    }

    this.setState({
      allCpDates: allCpDates,
      selectedVessel: e.value,
      selectedCpDate: 'SelectCpDate',
      isPeformancePage: false,
      error: false
    });
  }

  handleShowPerformancePage = async e => {
    this.setState({
      
      isPeformancePage: true,
      error: false
    });
    // const { selectedVessel, selectedCpDate, userName } = this.state;
    // await axios.post('http://localhost:3003/performanceDetails/getPerformanceDetails', {
    //   headers: { 'Content-Type': 'application/json' },
    //   data: {
    //     'userName': userName,
    //     'cpDate': selectedCpDate,
    //     'vessel': selectedVessel
    //   }
    // }).then(res => {
    //   if (res.data.status) {
    //     this.setState({
    //       performanceDetails: res.data.performanceDetails,
    //       error: false,
    //       isPeformancePage: true,
    //     });
    //   } else {
    //     this.setState({ error: true });
    //     return;
    //   }
    // });
  }

  handleBackButton = () => {
    // alert('back button clicked');
  }

  render() {
    const { isPeformancePage, error, vesselList, allCpDates, selectedCpDate, selectedVessel, userName, performanceDetails, vesselDetails } = this.state;
    let displayDetails = '';
    let dropDown = '';
    let msg = '';
    const uniqueVessel = [...new Set(vesselList.map(m => m.vesselName))];
    if (vesselList.length) {
      if (isPeformancePage && performanceDetails) {
        displayDetails =
          <DisplaySelectedVesselPerformance
            handleBackButton={this.handleBackButton}
            performanceDetails={performanceDetails} />
      } else {
        if (selectedCpDate !== 'SelectCpDate') {
          dropDown =
            <ShowDropDownClient
              uniqueVessel={uniqueVessel}
              selectedCpDate={selectedCpDate}
              selectedVessel={selectedVessel}
              allCpDates={allCpDates}
              handleVesselListChange={this.handleVesselListChange}
              handleCpDateChange={this.handleCpDateChange} />;
          displayDetails =
            <DisplaySelectedVesselDetails
              handleShowPerformancePage={this.handleShowPerformancePage}
              vesselDetails={vesselDetails} />;
          msg = '';
        } else if (error) {
          dropDown =
            <ShowDropDownClient
              uniqueVessel={uniqueVessel}
              selectedCpDate={selectedCpDate}
              selectedVessel={selectedVessel}
              allCpDates={allCpDates}
              handleVesselListChange={this.handleVesselListChange}
              handleCpDateChange={this.handleCpDateChange} />;
          displayDetails = ''
          msg = <div> No Details for this Vessel</div>
        } else {
          dropDown =
            <ShowDropDownClient
              uniqueVessel={uniqueVessel}
              selectedCpDate={selectedCpDate}
              selectedVessel={selectedVessel}
              allCpDates={allCpDates}
              handleVesselListChange={this.handleVesselListChange}
              handleCpDateChange={this.handleCpDateChange} />
          displayDetails = '';
          msg = <div> Select details from the drop downs</div>
        }
      }
    } else {
      dropDown = '';
      displayDetails = '';
      msg = <div> There are no business details for you</div>
    }

    return (
      <div style={{ display: 'inline-grid', marginBottom: '38.7%' }}>
        <h2> Welcome Mr. {this.capitalize(this.props.userName)}</h2>
        {dropDown}
        {displayDetails}
        {msg}
      </div>
    );
  }

  capitalize = s => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}

export default ClientHome;