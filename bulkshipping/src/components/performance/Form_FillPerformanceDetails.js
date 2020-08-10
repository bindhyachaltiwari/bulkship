import React, { Component } from 'react';
import { Paper, Grid, Button, InputLabel, Select } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import InsertChartTwoToneIcon from '@material-ui/icons/InsertChartTwoTone';
import miscUtils from '../../utils/miscUtils';
import ConfirmationAlert from '../../utils/confirmationAlert';
import Alert from '../../utils/alert';
import api from '../../api';
import PerformanceModule from './PerformanceModule';

class FillPerformanceDetails extends Component {

  constructor(props) {
    super(props);
    let isGraphPage = false;
    if (props && props.history && props.history.location && props.history.location.state && Object.keys(props.history.location.state).length) {
      isGraphPage = true
    }
    this.state = {
      vesselList: [],
      selectedClient: props && props.clientPerformance ? props.clientPerformance.detail : isGraphPage ? props.history.location.state.detail : '',
      selectedVessel: props && props.clientPerformance ? props.clientPerformance.vesselName : isGraphPage ? props.history.location.state.vesselName : '',
      selectedCpDate: props && props.clientPerformance ? props.clientPerformance.cpDate : isGraphPage ? props.history.location.state.cpDate : '',
      portDetails: {
        loadPort: props && props.clientPerformance ? props.clientPerformance.loadPort : isGraphPage ? props.history.location.state.loadPort : '',
        dischargePort: props && props.clientPerformance ? props.clientPerformance.dischargePort : isGraphPage ? props.history.location.state.dischargePort : '',
      },
      allClients: [],
      allVslForSelectedClient: [],
      allCpDatesForSelectedClient: [],
      performanceDetails: {
        tcHire: 0,
        addressCommission: 0,
      },
      isDirty: true,
      confAlertDetails: {
        openAlert: false,
        titleMsg: '',
        descrMsg: '',
        buttonTitle: '',
      },
      alertDetails: {
        openAlert: false,
        titleMsg: '',
        descrMsg: ''
      },
      readOnly: false,
      isEditPage: props && props.activeTabIndex && props.activeTabIndex === 'editPage' ? true : false,
      isViewPage: props && props.activeTabIndex && props.activeTabIndex === 'viewPage' ? true : false,
      isClientPage: props && props.clientPerformance && props.clientPerformance.detail ? true : false,
      isGraphPage
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelAlert = this.handleCancelAlert.bind(this);
    this.handleSuccessAlert = this.handleSuccessAlert.bind(this);
    this.handlePerformanceDetailSubmit = this.handlePerformanceDetailSubmit.bind(this);
    this.tcHireChange = this.tcHireChange.bind(this);
    this.addressCommissionChange = this.addressCommissionChange.bind(this);
    this.onVoyageDaysChange = this.onVoyageDaysChange.bind(this);
    this.onLoadPortDelayChange = this.onLoadPortDelayChange.bind(this);
    this.onDischargePortDelayChange = this.onDischargePortDelayChange.bind(this);
    this.onIntermediatePortDelayChange = this.onIntermediatePortDelayChange.bind(this);
    this.handleIFOChange = this.handleIFOChange.bind(this);
    this.handleMDOChange = this.handleMDOChange.bind(this);
    this.getTotalOrg = this.getTotalOrg.bind(this);
    this.getTotalAct = this.getTotalAct.bind(this);
  }

  handleCancelAlert = () => this.setState({
    confAlertDetails: {
      openAlert: false,
      titleMsg: '',
      descrMsg: '',
      buttonTitle: '',
    },
    alertDetails: {
      openAlert: false,
      titleMsg: '',
      descrMsg: ''
    },
  });

  async componentDidMount() {
    let res = {};
    let { isEditPage, isViewPage, readOnly, isClientPage, isGraphPage } = this.state;
    if (isEditPage || isViewPage) {
      res = await api.getAllVesselsPerformance({ isDetailsFilled: true });
    } else {
      res = await api.getAllVesselsPerformance({ isDetailsFilled: false });
    }
    if (res.data.status) {
      if (isEditPage) {
        readOnly = false;
      } else if (isViewPage && !isClientPage) {
        readOnly = true;
        isEditPage = true
      } else if (isClientPage) {
        readOnly = true;
        const performanceDetails = res.data.vesselList.find(m => m.chartererName === this.state.selectedClient);
        this.setState({ performanceDetails, readOnly, isEditPage });
        return
      }

      let allClients = [...new Set(res.data.vesselList.map(m => m.chartererName))];
      this.setState({
        vesselList: res.data.vesselList,
        allClients,
        readOnly,
        isEditPage
      });
    } else {
      this.setState({
        alertDetails: {
          openAlert: true,
          titleMsg: 'Error !!',
          descrMsg: 'Failed to fetch data or no voyage to fill details...'
        }
      });
    }

    if (isGraphPage) {
      this.handleClientListChange();
      this.handleVesselListChange();
      this.handleCpDateChange();
      this.setState({ isGraphPage: false })
    }
  }


  handlePerformanceGraph = e => {
    const { selectedClient, selectedCpDate, selectedVessel, portDetails, performanceDetails } = this.state;
    const { loadPortDelay, dischargePortDelay, intermediatePortDelay, bunkerIFOAct, bunkerIFOOrg, voyageDays,
      bunkerMDOAct, bunkerMDOOrg, loadPortDAAct$, loadPortDAOrg$, dischargePortDAAct$, dischargePortDAOrg$, intermediatePortDAAct$, intermediatePortDAOrg$ } = performanceDetails
    const actualData = [
      voyageDays ? parseFloat(voyageDays.actual$) : 0,
      loadPortDelay ? parseFloat(loadPortDelay.actual$) : 0,
      dischargePortDelay ? parseFloat(dischargePortDelay.actual$) : 0,
      intermediatePortDelay ? parseFloat(intermediatePortDelay.actual$) : 0,
      bunkerIFOAct ? parseFloat(bunkerIFOAct.bunkerIFOAct$) : 0,
      bunkerMDOAct ? parseFloat(bunkerMDOAct.bunkerMDOAct$) : 0,
      loadPortDAAct$ ? parseFloat(loadPortDAAct$) : 0,
      dischargePortDAAct$ ? parseFloat(dischargePortDAAct$) : 0,
      intermediatePortDAAct$ ? parseFloat(intermediatePortDAAct$) : 0
    ]

    const originalData = [
      voyageDays ? parseFloat(voyageDays.original$) : 0,
      loadPortDelay ? parseFloat(loadPortDelay.original$) : 0,
      dischargePortDelay ? parseFloat(dischargePortDelay.original$) : 0,
      intermediatePortDelay ? parseFloat(intermediatePortDelay.original$) : 0,
      bunkerIFOOrg ? parseFloat(bunkerIFOOrg.bunkerIFOOrg$) : 0,
      bunkerMDOOrg ? parseFloat(bunkerMDOOrg.bunkerMDOOrg$) : 0,
      loadPortDAOrg$ ? parseFloat(loadPortDAOrg$) : 0,
      dischargePortDAOrg$ ? parseFloat(dischargePortDAOrg$) : 0,
      intermediatePortDAOrg$ ? parseFloat(intermediatePortDAOrg$) : 0
    ]

    this.props.history.push({
      pathname: '/performanceGraph',
      state: {
        detail: selectedClient,
        loadPort: portDetails.loadPort,
        cpDate: selectedCpDate,
        dischargePort: portDetails.dischargePort,
        vesselName: selectedVessel,
        actualData,
        originalData
      }
    });
  }

  handleCpDateChange = async e => {
    const { vesselList, selectedVessel, selectedClient, isEditPage, isGraphPage, selectedCpDate } = this.state;
    this.resetForm();
    let value = '';
    if (e) {
      value = e.target.value;
    } else if (isGraphPage && selectedCpDate) {
      value = selectedCpDate
    }
    let vesselDetails = vesselList.find(m => m.vesselName === selectedVessel && m.cpDate === value);
    const res = await api.getPortDetails({ userName: selectedClient, vesselName: selectedVessel, cpDate: value });
    if (res && res.data && res.data.status) {
      this.setState({
        portDetails: res.data.portDetails,
        vesselDetails,
        selectedCpDate: value,
        performanceDetails: {}
      });
    } else {
      this.setState({
        alertDetails: {
          openAlert: true,
          titleMsg: 'Error !!',
          descrMsg: 'No details found...'
        }
      });
    }

    if (isEditPage && selectedClient && selectedVessel && value) {
      this.setState({ performanceDetails: vesselDetails });
    }
  };

  handleVesselListChange = async e => {
    const { vesselList, selectedClient, isGraphPage, selectedVessel, selectedCpDate } = this.state;
    this.resetForm();
    let value = '';
    if (e) {
      value = e.target.value;
    } else if (isGraphPage && selectedVessel) {
      value = selectedVessel
    }
    const allCpDates = vesselList.filter(f => f.vesselName === value && f.chartererName === selectedClient).map(m => m.cpDate);
    if (!allCpDates.length || (allCpDates.length === 1 && allCpDates[0] === '')) {
      this.setState({
        allCpDatesForSelectedClient: [],
        selectedVessel: value,
        selectedCpDate: '',
        alertDetails: {
          openAlert: true,
          titleMsg: 'Error !!',
          descrMsg: 'Failed to fetch data...'
        }
      });
      return;
    }
    this.setState({
      allCpDatesForSelectedClient: allCpDates,
      selectedVessel: value,
      selectedCpDate: isGraphPage ? selectedCpDate : '',
      performanceDetails: {}
    });
  }

  handleClientListChange = e => {
    const { vesselList, selectedClient, isGraphPage, selectedVessel, selectedCpDate } = this.state;
    let value = ''
    if (e) {
      value = e.target.value;
    } else if (isGraphPage && selectedClient) {
      value = selectedClient
    }

    this.resetForm();
    const allVessels = [...new Set(vesselList.filter(m => m.chartererName === value).map(m => m.vesselName))];
    if (!allVessels.length || (allVessels.length === 1 && allVessels[0] === '')) {
      this.setState({
        allVslForSelectedClient: [],
        selectedClient: value,
        selectedVessel: '',
        selectedCpDate: '',
        alertDetails: {
          openAlert: true,
          titleMsg: 'Error !!',
          descrMsg: 'Failed to fetch data...'
        }
      });
    } else {
      this.setState({
        allVslForSelectedClient: allVessels,
        selectedClient: value,
        selectedVessel: isGraphPage ? selectedVessel : '',
        selectedCpDate: isGraphPage ? selectedCpDate : '',
        performanceDetails: {}
      });
    }
  }

  handleSuccessAlert = async e => {
    e.preventDefault();
    const { isDirty } = this.state;
    if (isDirty) {
      this.setState({
        confAlertDetails: {
          openAlert: false,
          titleMsg: '',
          descrMsg: '',
          buttonTitle: '',
        },
      });
    }

    this.handlePerformanceDetailSubmit(e);
    this.props.handleBlocking(false);
  }

  async handlePerformanceDetailSubmit(event) {
    event.preventDefault();
    const { selectedClient, selectedVessel, selectedCpDate, vesselList } = this.state;
    const vessel = vesselList.find(f => f.chartererName === selectedClient && f.vesselName === selectedVessel && f.cpDate === selectedCpDate)
    const vId = vessel ? vessel['_id'] : '';
    let data = await api.fillPerformanceDetails({ ...this.state.performanceDetails, vId });
    if (data.data.status.errors || data.data.status.errorMsg) {
      this.setState({
        alertDetails: {
          openAlert: true,
          titleMsg: 'Error !!',
          descrMsg: 'Failed to add performance details...'
        }
      });
    } else {
      this.resetForm();
      this.setState({
        selectedClient: '',
        selectedVessel: '',
        selectedCpDate: '',
        performanceDetails: {
          voyageDays: {},
          loadPortDelay: {},
          dischargePortDelay: {},
          intermediatePortDelay: {}
        },
        alertDetails: {
          openAlert: true,
          titleMsg: 'Success !!',
          descrMsg: 'Added performance details successfully..'
        },
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      confAlertDetails: {
        openAlert: true,
        titleMsg: 'Fill Performance Details ?',
        descrMsg: 'Do you want to submit?',
        buttonTitle: 'Submit'
      },
    });
  }

  tcHireChange(e) {
    const value = e.target.value ? e.target.value : 0;
    const { performanceDetails } = this.state;
    Object.assign(performanceDetails, { tcHire: this.getValue(value) });
    const totalOrg = this.getTotalOrg(performanceDetails);
    const totalAct = this.getTotalAct(performanceDetails);
    Object.assign(performanceDetails, { totalAct, totalOrg });
    if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
      let freightOrg = parseFloat(totalOrg / parseFloat(performanceDetails.CargoQuantityOrg));
      freightOrg = freightOrg ? parseFloat(freightOrg.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightOrg });
    }

    if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
      let freightAct = parseFloat(totalAct / parseFloat(performanceDetails.CargoQuantityAct));
      freightAct = freightAct ? parseFloat(freightAct.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightAct });
    }
    this.setState({ performanceDetails });
  }

  addressCommissionChange(e) {
    const value = e.target.value ? e.target.value : 0;
    const { performanceDetails } = this.state;
    Object.assign(performanceDetails, { addressCommission: this.getValue(value) });
    const totalOrg = this.getTotalOrg(performanceDetails);
    const totalAct = this.getTotalAct(performanceDetails);
    Object.assign(performanceDetails, { totalAct, totalOrg });
    if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
      let freightOrg = parseFloat(totalOrg / parseFloat(performanceDetails.CargoQuantityOrg));
      freightOrg = freightOrg ? parseFloat(freightOrg.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightOrg });
    }

    if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
      let freightAct = parseFloat(totalAct / parseFloat(performanceDetails.CargoQuantityAct));
      freightAct = freightAct ? parseFloat(freightAct.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightAct });
    }
    this.setState({ performanceDetails });
  }

  handlePerformanceDetailsChange = e => {
    e.preventDefault();
    let { name, value } = e.target;
    const { performanceDetails } = this.state;
    value = value ? value : 0;
    if (name === 'remarks') {
      Object.assign(performanceDetails, { [name]: value });
      this.setState({ performanceDetails });
      return;
    }

    Object.assign(performanceDetails, { [name]: this.getValue(value) });
    const totalOrg = this.getTotalOrg(performanceDetails);
    const totalAct = this.getTotalAct(performanceDetails);
    Object.assign(performanceDetails, { totalAct, totalOrg });
    if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
      let freightOrg = parseFloat(totalOrg / parseFloat(performanceDetails.CargoQuantityOrg));
      freightOrg = freightOrg ? parseFloat(freightOrg.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightOrg });
    }

    if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
      let freightAct = parseFloat(totalAct / parseFloat(performanceDetails.CargoQuantityAct));
      freightAct = freightAct ? parseFloat(freightAct.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightAct });
    }
    this.setState({ performanceDetails });
  }

  onVoyageDaysChange(obj) {
    const { performanceDetails } = this.state;
    if (!performanceDetails.voyageDays) {
      performanceDetails.voyageDays = {};
    }

    Object.assign(performanceDetails.voyageDays, { ...obj });
    const totalOrg = this.getTotalOrg(performanceDetails);
    const totalAct = this.getTotalAct(performanceDetails);
    Object.assign(performanceDetails, { totalAct, totalOrg });
    if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
      let freightOrg = parseFloat(totalOrg / parseFloat(performanceDetails.CargoQuantityOrg));
      freightOrg = freightOrg ? parseFloat(freightOrg.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightOrg });
    }

    if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
      let freightAct = parseFloat(totalAct / parseFloat(performanceDetails.CargoQuantityAct));
      freightAct = freightAct ? parseFloat(freightAct.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightAct });
    }
    this.setState({ performanceDetails });
  }

  onLoadPortDelayChange(obj) {
    const { performanceDetails } = this.state;
    if (!performanceDetails.loadPortDelay) {
      performanceDetails.loadPortDelay = {};
    }

    Object.assign(performanceDetails.loadPortDelay, { ...obj });
    const totalOrg = this.getTotalOrg(performanceDetails);
    const totalAct = this.getTotalAct(performanceDetails);
    Object.assign(performanceDetails, { totalAct, totalOrg });
    if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
      let freightOrg = parseFloat(totalOrg / parseFloat(performanceDetails.CargoQuantityOrg));
      freightOrg = freightOrg ? parseFloat(freightOrg.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightOrg });
    }

    if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
      let freightAct = parseFloat(totalAct / parseFloat(performanceDetails.CargoQuantityAct));
      freightAct = freightAct ? parseFloat(freightAct.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightAct });
    }
    this.setState({ performanceDetails });
  }

  onDischargePortDelayChange(obj) {
    const { performanceDetails } = this.state;
    if (!performanceDetails.dischargePortDelay) {
      performanceDetails.dischargePortDelay = {};
    }

    Object.assign(performanceDetails.dischargePortDelay, { ...obj });
    const totalOrg = this.getTotalOrg(performanceDetails);
    const totalAct = this.getTotalAct(performanceDetails);
    Object.assign(performanceDetails, { totalAct, totalOrg });
    if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
      let freightOrg = parseFloat(totalOrg / parseFloat(performanceDetails.CargoQuantityOrg));
      freightOrg = freightOrg ? parseFloat(freightOrg.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightOrg });
    }

    if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
      let freightAct = parseFloat(totalAct / parseFloat(performanceDetails.CargoQuantityAct));
      freightAct = freightAct ? parseFloat(freightAct.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightAct });
    }
    this.setState({ performanceDetails });
  }

  handleIFOChange(e) {
    const { performanceDetails } = this.state;
    let { name, value } = e.target;
    value = value ? value : 0
    const str = name.split('IFO');
    if (str && str.length >= 2 && str[1] === 'Act') {
      if (!performanceDetails.bunkerIFOAct) {
        performanceDetails.bunkerIFOAct = {};
      }
      Object.assign(performanceDetails.bunkerIFOAct, { [str[0]]: this.getValue(value) });
      const { consumption, price } = performanceDetails.bunkerIFOAct;
      if (parseFloat(consumption) >= 0 && parseFloat(price) >= 0) {
        Object.assign(performanceDetails.bunkerIFOAct, { bunkerIFOAct$: (consumption * price).toFixed(2) });
      }
    } else {
      if (!performanceDetails.bunkerIFOOrg) {
        performanceDetails.bunkerIFOOrg = {};
      }
      Object.assign(performanceDetails.bunkerIFOOrg, { [str[0]]: this.getValue(value) });
      const { consumption, price } = performanceDetails.bunkerIFOOrg;
      if (parseFloat(consumption) >= 0 && parseFloat(price) >= 0) {
        Object.assign(performanceDetails.bunkerIFOOrg, { bunkerIFOOrg$: (consumption * price).toFixed(2) });
      }
    }
    const totalOrg = this.getTotalOrg(performanceDetails);
    const totalAct = this.getTotalAct(performanceDetails);
    Object.assign(performanceDetails, { totalAct, totalOrg });
    if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
      let freightOrg = parseFloat(totalOrg / parseFloat(performanceDetails.CargoQuantityOrg)).toFixed(2);
      freightOrg = freightOrg ? parseFloat(freightOrg) : 0;
      Object.assign(performanceDetails, { freightOrg });
    }

    if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
      let freightAct = parseFloat(totalAct / parseFloat(performanceDetails.CargoQuantityAct)).toFixed(2);
      freightAct = freightAct ? parseFloat(freightAct) : 0;
      Object.assign(performanceDetails, { freightAct });
    }
    this.setState({ performanceDetails });
  }

  handleMDOChange(e) {
    const { performanceDetails } = this.state;
    let { name, value } = e.target;
    value = value ? value : 0
    const str = name.split('MDO');
    if (str && str.length >= 2 && str[1] === 'Act') {
      if (!performanceDetails.bunkerMDOAct) {
        performanceDetails.bunkerMDOAct = {};
      }
      Object.assign(performanceDetails.bunkerMDOAct, { [str[0]]: this.getValue(value) });
      const { consumption, price } = performanceDetails.bunkerMDOAct;
      if (parseFloat(consumption) >= 0 && parseFloat(price) >= 0) {
        Object.assign(performanceDetails.bunkerMDOAct, { bunkerMDOAct$: (consumption * price).toFixed(2) });
      }
    } else {
      if (!performanceDetails.bunkerMDOOrg) {
        performanceDetails.bunkerMDOOrg = {};
      }
      Object.assign(performanceDetails.bunkerMDOOrg, { [str[0]]: this.getValue(value) });
      const { consumption, price } = performanceDetails.bunkerMDOOrg;
      if (parseFloat(consumption) >= 0 && parseFloat(price) >= 0) {
        Object.assign(performanceDetails.bunkerMDOOrg, { bunkerMDOOrg$: (consumption * price).toFixed(2) });
      }
    }
    const totalOrg = this.getTotalOrg(performanceDetails);
    const totalAct = this.getTotalAct(performanceDetails);
    Object.assign(performanceDetails, { totalAct, totalOrg });
    if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
      let freightOrg = parseFloat(totalOrg / parseFloat(performanceDetails.CargoQuantityOrg)).toFixed(2);
      freightOrg = freightOrg ? parseFloat(freightOrg) : 0;
      Object.assign(performanceDetails, { freightOrg });
    }

    if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
      let freightAct = parseFloat(totalAct / parseFloat(performanceDetails.CargoQuantityAct)).toFixed(2);
      freightAct = freightAct ? parseFloat(freightAct) : 0;
      Object.assign(performanceDetails, { freightAct });
    }
    this.setState({ performanceDetails });
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
    if (totalOrg >= 0 && parseFloat(performanceDetails.CargoQuantityOrg) > 0) {
      let freightOrg = parseFloat(totalOrg / parseFloat(performanceDetails.CargoQuantityOrg));
      freightOrg = freightOrg ? parseFloat(freightOrg.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightOrg });
    }

    if (totalAct >= 0 && parseFloat(performanceDetails.CargoQuantityAct) > 0) {
      let freightAct = parseFloat(totalAct / parseFloat(performanceDetails.CargoQuantityAct));
      freightAct = freightAct ? parseFloat(freightAct.toFixed(2)) : 0;
      Object.assign(performanceDetails, { freightAct });
    }
    this.setState({ performanceDetails });
  }

  getTotalOrg(performanceDetails) {
    const { isViewPage } = this.state;
    const { voyageDays, intermediatePortDelay, dischargePortDelay, loadPortDelay, bunkerIFOOrg, bunkerMDOOrg } = performanceDetails;
    let total = 0;
    const keys = Object.keys(performanceDetails).filter(m => m.substr(m.length - 4) === 'Org$');
    if (keys && keys.length) {
      keys.forEach(e => {
        if (parseFloat(performanceDetails[e])) {
          if (e === 'demmurrageReceivedOrg$') {
            total -= parseFloat(performanceDetails[e])
          } else {
            total += parseFloat(performanceDetails[e]);
          }
        }
      });
    }
    if (voyageDays) {
      total += parseFloat(voyageDays.original$);
    }
    if (intermediatePortDelay) {
      total += parseFloat(intermediatePortDelay.original$);
    }
    if (dischargePortDelay) {
      total += parseFloat(dischargePortDelay.original$);
    }
    if (loadPortDelay) {
      total += parseFloat(loadPortDelay.original$);
    }
    if (bunkerIFOOrg && bunkerIFOOrg.bunkerIFOOrg$) {
      total += parseFloat(bunkerIFOOrg.bunkerIFOOrg$);
    }
    if (bunkerMDOOrg && bunkerMDOOrg.bunkerMDOOrg$) {
      total += parseFloat(bunkerMDOOrg.bunkerMDOOrg$);
    }
    if (!isViewPage) {
      this.props.handleBlocking(true);
    }
    return parseFloat(total).toFixed(2);
  }

  getTotalAct(performanceDetails) {
    const { voyageDays, intermediatePortDelay, dischargePortDelay, loadPortDelay, bunkerIFOAct, bunkerMDOAct } = performanceDetails;
    let total = 0;
    const keys = Object.keys(performanceDetails).filter(m => m.substr(m.length - 4) === 'Act$');
    if (keys && keys.length) {
      keys.forEach(e => {
        if (parseFloat(performanceDetails[e]) >= 0) {
          if (e === 'demmurrageReceivedAct$') {
            total -= parseFloat(performanceDetails[e])
          } else {
            total += parseFloat(performanceDetails[e]);
          }
        }
      });
    }
    if (voyageDays) {
      total += parseFloat(voyageDays.actual$);
    }
    if (intermediatePortDelay) {
      total += parseFloat(intermediatePortDelay.actual$);
    }
    if (dischargePortDelay) {
      total += parseFloat(dischargePortDelay.actual$);
    }
    if (loadPortDelay) {
      total += parseFloat(loadPortDelay.actual$);
    }
    if (bunkerIFOAct && bunkerIFOAct.bunkerIFOAct$) {
      total += parseFloat(bunkerIFOAct.bunkerIFOAct$);
    }
    if (bunkerMDOAct && bunkerMDOAct.bunkerMDOAct$) {
      total += parseFloat(bunkerMDOAct.bunkerMDOAct$);
    }
    return parseFloat(total).toFixed(2);
  }

  getValue(value) {
    if (!value) return 0;
    if (value[value.length - 1] === '.') return value;
    if (value.slice(-2) === '.0') return value;
    let v = parseFloat(value);
    return v ? v : 0;
  }

  resetForm() {
    if (!document.getElementById('performanceDetailsForm')) {
      return;
    }
    document.getElementById('performanceDetailsForm').reset();
    document.getElementById('portDetailsForm').reset();
  }

  render() {
    const { isDirty, readOnly, isClientPage, isViewPage, confAlertDetails, alertDetails, selectedClient, selectedVessel, selectedCpDate, allClients, allVslForSelectedClient, allCpDatesForSelectedClient, portDetails, performanceDetails } = this.state;
    const { tcHire, addressCommission, bunkerMDOAct, bunkerIFOOrg, bunkerIFOAct, bunkerMDOOrg, totalAct, totalOrg, freightOrg, freightAct, voyageDays, loadPortDelay,
      dischargePortDelay, intermediatePortDelay, loadPortDAAct$, loadPortDAOrg$, dischargePortDAOrg$, dischargePortDAAct$, bunkerSurveyCostBendsOrg$, bunkerSurveyCostBendsAct$, ILOHCandCVEAct$,
      ILOHCandCVEOrg$, wXRoutingExpenseOrg$, wXRoutingExpenseAct$, despatchPaidAct$, despatchPaidOrg$, PNIInsuranceAct$, PNIInsuranceOrg$, demmurrageReceivedAct$, demmurrageReceivedOrg$, intermediatePortDAAct$, intermediatePortDAOrg$,
      otherExpenseAct$, otherExpenseOrg$, HraWarRiskAct$, HraWarRiskOrg$, remarks, CargoQuantityAct, CargoQuantityOrg } = performanceDetails;
    return (
      <>
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <ConfirmationAlert confAlertDetails={confAlertDetails} handleCancelAlert={this.handleCancelAlert} handleSuccessAlert={this.handleSuccessAlert} />
        <Paper>
          {!isClientPage ? <Grid container>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <InputLabel id='demo-simple-select-label' className='inputLabels'>Select Client *</InputLabel>
              <Select
                className='field-select'
                labelId='demo-simple-select-label'
                autoWidth
                disabled={!allClients || !allClients.length}
                id='selectedClient'
                name='selectedClient'
                value={selectedClient || ''}
                onChange={this.handleClientListChange}>
                {allClients && allClients.length ? miscUtils.getOptions(allClients) : []}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <InputLabel id='demo-simple-select-label' className='inputLabels'>Select Vessel *</InputLabel>
              <Select
                className='field-select'
                labelId='demo-simple-select-label'
                autoWidth
                disabled={!selectedClient}
                id='selectedVessel'
                name='selectedVessel'
                value={selectedVessel || ''}
                onChange={this.handleVesselListChange}>
                {allVslForSelectedClient && allVslForSelectedClient.length ? miscUtils.getOptions(allVslForSelectedClient) : []}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <InputLabel id='demo-simple-select-label' className='inputLabels'>Select CP Date *</InputLabel>
              <Select
                className='field-select'
                labelId='demo-simple-select-label'
                autoWidth
                disabled={!selectedVessel}
                id='selectedCpDate'
                name='selectedCpDate'
                value={selectedCpDate || ''}
                onChange={this.handleCpDateChange}>
                {allCpDatesForSelectedClient && allCpDatesForSelectedClient.length ? miscUtils.getOptions(allCpDatesForSelectedClient) : []}
              </Select>
            </Grid>
          </Grid> : ''}
          {selectedCpDate ?
            <>
              <form id='portDetailsForm' onSubmit={this.handlePerformanceDetailSubmit}>
                <table className='table-performance'>
                  <tbody>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Load Port</label>
                      </td>
                      <td className='table-performance-td-th'>
                        <input className='table-performance-input' type='text' disabled name='loadPort' value={portDetails.loadPort || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Discharge Port</label>
                      </td>
                      <td className='table-performance-td-th'>
                        <input className='table-performance-input' type='text' disabled name='dischargePort' value={portDetails.dischargePort || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>TC Hire (Per day) *</label>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} className='table-performance-input' maxLength='10' type='text' name='tcHire' required onChange={this.tcHireChange} autoComplete='off' value={tcHire || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Address Commission *</label>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} className='table-performance-input' maxLength='10' type='text' name='addressCommission' required onChange={this.addressCommissionChange} autoComplete='off' value={addressCommission || 0} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
              {isViewPage ? <IconButton onClick={this.handlePerformanceGraph} aria-label='View Graph' className='btn-edit'><InsertChartTwoToneIcon /></IconButton> : <></>}
              <br />
              <form id='performanceDetailsForm' onSubmit={this.handlePerformanceDetailSubmit} style={{ margin: '1%' }}>
                <table className='table-performance'>
                  <thead>
                    <tr>
                      <th className='table-performance-td-th'>Field</th>
                      <th className='table-performance-td-th'>Original</th>
                      <th className='table-performance-td-th'>Actual</th>
                      <th className='table-performance-td-th'>Original ($)</th>
                      <th className='table-performance-td-th'>Actual ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Voyage Days*</label>
                      </td>
                      <PerformanceModule voyageDays={voyageDays} required={true} tcHire={tcHire} disabled={readOnly} addressCommission={addressCommission} onOriginalActualChange={this.onVoyageDaysChange} />
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Delays at Port</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Load Port Delay</label>
                      </td>
                      <PerformanceModule voyageDays={loadPortDelay} required={false} tcHire={tcHire} disabled={readOnly} addressCommission={addressCommission} onOriginalActualChange={this.onLoadPortDelayChange} />
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Discharge Port Delay</label>
                      </td>
                      <PerformanceModule voyageDays={dischargePortDelay} required={false} tcHire={tcHire} disabled={readOnly} addressCommission={addressCommission} onOriginalActualChange={this.onDischargePortDelayChange} />
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Intermediate Port Delays</label>
                      </td>
                      <PerformanceModule voyageDays={intermediatePortDelay} required={false} tcHire={tcHire} disabled={readOnly} addressCommission={addressCommission} onOriginalActualChange={this.onIntermediatePortDelayChange} />
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Bunker Consumption (MT) *</label>
                      </td>
                      <td className='table-performance-td-th'></td>
                      <td className='table-performance-td-th'></td>
                      <td className='table-performance-td-th'></td>
                      <td className='table-performance-td-th'></td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>IFO</label>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='consumptionIFOOrg' required onChange={this.handleIFOChange} autoComplete='off' value={bunkerIFOOrg && bunkerIFOOrg.consumption ? bunkerIFOOrg.consumption : 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='consumptionIFOAct' required onChange={this.handleIFOChange} autoComplete='off' value={bunkerIFOAct && bunkerIFOAct.consumption ? bunkerIFOAct.consumption : 0} />
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>MDO</label>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='consumptionMDOOrg' required onChange={this.handleMDOChange} autoComplete='off' value={bunkerMDOOrg ? bunkerMDOOrg.consumption : 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='consumptionMDOAct' required onChange={this.handleMDOChange} autoComplete='off' value={bunkerMDOAct ? bunkerMDOAct.consumption : 0} />
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Bunker Price (USD) *</label>
                      </td>
                      <td className='table-performance-td-th'></td>
                      <td className='table-performance-td-th'></td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>IFO</label>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='priceIFOOrg' required onChange={this.handleIFOChange} autoComplete='off' value={bunkerIFOOrg && bunkerIFOOrg.price ? bunkerIFOOrg.price : 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='priceIFOAct' required onChange={this.handleIFOChange} autoComplete='off' value={bunkerIFOAct && bunkerIFOAct.price ? bunkerIFOAct.price : 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input className='table-performance-input' type='text' disabled value={bunkerIFOOrg && bunkerIFOOrg.bunkerIFOOrg$ ? bunkerIFOOrg.bunkerIFOOrg$ : 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input className='table-performance-input' type='text' disabled value={bunkerIFOAct && bunkerIFOAct.bunkerIFOAct$ ? bunkerIFOAct.bunkerIFOAct$ : 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>MDO</label>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='priceMDOOrg' required onChange={this.handleMDOChange} autoComplete='off' value={bunkerMDOOrg ? bunkerMDOOrg.price : 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='priceMDOAct' required onChange={this.handleMDOChange} autoComplete='off' value={bunkerMDOAct ? bunkerMDOAct.price : 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input className='table-performance-input' type='text' disabled value={bunkerMDOOrg && bunkerMDOOrg.bunkerMDOOrg$ ? bunkerMDOOrg.bunkerMDOOrg$ : 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input className='table-performance-input' type='text' disabled value={bunkerMDOAct && bunkerMDOAct.bunkerMDOAct$ ? bunkerMDOAct.bunkerMDOAct$ : 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Load Port DA *</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='loadPortDAOrg$' required onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={loadPortDAOrg$ || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='loadPortDAAct$' required onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={loadPortDAAct$ || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Discharge Port DA *</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='dischargePortDAOrg$' required onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={dischargePortDAOrg$ || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='dischargePortDAAct$' required onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={dischargePortDAAct$ || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Intermediate Port DA *</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='intermediatePortDAOrg$' required onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={intermediatePortDAOrg$ || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='intermediatePortDAAct$' required onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={intermediatePortDAAct$ || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>ILOHC and CVE</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='ILOHCandCVEOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={ILOHCandCVEOrg$ || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='ILOHCandCVEAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={ILOHCandCVEAct$ || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Bunker Survey Cost Bends</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='bunkerSurveyCostBendsOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={bunkerSurveyCostBendsOrg$ || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='bunkerSurveyCostBendsAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={bunkerSurveyCostBendsAct$ || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>WX Routing Expense</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='wXRoutingExpenseOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={wXRoutingExpenseOrg$ || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='wXRoutingExpenseAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={wXRoutingExpenseAct$ || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>PNI Insurance</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='PNIInsuranceOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={PNIInsuranceOrg$ || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='PNIInsuranceAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={PNIInsuranceAct$ || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Despatch Paid</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='despatchPaidOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={despatchPaidOrg$ || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='despatchPaidAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={despatchPaidAct$ || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Other Expense</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='otherExpenseOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={otherExpenseOrg$ || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='otherExpenseAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={otherExpenseAct$ || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>HRA/WAR Risk</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='HraWarRiskOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={HraWarRiskOrg$ || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='HraWarRiskAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={HraWarRiskAct$ || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Demmurrage Received</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='demmurrageReceivedOrg$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={demmurrageReceivedOrg$ || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='demmurrageReceivedAct$' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={demmurrageReceivedAct$ || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Cargo Quantity (MT)</label>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='CargoQuantityOrg' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={CargoQuantityOrg || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='10' className='table-performance-input' type='text' name='CargoQuantityAct' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={CargoQuantityAct || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Total</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input className='table-performance-input' type='text' name='totalOrg' disabled value={totalOrg || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input className='table-performance-input' type='text' name='totalAct' disabled value={totalAct || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Freight (USD/MT)</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input className='table-performance-input' type='text' name='freightOrg' disabled value={freightOrg || 0} />
                      </td>
                      <td className='table-performance-td-th'>
                        <input className='table-performance-input' type='text' name='freightAct' disabled value={freightAct || 0} />
                      </td>
                    </tr>
                    <tr>
                      <td className='table-performance-td-th'>
                        <label>Remarks</label>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                      </td>
                      <td className='table-performance-td-th'>
                        <input disabled={readOnly} maxLength='25' className='table-performance-input' type='text' name='remarks' onChange={this.handlePerformanceDetailsChange} autoComplete='off' value={remarks || ''} />
                      </td>
                    </tr>
                  </tbody>
                </table>
                {isViewPage ? <></> : <Button
                  className={`${(isDirty) ? 'white-color' : 'grey-color'} btn-save`}
                  variant='contained'
                  size='large'
                  startIcon={<SaveIcon />}
                  disabled={!(isDirty)}
                  onClick={this.handleSubmit}> Submit  </Button>}
              </form>
            </> : <></>}
        </Paper>
      </>
    );
  }
}

export default FillPerformanceDetails;
