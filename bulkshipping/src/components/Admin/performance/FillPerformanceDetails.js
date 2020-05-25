import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ShowDropDownAdmin from '../common/ShowDropDownAdmin';
import FormHelperText from '@material-ui/core/FormHelperText'
import '../../../css/Admin.css';
import api from '../../api';
import PerformanceModule from './PerformanceModule';

class FillPerformanceDetails extends Component {
  localState = {
      isEditPage: false,
      isEditContinue:true
  }
  constructor(props) {
    super(props);
    if (props && props.history && props.history.location.pathname === '/editPerformanceDetails') {
        this.localState.isEditPage = true;
    }
    this.handleVesselListChange = this.handleVesselListChange.bind(this);
    this.handleClientListChange = this.handleClientListChange.bind(this);
    this.handleCpDateChange = this.handleCpDateChange.bind(this);
    this.handlePerformanceDetailSubmit = this.handlePerformanceDetailSubmit.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.tcHireChange = this.tcHireChange.bind(this);
    this.addressCommissionChange = this.addressCommissionChange.bind(this);
    this.onVoyageDaysChange = this.onVoyageDaysChange.bind(this);
    this.onLoadPortDelayChange = this.onLoadPortDelayChange.bind(this);
    this.onDischargePortDelayChange = this.onDischargePortDelayChange.bind(this);
    this.onIntermediatePortDelayChange = this.onIntermediatePortDelayChange.bind(this);
    this.handleIFOchange = this.handleIFOChange.bind(this);
    this.handleMDOChange = this.handleMDOChange.bind(this);
    this.getTotalOrg = this.getTotalOrg.bind(this);
    this.getTotalAct = this.getTotalAct.bind(this);

    this.state = {
      vesselList: [],
      selectedClient: '',
      selectedVessel: '',
      selectedCpDate: '',
      allClients: [],
      allVslForSelectedClient: [],
      allCpDatesForSelectedClient: [],
      error: false,
      performanceDetails: {
        tcHire: 0,
        addressCommission: 0,
      },
    }
  }

  tcHireChange(e) {
    //if (e.target.value && parseFloat(e.target.value) >= 0) {
      const value = e.target.value ? e.target.value : 0;
      const { performanceDetails } = this.state;
      Object.assign(performanceDetails, { tcHire: parseFloat(value) });
      const totalOrg = this.getTotalOrg(performanceDetails);
      const totalAct = this.getTotalAct(performanceDetails);
      Object.assign(performanceDetails, { totalAct, totalOrg });
      if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
        const freightOrg = parseFloat(totalOrg / performanceDetails.CargoQuantityOrg);
        Object.assign(performanceDetails, { freightOrg });
      }

      if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
        const freightAct = parseFloat(totalAct / performanceDetails.CargoQuantityAct);
        Object.assign(performanceDetails, { freightAct });
      }
      this.setState({ performanceDetails });
    //}
  }

  addressCommissionChange(e) {
    //if (e.target.value && parseFloat(e.target.value) >= 0) {
      const value = e.target.value ? e.target.value : 0;
      const { performanceDetails } = this.state;
      Object.assign(performanceDetails, { addressCommission: parseFloat(value) });
      const totalOrg = this.getTotalOrg(performanceDetails);
      const totalAct = this.getTotalAct(performanceDetails);
      Object.assign(performanceDetails, { totalAct, totalOrg });
      if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
        const freightOrg = parseFloat(totalOrg / performanceDetails.CargoQuantityOrg);
        Object.assign(performanceDetails, { freightOrg });
      }

      if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
        const freightAct = parseFloat(totalAct / performanceDetails.CargoQuantityAct);
        Object.assign(performanceDetails, { freightAct });
      }
      this.setState({ performanceDetails });
    //}
  }

  handlePerformanceDetailsChange = e => {
    e.preventDefault();
    let { name, value } = e.target;
    const { performanceDetails } = this.state;
    value = value ? value : 0;
    //if (value && parseFloat(value) >= 0) {
      Object.assign(performanceDetails, { [name]: parseFloat(value) });
      const totalOrg = this.getTotalOrg(performanceDetails);
      const totalAct = this.getTotalAct(performanceDetails);
      Object.assign(performanceDetails, { totalAct, totalOrg });
      if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
        const freightOrg = parseFloat(totalOrg / performanceDetails.CargoQuantityOrg);
        Object.assign(performanceDetails, { freightOrg });
      }

      if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
        const freightAct = parseFloat(totalAct / performanceDetails.CargoQuantityAct);
        Object.assign(performanceDetails, { freightAct });
      }
      this.setState({ performanceDetails });
    //}  
    if (name === 'remarks') {
      Object.assign(performanceDetails, { [name]: value });
    }
  }

  async componentDidMount() {
    let res = {};
    if(this.localState.isEditPage) {
      res = await api.getAllVesselsPerformance({ isDetailsFilled: true });
     }
     else {
      res = await api.getAllVesselsPerformance({ isDetailsFilled: false });
     }
    if (res.data.status) {
      const allClients = [...new Set(res.data.vesselList.map(m => m.chartererName))];
      this.setState({
        vesselList: res.data.vesselList,
        allClients,
        error: false,
      });
    } else {
      this.setState({ error: true, errorMsg: 'Failed to fetch data' });
    }
    // if (this.localState.isEditPage) {
    //   const res = await api.getAllVesselsPerformance();
    //   if (res.data.status) {

    //   }
    // }
    
  }

  handleCpDateChange = async e => {
    const { vesselList, selectedVessel, selectedClient, selectedCpDate } = this.state;
    if (selectedCpDate && e.value === selectedCpDate) return;
    let vesselDetails = vesselList.find(m => m.vesselName === selectedVessel && m.cpDate === e.value);
    this.resetForm();
    const res = await api.getPortDetails({ userName: selectedClient, vesselName: selectedVessel, cpDate: e.value });
    if (res.data.status) {
      this.setState({
        portDetails: res.data.portDetails,
        vesselDetails,
        selectedCpDate: e.value,
        error: false,
        performanceDetails: {}
      });
    } else {
      this.setState({ error: true, errorMsg: 'Failed to fetch data' });
    }

    if (this.localState.isEditPage && this.state.selectedClient && this.state.selectedVessel && this.state.selectedCpDate) {
      const response = await api.getPerformanceDetails({ cpDate: this.state.selectedCpDate, vesselName: this.state.selectedVessel, chartererName: this.state.selectedClient });
      if (response.data.status) {
        this.localState.isEditContinue = false;
        this.setState({
          performanceDetails: response.data.performanceDetails
        })
      }
    }
  };

  handleVesselListChange = async e => {
    const { selectedVessel, vesselList, selectedClient } = this.state;
    if (selectedVessel && e.value === selectedVessel) return;
    const allCpDates = vesselList.filter(f => f.vesselName === e.value && f.chartererName === selectedClient).map(m => m.cpDate);
    if (!allCpDates.length || (allCpDates.length === 1 && allCpDates[0] === '')) {
      this.setState({
        allCpDatesForSelectedClient: [],
        selectedVessel: e.value,
        selectedCpDate: '',
        error: true,
        errorMsg: 'Failed to fetch data'
      });
      return;
    }
    this.resetForm();
    this.setState({
      allCpDatesForSelectedClient: allCpDates,
      selectedVessel: e.value,
      selectedCpDate: '',
      error: false,
      performanceDetails: {}
    });
  }

  handleClientListChange = e => {
    const { selectedClient, vesselList } = this.state;
    if (selectedClient && e.value === selectedClient) return;
    const allVessels = [...new Set(vesselList.filter(m => m.chartererName === e.value).map(m => m.vesselName))];
    if (!allVessels.length || (allVessels.length === 1 && allVessels[0] === '')) {
      this.setState({
        allVslForSelectedClient: [],
        selectedClient: e.value,
        selectedVessel: '',
        selectedCpDate: '',
        error: true,
        errorMsg: 'Failed to fetch data'
      });
      return;
    }
    this.resetForm();
    this.setState({
      allVslForSelectedClient: allVessels,
      selectedClient: e.value,
      selectedVessel: '',
      selectedCpDate: '',
      error: false,
      performanceDetails: {}
    });
  }

  handleBackButton() {
    this.props.history.goBack();
  }

  async handlePerformanceDetailSubmit(event) {
    event.preventDefault();
    const { selectedClient, selectedVessel, selectedCpDate, vesselList } = this.state;
    const vessel = vesselList.find(f => f.chartererName === selectedClient && f.vesselName === selectedVessel && f.cpDate === selectedCpDate)
    const vId = vessel ? vessel['_id'] : '';
    let data = await api.fillPerformanceDetails({ ...this.state.performanceDetails, vId });
    if (data.data.status.errors || data.data.status.errorMsg) {
      this.setState({
        error: false,
        errorMsg: data.data.status.errorMsg
      });
      return;
    } else {
      this.resetForm();
      this.setState({
        performanceDetails: {},
        error: true,
        errorMsg: 'Success!! Performance Details saved for = ' + this.state.selectedClient
      });
      return;
    }
  }

  onVoyageDaysChange(obj) {
    const { performanceDetails } = this.state;
    if (!performanceDetails.voyageDays) {
      performanceDetails.voyageDays = {};
    }
    //if(this.localState.isEditContinue) {
      Object.assign(performanceDetails.voyageDays, { ...obj });
      const totalOrg = this.getTotalOrg(performanceDetails);
      const totalAct = this.getTotalAct(performanceDetails);
      Object.assign(performanceDetails, { totalAct, totalOrg });
      if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
        const freightOrg = parseFloat(totalOrg / performanceDetails.CargoQuantityOrg);
        Object.assign(performanceDetails, { freightOrg });
      }

      if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
        const freightAct = parseFloat(totalAct / performanceDetails.CargoQuantityAct);
        Object.assign(performanceDetails, { freightAct });
      }
      this.setState({ performanceDetails });
    //}
    
  }

  onLoadPortDelayChange(obj) {
    const { performanceDetails } = this.state;
    if (!performanceDetails.loadPortDelay) {
      performanceDetails.loadPortDelay = {};
    }
    //if(this.localState.isEditContinue) {
      Object.assign(performanceDetails.loadPortDelay, { ...obj });
      const totalOrg = this.getTotalOrg(performanceDetails);
      const totalAct = this.getTotalAct(performanceDetails);
      Object.assign(performanceDetails, { totalAct, totalOrg });
      if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
        const freightOrg = parseFloat(totalOrg / performanceDetails.CargoQuantityOrg);
        Object.assign(performanceDetails, { freightOrg });
      }

      if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
        const freightAct = parseFloat(totalAct / performanceDetails.CargoQuantityAct);
        Object.assign(performanceDetails, { freightAct });
      }
      this.setState({ performanceDetails });
    //}
  }

  onDischargePortDelayChange(obj) {
    const { performanceDetails } = this.state;
    if (!performanceDetails.dischargePortDelay) {
      performanceDetails.dischargePortDelay = {};
    }
    //if(this.localState.isEditContinue) {
      Object.assign(performanceDetails.dischargePortDelay, { ...obj });
      const totalOrg = this.getTotalOrg(performanceDetails);
      const totalAct = this.getTotalAct(performanceDetails);
      Object.assign(performanceDetails, { totalAct, totalOrg });
      if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
        const freightOrg = parseFloat(totalOrg / performanceDetails.CargoQuantityOrg);
        Object.assign(performanceDetails, { freightOrg });
      }

      if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
        const freightAct = parseFloat(totalAct / performanceDetails.CargoQuantityAct);
        Object.assign(performanceDetails, { freightAct });
      }
      this.setState({ performanceDetails });
    //}
  }

  handleIFOChange(e) {
    const { performanceDetails } = this.state;
    const { name, value } = e.target;
    //if (value && parseFloat(value) >= 0) {
      const fValue = value ? value : 0
      const str = name.split('IFO');
      if (str && str.length >= 2 && str[1] === 'Act') {
        if (!performanceDetails.bunkerIFOAct) {
          performanceDetails.bunkerIFOAct = {};
        }
        Object.assign(performanceDetails.bunkerIFOAct, { [str[0]]: parseFloat(fValue) });
        const { consumption, price } = performanceDetails.bunkerIFOAct;
        if (parseFloat(consumption) >= 0 && parseFloat(price) >= 0) {
          Object.assign(performanceDetails.bunkerIFOAct, { bunkerIFOAct$: (consumption * price) });
        }
      } else {
        if (!performanceDetails.bunkerIFOOrg) {
          performanceDetails.bunkerIFOOrg = {};
        }
        Object.assign(performanceDetails.bunkerIFOOrg, { [str[0]]: parseFloat(fValue) });
        const { consumption, price } = performanceDetails.bunkerIFOOrg;
        if (parseFloat(consumption) >= 0 && parseFloat(price) >= 0) {
          Object.assign(performanceDetails.bunkerIFOOrg, { bunkerIFOOrg$: (consumption * price) });
        }
      }
      const totalOrg = this.getTotalOrg(performanceDetails);
      const totalAct = this.getTotalAct(performanceDetails);
      Object.assign(performanceDetails, { totalAct, totalOrg });
      if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
        const freightOrg = parseFloat(totalOrg / performanceDetails.CargoQuantityOrg);
        Object.assign(performanceDetails, { freightOrg });
      }

      if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
        const freightAct = parseFloat(totalAct / performanceDetails.CargoQuantityAct);
        Object.assign(performanceDetails, { freightAct });
      }
      this.setState({ performanceDetails });
    //} 
  }

  handleMDOChange(e) {
    const { performanceDetails } = this.state;
    const { name, value } = e.target;
   // if (value && parseFloat(value) >= 0) {
    const fValue = value ? value : 0
      const str = name.split('MDO');
      if (str && str.length >= 2 && str[1] === 'Act') {
        if (!performanceDetails.bunkerMDOAct) {
          performanceDetails.bunkerMDOAct = {};
        }
        Object.assign(performanceDetails.bunkerMDOAct, { [str[0]]: parseFloat(fValue) });
        const { consumption, price } = performanceDetails.bunkerMDOAct;
        if (parseFloat(consumption) >= 0 && parseFloat(price) >= 0) {
          Object.assign(performanceDetails.bunkerMDOAct, { bunkerMDOAct$: (consumption * price) });
        }
      } else {
        if (!performanceDetails.bunkerMDOOrg) {
          performanceDetails.bunkerMDOOrg = {};
        }
        Object.assign(performanceDetails.bunkerMDOOrg, { [str[0]]: parseFloat(fValue) });
        const { consumption, price } = performanceDetails.bunkerMDOOrg;
        if (parseFloat(consumption) >= 0 && parseFloat(price) >= 0) {
          Object.assign(performanceDetails.bunkerMDOOrg, { bunkerMDOOrg$: (consumption * price) });
        }
      }
      const totalOrg = this.getTotalOrg(performanceDetails);
      const totalAct = this.getTotalAct(performanceDetails);
      Object.assign(performanceDetails, { totalAct, totalOrg });
      if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
        const freightOrg = parseFloat(totalOrg / performanceDetails.CargoQuantityOrg);
        Object.assign(performanceDetails, { freightOrg });
      }

      if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
        const freightAct = parseFloat(totalAct / performanceDetails.CargoQuantityAct);
        Object.assign(performanceDetails, { freightAct });
      }

      this.setState({ performanceDetails });
    //}
  }

  onIntermediatePortDelayChange(obj) {
    const { performanceDetails } = this.state;
    if (!performanceDetails.intermediatePortDelay) {
      performanceDetails.intermediatePortDelay = {};
    }
    Object.assign(performanceDetails.intermediatePortDelay, { ...obj });
    const totalOrg = this.getTotalOrg(performanceDetails);
    const totalAct = this.getTotalAct(performanceDetails);
    Object.assign(performanceDetails, { totalAct, totalOrg });
    this.setState({ performanceDetails });
  }

  getTotalOrg(performanceDetails) {
    const { voyageDays, intermediatePortDelay, dischargePortDelay, loadPortDelay, bunkerIFOOrg, bunkerMDOOrg } = performanceDetails;
    let total = 0;
    const keys = Object.keys(performanceDetails).filter(m => m.substr(m.length - 4) === 'Org$');
    if (keys && keys.length) {
      keys.forEach(e => {
        if (parseFloat(performanceDetails[e]) !== 'Nan') {
          total += performanceDetails[e]
        }
      });
    }
    if (voyageDays) {
      total += voyageDays.original$;
    }
    if (intermediatePortDelay) {
      total += intermediatePortDelay.original$;
    }
    if (dischargePortDelay) {
      total += dischargePortDelay.original$;
    }
    if (loadPortDelay) {
      total += loadPortDelay.original$;
    }
    if (bunkerIFOOrg && bunkerIFOOrg.bunkerIFOOrg$) {
      total += bunkerIFOOrg.bunkerIFOOrg$;
    }
    if (bunkerMDOOrg && bunkerMDOOrg.bunkerMDOOrg$) {
      total += bunkerMDOOrg.bunkerMDOOrg$;
    }

    return parseFloat(total);
  }

  getTotalAct(performanceDetails) {
    const { voyageDays, intermediatePortDelay, dischargePortDelay, loadPortDelay, bunkerIFOAct, bunkerMDOAct } = performanceDetails;
    let total = 0;
    const keys = Object.keys(performanceDetails).filter(m => m.substr(m.length - 4) === 'Act$');
    if (keys && keys.length) {
      keys.forEach(e => {
        if (parseFloat(performanceDetails[e]) !== 'Nan') {
          total += performanceDetails[e]
        }
      });
    }
    if (voyageDays) {
      total += voyageDays.actual$;
    }
    if (intermediatePortDelay) {
      total += intermediatePortDelay.actual$;
    }
    if (dischargePortDelay) {
      total += dischargePortDelay.actual$;
    }
    if (loadPortDelay) {
      total += loadPortDelay.actual$;
    }
    if (bunkerIFOAct && bunkerIFOAct.bunkerIFOAct$) {
      total += bunkerIFOAct.bunkerIFOAct$;
    }
    if (bunkerMDOAct && bunkerMDOAct.bunkerMDOAct$) {
      total += bunkerMDOAct.bunkerMDOAct$;
    }
    return parseFloat(total);
  }

  resetForm() {
    if (!document.getElementById('performanceDetailsForm')) {
      return;
    }
    document.getElementById('performanceDetailsForm').reset();
    document.getElementById('portDetailsForm').reset();
  }

  render() {
    const { selectedCpDate, error, portDetails, performanceDetails } = this.state;
    const { tcHire, addressCommission, bunkerMDOAct, bunkerIFOOrg, bunkerIFOAct, bunkerMDOOrg, totalAct, totalOrg, freightOrg, freightAct,voyageDays,loadPortDelay,
      dischargePortDelay,intermediatePortDelay,loadPortDAAct$,loadPortDAOrg$,dischargePortDAOrg$,dischargePortDAAct$,bunkerSurveyCostBendsOrg$,bunkerSurveyCostBendsAct$,ILOHCandCVEAct$,
      ILOHCandCVEOrg$,wXRoutingExpenseOrg$,wXRoutingExpenseAct$,despatchPaidAct$,despatchPaidOrg$,PNIInsuranceAct$,PNIInsuranceOrg$,demmurrageReceivedAct$,demmurrageReceivedOrg$,
      otherExpenseAct$,otherExpenseOrg$,HraWarRiskAct,HraWarRiskOrg$,remarks,CargoQuantityAct,CargoQuantityOrg } = performanceDetails;
    let showTable;
    if (selectedCpDate) {
      showTable = <div>
        <form id='portDetailsForm' onSubmit={this.handlePerformanceDetailSubmit} style={{ margin: '1%' }}>
          <table>
            <tbody>
              <tr>
                <td>
                  <label>
                    Load Port
                </label>
                </td>
                <td>
                  <input type='text' disabled name='loadPort' value={portDetails.loadPort || 0} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Discharge Port
                </label>
                </td>
                <td>
                  <input type='text' disabled name='dischargePort' value={portDetails.dischargePort || 0} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    TC Hire (Per day) *
                </label>
                </td>
                <td>
                  <input type='text' name='tcHire' required onChange={this.tcHireChange} autoComplete='off' value={tcHire || 0}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Address Commission *
                </label>
                </td>
                <td>
                  <input type='text' name='addressCommission' required onChange={this.addressCommissionChange} autoComplete='off' value = {addressCommission || 0}/>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <br />
        <form id='performanceDetailsForm' onSubmit={this.handlePerformanceDetailSubmit} style={{ margin: '1%' }}>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Original</th>
                <th>Actual</th>
                <th>Original ($)</th>
                <th>Actual ($)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label>
                    Voyage Days*
                  </label>
                </td>
                <PerformanceModule voyageDays ={voyageDays} required={true} tcHire={tcHire} addressCommission={addressCommission} onOriginalActualChange={this.onVoyageDaysChange} />
              </tr>
              <tr>
                <td>
                  <label>
                    Delays at Port
                </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Load Port Delay
                </label>
                </td>
                <PerformanceModule voyageDays ={loadPortDelay} required={false} tcHire={tcHire} addressCommission={addressCommission} onOriginalActualChange={this.onLoadPortDelayChange} />
              </tr>
              <tr>
                <td>
                  <label>
                    Discharge Port Delay
                </label>
                </td>
                <PerformanceModule voyageDays= {dischargePortDelay} required={false} tcHire={tcHire} addressCommission={addressCommission} onOriginalActualChange={this.onDischargePortDelayChange} />
              </tr>
              <tr>
                <td>
                  <label>
                    Intermediate Port Delays
                </label>
                </td>
                <PerformanceModule voyageDays= {intermediatePortDelay} required={false} tcHire={tcHire} addressCommission={addressCommission} onOriginalActualChange={this.onIntermediatePortDelayChange} />
              </tr>
              <tr>
                <td>
                  <label>
                    Bunker Consumption (MT) *
              </label>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <label>
                    IFO
              </label>
                </td>
                <td>
                  <input type='text' name='consumptionIFOOrg' required onChange={this.handleIFOchange} autoComplete='off' value={bunkerIFOOrg ? bunkerIFOOrg.consumption : 0}/>
                </td>
                <td>
                  <input type='text' name='consumptionIFOAct' required onChange={this.handleIFOchange} autoComplete='off' value={bunkerIFOAct ? bunkerIFOAct.consumption:0}/>
                </td>
                <td>
                </td>
                <td>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    MDO
              </label>
                </td>
                <td>
                  <input type='text' name='consumptionMDOOrg' required onChange={this.handleMDOChange} autoComplete='off' value = {bunkerMDOOrg ? bunkerMDOOrg.consumption:0}/>
                </td>
                <td>
                  <input type='text' name='consumptionMDOAct' required onChange={this.handleMDOChange} autoComplete='off' value= {bunkerMDOAct ? bunkerMDOAct.consumption:0}/>
                </td>
                <td>
                </td>
                <td>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Bunker Price (USD) *
              </label>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>
                  <label>
                    IFO
              </label>
                </td>
                <td>
                  <input type='text' name='priceIFOOrg' required onChange={this.handleIFOchange} autoComplete='off' value ={bunkerIFOOrg ? bunkerIFOOrg.price : 0}/>
                </td>
                <td>
                  <input type='text' name='priceIFOAct' required onChange={this.handleIFOchange} autoComplete='off' value ={bunkerIFOAct ? bunkerIFOAct.price : 0}/>
                </td>
                <td>
                  <input type='text' disabled value={bunkerIFOOrg && bunkerIFOOrg.bunkerIFOOrg$ ? bunkerIFOOrg.bunkerIFOOrg$ : 0} />
                </td>
                <td>
                  <input type='text' disabled value={bunkerIFOAct && bunkerIFOAct.bunkerIFOAct$ ? bunkerIFOAct.bunkerIFOAct$ : 0} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    MDO
              </label>
                </td>
                <td>
                  <input type='text' name='priceMDOOrg' required onChange={this.handleMDOChange} autoComplete='off' value={bunkerMDOOrg ? bunkerMDOOrg.price : 0}/>
                </td>
                <td>
                  <input type='text' name='priceMDOAct' required onChange={this.handleMDOChange} autoComplete='off' value={bunkerMDOAct ? bunkerMDOAct.price:0}/>
                </td>
                <td>
                  <input type='text' disabled value={bunkerMDOOrg && bunkerMDOOrg.bunkerMDOOrg$ ? bunkerMDOOrg.bunkerMDOOrg$ : 0} />
                </td>
                <td>
                  <input type='text' disabled value={bunkerMDOAct && bunkerMDOAct.bunkerMDOAct$ ? bunkerMDOAct.bunkerMDOAct$ : 0} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Load Port DA *
              </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                  <input type='text' name='loadPortDAOrg$' required onChange={this.handlePerformanceDetailsChange} autoComplete='off' value = {loadPortDAOrg$ || 0}/>
                </td>
                <td>
                  <input type='text' name='loadPortDAAct$' required onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {loadPortDAAct$ || 0}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Discharge Port DA *
              </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                  <input type='text' name='dischargePortDAOrg$' required onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={dischargePortDAOrg$ || 0}/>
                </td>
                <td>
                  <input type='text' name='dischargePortDAAct$' required onChange={this.handlePerformanceDetailsChange} autoComplete='off' value = {dischargePortDAAct$ || 0}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    ILOHC and CVE
              </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                  <input type='text' name='ILOHCandCVEOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={ILOHCandCVEOrg$ || 0}/>
                </td>
                <td>
                  <input type='text' name='ILOHCandCVEAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {ILOHCandCVEAct$ || 0}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Bunker Survey Cost Bends
              </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                  <input type='text' name='bunkerSurveyCostBendsOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={bunkerSurveyCostBendsOrg$ || 0}/>
                </td>
                <td>
                  <input type='text' name='bunkerSurveyCostBendsAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {bunkerSurveyCostBendsAct$ || 0}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    WX Routing Expense
              </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                  <input type='text' name='wXRoutingExpenseOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {wXRoutingExpenseOrg$ || 0}/>
                </td>
                <td>
                  <input type='text' name='wXRoutingExpenseAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {wXRoutingExpenseAct$ || 0}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    PNI Insurance
              </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                  <input type='text' name='PNIInsuranceOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {PNIInsuranceOrg$ || 0}/>
                </td>
                <td>
                  <input type='text' name='PNIInsuranceAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {PNIInsuranceAct$ || 0}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Despatch Paid
              </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                  <input type='text' name='despatchPaidOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {despatchPaidOrg$ || 0}/>
                </td>
                <td>
                  <input type='text' name='despatchPaidAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {despatchPaidAct$ || 0}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Other Expense
              </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                  <input type='text' name='otherExpenseOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {otherExpenseOrg$ || 0}/>
                </td>
                <td>
                  <input type='text' name='otherExpenseAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value = {otherExpenseAct$ || 0}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    HRA/WAR Risk
              </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                  <input type='text' name='HraWarRiskOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={HraWarRiskOrg$ || 0}/>
                </td>
                <td>
                  <input type='text' name='HraWarRiskAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={HraWarRiskAct || 0}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Demmurrage Received
              </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                  <input type='text' name='demmurrageReceivedOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {demmurrageReceivedOrg$ || 0}/>
                </td>
                <td>
                  <input type='text' name='demmurrageReceivedAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {demmurrageReceivedAct$ || 0}/>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Cargo Quantity (MT)
              </label>
                </td>
                <td>
                  <input type='text' name='CargoQuantityOrg' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {CargoQuantityOrg || 0}/>
                </td>
                <td>
                  <input type='text' name='CargoQuantityAct' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {CargoQuantityAct || 0}/>
                </td>
                <td>
                </td>
                <td>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Total
              </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                  <input type='text' name='totalOrg' disabled value={totalOrg || 0} />
                </td>
                <td>
                  <input type='text' name='totalAct' disabled value={totalAct || 0} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Freight (USD/MT)
              </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                  <input type='text' name='freightOrg' disabled value={freightOrg || 0} />
                </td>
                <td>
                  <input type='text' name='freightAct' disabled value={freightAct || 0} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Remarks
              </label>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                </td>
                <td>
                  <input type='text' name='remarks' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value= {remarks || ''}/>
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            type='submit'
            variant='contained'
            size='small'
            color='primary'
            style={{ margin: '16px' }}>
            Submit </Button>
        </form>
      </div >
    }
    return (
      <div className='about_us_2 about_us_2_animated'>
        {
          this.localState.isEditPage ? ( <h2>Edit Performance Details</h2>) : (<h2>Fill Performance Details</h2>)
        }
        <FormHelperText style={{ textAlign: 'center', fontSize: 'large' }} error={error}>
          {error ? this.state.errorMsg : ''}
        </FormHelperText>
        <Button variant='contained' color='primary' onClick={this.handleBackButton} style={{ top: '4%', left: '10%', position: 'fixed' }}>
          Back
        </Button>
        <ShowDropDownAdmin
          handleClientListChange={this.handleClientListChange}
          handleVesselListChange={this.handleVesselListChange}
          handleCpDateChange={this.handleCpDateChange}
          state={this.state}
        />
        <br />
        {showTable}
      </div>
    )
  }
}

export default FillPerformanceDetails;