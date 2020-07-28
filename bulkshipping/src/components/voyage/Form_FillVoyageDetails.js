import React, { Component } from 'react';
import { Paper, Grid, Button, InputLabel, Select, Checkbox, ListItemText, MenuItem, Input, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import constants from '../../utils/constants';
import DateFnsUtils from '@date-io/date-fns';
import SaveIcon from '@material-ui/icons/Save';
import miscUtils from '../../utils/miscUtils';
import ConfirmationAlert from '../../utils/confirmationAlert';
import Alert from '../../utils/alert';
import api from '../../api';
import AddDynamicField from '../common/AddDynamicField';

class FillVoyageDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDirty: false,
      isTyped: false,
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
      voyageDetails: props && props.onRowClickedData ? { ...props.onRowClickedData } : {},
      isEditPage: props && props.onRowClickedData && Object.keys(props.onRowClickedData).length ? true : false,
      validity: {},
      isformValid: true,
      checkedAll: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelAlert = this.handleCancelAlert.bind(this);
    this.handleSuccessAlert = this.handleSuccessAlert.bind(this);
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

  componentWillMount() {
    this.getAllClientList();
    this.getAllVesselsList();
    if (this.props && this.props.onRowClickedData) {
      this.updateForm(this.props.onRowClickedData, true);
    }
    const { isEditPage, checkedAll, voyageDetails } = this.state;
    if (isEditPage && !checkedAll && voyageDetails.fieldVisibility && voyageDetails.fieldVisibility.length === 16) {
      this.setState({ checkedAll: true })
    }
  }

  getAllClientList = async () => {
    const res = await api.getAllClientList();
    if (res.data.status) {
      const clientList = res.data.clientList.sort();
      this.setState({ clientList });
    } else {
      this.setState({
        alertDetails: {
          openAlert: true,
          titleMsg: 'Error !!',
          descrMsg: 'Failed to fetch data...'
        }
      });
    }
  }

  getAllVesselsList = async () => {
    const res = await api.getAllVesselsList();
    if (res.data.status) {
      const vesselList = res.data.vesselList.map(m => m.vesselName + '_' + m.DWT).sort();
      this.setState({ vesselList });
    } else {
      this.setState({
        alertDetails: {
          openAlert: true,
          titleMsg: 'Error !!',
          descrMsg: 'Failed to fetch data...'
        }
      });
    }
  }

  handleDateFieldChange = value => {
    if (!value || value.toString() === 'Invalid Date' || value > new Date()) {
      return;
    }
    const voyageDetails = this.state.voyageDetails;
    Object.assign(voyageDetails, { cpDate: value });
    this.updateForm(voyageDetails);
  };

  handleSuccessAlert = async e => {
    e.preventDefault();
    const { isDirty, voyageDetails, isEditPage } = this.state;
    const { chartererName, vesselName, cpDate } = voyageDetails;
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

    let resp = {};
    if (isEditPage) {
      resp = await api.updateVoyageDetails(voyageDetails);
      if (resp.data.status) {
        this.props.handleBlocking(false);
        this.setState({
          isDirty: true,
          isTyped: false,
          confAlertDetails: {
            openAlert: false,
            titleMsg: '',
            descrMsg: '',
            buttonTitle: '',
          },
          isEditPage: true,
          validity: {},
          isformValid: true,
          alertDetails: {
            openAlert: true,
            titleMsg: 'Success !!',
            descrMsg: 'Updated voyage details successfully..'
          },
        });
      } else {
        this.setState({
          alertDetails: {
            openAlert: true,
            titleMsg: 'Error !!',
            descrMsg: 'Failed to update voyage details...'
          }
        });
      }
    } else {
      resp = await api.insertPerformanceData({ cpDate, vesselName, chartererName, isDetailsFilled: false });
      resp = await api.insertVoyageData({ voyageDetails });
      this.props.handleBlocking(false);
      if (resp.data.status) {
        this.setState({
          isDirty: false,
          isTyped: false,
          confAlertDetails: {
            openAlert: false,
            titleMsg: '',
            descrMsg: '',
            buttonTitle: '',
          },
          voyageDetails: {},
          validity: {},
          isformValid: true,
          alertDetails: {
            openAlert: true,
            titleMsg: 'Success !!',
            descrMsg: 'Added voyage details successfully..'
          },
        });
      } else {
        this.setState({
          alertDetails: {
            openAlert: true,
            titleMsg: 'Error !!',
            descrMsg: 'Failed to add voyage details...'
          }
        });
      }
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.isEditPage) {
      this.setState({
        confAlertDetails: {
          openAlert: true,
          titleMsg: 'Update Voyage Details ?',
          descrMsg: 'Do you want to submit?',
          buttonTitle: 'Submit'
        },
      });
    } else {
      this.setState({
        confAlertDetails: {
          openAlert: true,
          titleMsg: 'Add Voyage Details ?',
          descrMsg: 'Do you want to submit?',
          buttonTitle: 'Submit'
        },
      });
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { id, value, name } = e.target;
    let { voyageDetails, isformValid, validity, isTyped } = this.state;
    if (typeof e.target.getAttribute === 'function') {
      let validationtype = e.target.getAttribute('type');
      if (validationtype) {
        const resp = miscUtils.isFieldValid(validationtype, value, validity, id);
        isformValid = !resp.v;
        this.setState({
          validity: resp.validity,
          validationtype,
          isformValid: !resp.v
        });
      }
    }
    isTyped = true;
    if (id) {
      Object.assign(voyageDetails, { [id]: value });
    } else {
      Object.assign(voyageDetails, { [name]: value });
    }

    this.updateForm(voyageDetails, isformValid, isTyped);
  };

  multipleSelect = e => {
    const { value } = e.target;
    let v = value[value.length - 1];
    let { voyageDetails, checkedAll } = this.state;

    if (!checkedAll && v === 'Select All') {
      Object.assign(voyageDetails, { fieldVisibility: constants.voyageFieldList })
    } else if (checkedAll && v === 'Select All') {
      Object.assign(voyageDetails, { fieldVisibility: [] })
    } else {
      Object.assign(voyageDetails, { fieldVisibility: value })
    }

    if ((v === 'Select All' && !checkedAll) || value.length === 16) {
      checkedAll = true;
    } else {
      checkedAll = false;
    }
    this.setState({ voyageDetails, checkedAll });
    this.updateForm(voyageDetails, true, true);
  }

  submitNewFieldDetails = e => {
    e.preventDefault();
    console.log(e)
    const inputs = e.target.querySelectorAll('input');
    if (inputs && inputs.length) {
      const { voyageDetails } = this.state;
      let { otherFields } = voyageDetails;
      if (!otherFields) {
        otherFields = {};
      }
      Object.assign(otherFields, { [inputs[0].value]: inputs[1].value });
      this.setState({ voyageDetails });
      document.getElementById('newFieldForm').reset();
      // this.displayOtherFields();
    }
  };

  updateForm(voyageDetails, isformValid, isTyped) {
    let { chartererName, vesselName, cpDate, dischargePort, loadPort, fieldVisibility } = voyageDetails;
    if (!cpDate) {
      cpDate = new Date();
      Object.assign(voyageDetails, { cpDate });
    }
    if (isformValid && chartererName && vesselName && cpDate && dischargePort && loadPort && fieldVisibility && fieldVisibility.length) {
      this.setState({ isDirty: true, voyageDetails, isTyped });
    } else {
      this.setState({ isDirty: false, voyageDetails, isTyped });
    }

    if (isTyped) {
      this.props.handleBlocking(true);
    }
  }

  render() {
    const { validity, isDirty, isformValid, confAlertDetails, voyageDetails, alertDetails, clientList, vesselList, isEditPage } = this.state;
    let { chartererName, vesselName, cpDate, dischargePort, loadPort, vesselSize, cargoIntake, cargo, ownerName, shipper, pniInsurance, weatherRoutingCompany, loadPortAgent, dischargePortAgent, receiver, onHireSurveyor, offHireSurveyor, bunkerSupplier, bunkerTrader, fieldVisibility } = voyageDetails;
    if (!fieldVisibility) {
      fieldVisibility = [];
    }
    return (
      <form autoComplete="off" noValidate >
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <ConfirmationAlert confAlertDetails={confAlertDetails} handleCancelAlert={this.handleCancelAlert} handleSuccessAlert={this.handleSuccessAlert} />
        <AddDynamicField submitNewFieldDetails={this.submitNewFieldDetails} />
        <Paper style={{ marginTop: '2%' }}>
          <Grid container>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <InputLabel id='demo-simple-select-label' className='inputLabels'>Charterer Name *</InputLabel>
              <Select
                className='field-select'
                labelId='demo-simple-select-label'
                disabled={isEditPage}
                autoWidth
                id='chartererName'
                name='chartererName'
                value={chartererName || ''}
                onChange={this.handleChange}>
                {clientList && clientList.length ? miscUtils.getOptions(clientList) : []}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <InputLabel id='demo-simple-select-label' className='inputLabels'>Vessel Name *</InputLabel>
              <Select
                className='field-select'
                labelId='demo-simple-select-label'
                disabled={isEditPage}
                autoWidth
                id='vesselName'
                name='vesselName'
                value={vesselName || ''}
                onChange={this.handleChange}>
                {vesselList && vesselList.length ? miscUtils.getOptions(vesselList) : []}
              </Select>
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className='field-select'
                  disabled={isEditPage}
                  format='MM/dd/yyyy'
                  margin='normal'
                  id='cpDate'
                  label='CP Date *'
                  value={cpDate}
                  onChange={this.handleDateFieldChange}
                  maxDate={new Date()}
                  autoOk
                  variant='inline'
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 10 }}
                error={validity && validity.vesselSize && validity.vesselSize.isInvalid}
                id='vesselSize'
                label='Vessel Size'
                type='decimal'
                onChange={this.handleChange}
                value={vesselSize || ''}
                autoComplete='off'
                helperText={validity && validity.vesselSize && validity.vesselSize.isInvalid ? miscUtils.getErrorMessage(validity.vesselSize.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 25 }}
                error={validity && validity.loadPort && validity.loadPort.isInvalid}
                id='loadPort'
                label='Load Port *'
                type='allCharacters*'
                onChange={this.handleChange}
                value={loadPort || ''}
                autoComplete='off'
                helperText={validity && validity.loadPort && validity.loadPort.isInvalid ? miscUtils.getErrorMessage(validity.loadPort.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 25 }}
                error={validity && validity.dischargePort && validity.dischargePort.isInvalid}
                id='dischargePort'
                label='Discharge Port *'
                type='allCharacters*'
                onChange={this.handleChange}
                value={dischargePort || ''}
                autoComplete='off'
                helperText={validity && validity.dischargePort && validity.dischargePort.isInvalid ? miscUtils.getErrorMessage(validity.dischargePort.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 15 }}
                error={validity && validity.cargo && validity.cargo.isInvalid}
                id='cargo'
                label='Cargo'
                type='allCharacters'
                onChange={this.handleChange}
                value={cargo || ''}
                autoComplete='off'
                helperText={validity && validity.cargo && validity.cargo.isInvalid ? miscUtils.getErrorMessage(validity.cargo.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 10 }}
                error={validity && validity.cargoIntake && validity.cargoIntake.isInvalid}
                id='cargoIntake'
                label='Cargo Intake'
                type='decimal'
                onChange={this.handleChange}
                value={cargoIntake || ''}
                autoComplete='off'
                helperText={validity && validity.cargoIntake && validity.cargoIntake.isInvalid ? miscUtils.getErrorMessage(validity.cargoIntake.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 30 }}
                error={validity && validity.ownerName && validity.ownerName.isInvalid}
                id='ownerName'
                label='Owner Name'
                type='allCharacters'
                onChange={this.handleChange}
                value={ownerName || ''}
                autoComplete='off'
                helperText={validity && validity.ownerName && validity.ownerName.isInvalid ? miscUtils.getErrorMessage(validity.ownerName.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 30 }}
                error={validity && validity.shipper && validity.shipper.isInvalid}
                id='shipper'
                label='Shipper'
                type='allCharacters'
                onChange={this.handleChange}
                value={shipper || ''}
                autoComplete='off'
                helperText={validity && validity.shipper && validity.shipper.isInvalid ? miscUtils.getErrorMessage(validity.shipper.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 30 }}
                error={validity && validity.loadPortAgent && validity.loadPortAgent.isInvalid}
                id='loadPortAgent'
                label='Load Port Agent'
                type='allCharacters'
                onChange={this.handleChange}
                value={loadPortAgent || ''}
                autoComplete='off'
                helperText={validity && validity.loadPortAgent && validity.loadPortAgent.isInvalid ? miscUtils.getErrorMessage(validity.loadPortAgent.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 30 }}
                error={validity && validity.dischargePortAgent && validity.dischargePortAgent.isInvalid}
                id='dischargePortAgent'
                label='Discharge Port Agent'
                type='allCharacters'
                onChange={this.handleChange}
                value={dischargePortAgent || ''}
                autoComplete='off'
                helperText={validity && validity.dischargePortAgent && validity.dischargePortAgent.isInvalid ? miscUtils.getErrorMessage(validity.dischargePortAgent.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 30 }}
                error={validity && validity.receiver && validity.receiver.isInvalid}
                id='receiver'
                label='Receiver'
                type='allCharacters'
                onChange={this.handleChange}
                value={receiver || ''}
                autoComplete='off'
                helperText={validity && validity.receiver && validity.receiver.isInvalid ? miscUtils.getErrorMessage(validity.receiver.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 30 }}
                error={validity && validity.onHireSurveyor && validity.onHireSurveyor.isInvalid}
                id='onHireSurveyor'
                label='On Hire Surveyor'
                type='allCharacters'
                onChange={this.handleChange}
                value={onHireSurveyor || ''}
                autoComplete='off'
                helperText={validity && validity.onHireSurveyor && validity.onHireSurveyor.isInvalid ? miscUtils.getErrorMessage(validity.onHireSurveyor.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 30 }}
                error={validity && validity.offHireSurveyor && validity.offHireSurveyor.isInvalid}
                id='offHireSurveyor'
                label='Off Hire Surveyor'
                type='allCharacters'
                onChange={this.handleChange}
                value={offHireSurveyor || ''}
                autoComplete='off'
                helperText={validity && validity.offHireSurveyor && validity.offHireSurveyor.isInvalid ? miscUtils.getErrorMessage(validity.offHireSurveyor.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 30 }}
                error={validity && validity.bunkerSupplier && validity.bunkerSupplier.isInvalid}
                id='bunkerSupplier'
                label='Bunker Supplier'
                type='allCharacters'
                onChange={this.handleChange}
                value={bunkerSupplier || ''}
                autoComplete='off'
                helperText={validity && validity.bunkerSupplier && validity.bunkerSupplier.isInvalid ? miscUtils.getErrorMessage(validity.bunkerSupplier.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 30 }}
                error={validity && validity.bunkerTrader && validity.bunkerTrader.isInvalid}
                id='bunkerTrader'
                label='Bunker Trader'
                type='allCharacters'
                onChange={this.handleChange}
                value={bunkerTrader || ''}
                autoComplete='off'
                helperText={validity && validity.bunkerTrader && validity.bunkerTrader.isInvalid ? miscUtils.getErrorMessage(validity.bunkerTrader.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 30 }}
                error={validity && validity.pniInsurance && validity.pniInsurance.isInvalid}
                id='pniInsurance'
                label='PNI Insurance'
                type='allCharacters'
                onChange={this.handleChange}
                value={pniInsurance || ''}
                autoComplete='off'
                helperText={validity && validity.pniInsurance && validity.pniInsurance.isInvalid ? miscUtils.getErrorMessage(validity.pniInsurance.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 30 }}
                error={validity && validity.weatherRoutingCompany && validity.weatherRoutingCompany.isInvalid}
                id='weatherRoutingCompany'
                label='Weather Routing Co.'
                type='allCharacters'
                onChange={this.handleChange}
                value={weatherRoutingCompany || ''}
                autoComplete='off'
                helperText={validity && validity.weatherRoutingCompany && validity.weatherRoutingCompany.isInvalid ? miscUtils.getErrorMessage(validity.weatherRoutingCompany.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <InputLabel id="demo-mutiple-checkbox-label" className='inputLabels'>Select Client Visible *</InputLabel>
              <Select
                className='field-select'
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={fieldVisibility}
                name='fieldVisibility'
                onChange={this.multipleSelect}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => selected.join(', ')}>
                <MenuItem key={'Select All'} value={'Select All'}>
                  <Checkbox checked={Boolean(this.state.checkedAll)} />
                  <ListItemText primary={this.state.checkedAll ? "Select None" : "Select All"} />
                </MenuItem>
                {constants.voyageFieldList.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={fieldVisibility.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>

          <Button
            className={`${(isDirty && isformValid) ? 'white-color' : 'grey-color'} btn-save`}
            variant='contained'
            size='large'
            startIcon={<SaveIcon />}
            disabled={!(isDirty && isformValid)}
            onClick={this.handleSubmit}> Submit  </Button>
        </Paper>
      </form>
    );
  }
}

export default FillVoyageDetails;
