import React, { Component } from 'react';
import { Paper, Grid, Button, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import miscUtils from '../../utils/miscUtils';
import ConfirmationAlert from '../../utils/confirmationAlert';
import Alert from '../../utils/alert';
import api from '../../api';

class AddNewVessel extends Component {

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
      vesselDetails: props && props.onRowClickedData ? { ...props.onRowClickedData } : {},
      isEditPage: props && props.onRowClickedData && Object.keys(props.onRowClickedData).length ? true : false,
      validity: {},
      isformValid: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancelAlert = this.handleCancelAlert.bind(this);
    this.handleSuccessAlert = this.handleSuccessAlert.bind(this);
  }

  componentWillMount() {
    if (this.props && this.props.onRowClickedData) {
      this.updateForm(this.props.onRowClickedData, true);
    }
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

  handleSuccessAlert = async e => {
    e.preventDefault();
    const { isDirty, vesselDetails, isEditPage } = this.state;
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
      resp = await api.updateVesselDetails(vesselDetails);
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
            descrMsg: 'Updated vessel details successfully..'
          },
        });
      } else {
        this.setState({
          alertDetails: {
            openAlert: true,
            titleMsg: 'Error !!',
            descrMsg: 'Failed to update vessel details...'
          }
        });
      }
    } else {
      resp = await api.insertVesselDetails({ vesselDetails });
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
          vesselDetails: {},
          validity: {},
          isformValid: true,
          alertDetails: {
            openAlert: true,
            titleMsg: 'Success !!',
            descrMsg: 'Added new vessel successfully..'
          },
        });
      } else {
        this.setState({
          alertDetails: {
            openAlert: true,
            titleMsg: 'Error !!',
            descrMsg: 'Failed to add new user...'
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
          titleMsg: 'Update Vessel Details?',
          descrMsg: 'Do you want to submit?',
          buttonTitle: 'Submit'
        },
      });
    } else {
      this.setState({
        confAlertDetails: {
          openAlert: true,
          titleMsg: 'Add New Vessel ?',
          descrMsg: 'Do you want to submit?',
          buttonTitle: 'Submit'
        },
      });
    }
  }

  handleChange = e => {
    e.preventDefault();
    const { id, value, name } = e.target;
    let { vesselDetails, isformValid, validity, isTyped } = this.state;
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
      Object.assign(vesselDetails, { [id]: value });
    } else {
      Object.assign(vesselDetails, { [name]: value });
    }

    this.updateForm(vesselDetails, isformValid, isTyped);
  };

  updateForm(vesselDetails, isformValid, isTyped) {
    const { vesselName, IMO, DWT } = vesselDetails
    if (isformValid && vesselName && IMO && DWT) {
      this.setState({ isDirty: true, vesselDetails, isTyped });
    } else {
      this.setState({ isDirty: false, vesselDetails, isTyped });
    }

    if (isTyped) {
      this.props.handleBlocking(true);
    }
  }

  render() {
    const { validity, isDirty, isformValid, confAlertDetails, vesselDetails, alertDetails, isEditPage } = this.state;
    let { vesselName, IMO, DWT, flag, vesselType, built, draft, LOA, beam, GRT, NRT, TPC, holdsHatches, grainCapacity, baleCapacity, cranes, grabs } = vesselDetails;
    return (
      <form autoComplete="off" noValidate >
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <ConfirmationAlert confAlertDetails={confAlertDetails} handleCancelAlert={this.handleCancelAlert} handleSuccessAlert={this.handleSuccessAlert} />
        <Paper style={{ marginTop: '2%' }}>
          <Grid container>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 20 }}
                disabled={isEditPage}
                error={validity && validity.vesselName && validity.vesselName.isInvalid}
                id='vesselName'
                label='Vessel Name *'
                type='aplhaNumeric*'
                onChange={this.handleChange}
                value={vesselName || ''}
                autoComplete='off'
                helperText={validity && validity.vesselName && validity.vesselName.isInvalid ? miscUtils.getErrorMessage(validity.vesselName.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 15 }}
                disabled={isEditPage}
                error={validity && validity.IMO && validity.IMO.isInvalid}
                id='IMO'
                label='IMO *'
                type='numeric*'
                onChange={this.handleChange}
                value={IMO || ''}
                autoComplete='off'
                helperText={validity && validity.IMO && validity.IMO.isInvalid ? miscUtils.getErrorMessage(validity.IMO.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 10 }}
                disabled={isEditPage}
                error={validity && validity.DWT && validity.DWT.isInvalid}
                id='DWT'
                label='DWT (MT) *'
                type='decimal*'
                onChange={this.handleChange}
                value={DWT || ''}
                autoComplete='off'
                helperText={validity && validity.DWT && validity.DWT.isInvalid ? miscUtils.getErrorMessage(validity.DWT.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 20 }}
                error={validity && validity.flag && validity.flag.isInvalid}
                id='flag'
                label='Flag'
                type='onlyAlphabets'
                onChange={this.handleChange}
                value={flag || ''}
                autoComplete='off'
                helperText={validity && validity.flag && validity.flag.isInvalid ? miscUtils.getErrorMessage(validity.flag.validationtype) : ''}
              />
            </Grid>

            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 25 }}
                error={validity && validity.vesselType && validity.vesselType.isInvalid}
                id='vesselType'
                label='Vessel Type'
                type='onlyAlphabets'
                onChange={this.handleChange}
                value={vesselType || ''}
                autoComplete='off'
                helperText={validity && validity.vesselType && validity.vesselType.isInvalid ? miscUtils.getErrorMessage(validity.vesselType.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 4 }}
                error={validity && validity.built && validity.built.isInvalid}
                id='built'
                label='Built Year'
                type='numeric'
                onChange={this.handleChange}
                value={built || ''}
                autoComplete='off'
                helperText={validity && validity.built && validity.built.isInvalid ? miscUtils.getErrorMessage(validity.built.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 8 }}
                error={validity && validity.draft && validity.draft.isInvalid}
                id='draft'
                label='Draft (M)'
                type='decimal'
                onChange={this.handleChange}
                value={draft || ''}
                autoComplete='off'
                helperText={validity && validity.draft && validity.draft.isInvalid ? miscUtils.getErrorMessage(validity.draft.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 10 }}
                error={validity && validity.LOA && validity.LOA.isInvalid}
                id='LOA'
                label='LOA (M)'
                type='decimal'
                onChange={this.handleChange}
                value={LOA || ''}
                autoComplete='off'
                helperText={validity && validity.LOA && validity.LOA.isInvalid ? miscUtils.getErrorMessage(validity.LOA.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 10 }}
                error={validity && validity.beam && validity.beam.isInvalid}
                id='beam'
                label='Beam (M)'
                type='decimal'
                onChange={this.handleChange}
                value={beam || ''}
                autoComplete='off'
                helperText={validity && validity.beam && validity.beam.isInvalid ? miscUtils.getErrorMessage(validity.beam.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 10 }}
                error={validity && validity.GRT && validity.GRT.isInvalid}
                id='GRT'
                label='GRT (MT)'
                type='decimal'
                onChange={this.handleChange}
                value={GRT || ''}
                autoComplete='off'
                helperText={validity && validity.GRT && validity.GRT.isInvalid ? miscUtils.getErrorMessage(validity.GRT.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 10 }}
                error={validity && validity.NRT && validity.NRT.isInvalid}
                id='NRT'
                label='NRT (MT)'
                type='decimal'
                onChange={this.handleChange}
                value={NRT || ''}
                autoComplete='off'
                helperText={validity && validity.NRT && validity.NRT.isInvalid ? miscUtils.getErrorMessage(validity.NRT.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 10 }}
                error={validity && validity.TPC && validity.TPC.isInvalid}
                id='TPC'
                label='TPC (MT/CBM)'
                type='decimal'
                onChange={this.handleChange}
                value={TPC || ''}
                autoComplete='off'
                helperText={validity && validity.TPC && validity.TPC.isInvalid ? miscUtils.getErrorMessage(validity.TPC.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 10 }}
                error={validity && validity.holdsHatches && validity.holdsHatches.isInvalid}
                id='holdsHatches'
                label='Holds/Hatches'
                type='allCharacters'
                onChange={this.handleChange}
                value={holdsHatches || ''}
                autoComplete='off'
                helperText={validity && validity.holdsHatches && validity.holdsHatches.isInvalid ? miscUtils.getErrorMessage(validity.holdsHatches.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 10 }}
                error={validity && validity.grainCapacity && validity.grainCapacity.isInvalid}
                id='grainCapacity'
                label='Grain Capacity (CBM)'
                type='decimal'
                onChange={this.handleChange}
                value={grainCapacity || ''}
                autoComplete='off'
                helperText={validity && validity.grainCapacity && validity.grainCapacity.isInvalid ? miscUtils.getErrorMessage(validity.grainCapacity.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 10 }}
                error={validity && validity.baleCapacity && validity.baleCapacity.isInvalid}
                id='baleCapacity'
                label='Bale Capacity (CBM)'
                type='decimal'
                onChange={this.handleChange}
                value={baleCapacity || ''}
                autoComplete='off'
                helperText={validity && validity.baleCapacity && validity.baleCapacity.isInvalid ? miscUtils.getErrorMessage(validity.baleCapacity.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 10 }}
                error={validity && validity.cranes && validity.cranes.isInvalid}
                id='cranes'
                label='Cranes (MT)'
                type='allCharacters'
                onChange={this.handleChange}
                value={cranes || ''}
                autoComplete='off'
                helperText={validity && validity.cranes && validity.cranes.isInvalid ? miscUtils.getErrorMessage(validity.cranes.validationtype) : ''}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} className='field-grid'>
              <TextField
                inputProps={{ maxLength: 10 }}
                error={validity && validity.grabs && validity.grabs.isInvalid}
                id='grabs'
                label='Grabs (CBM)'
                type='allCharacters'
                onChange={this.handleChange}
                value={grabs || ''}
                autoComplete='off'
                helperText={validity && validity.grabs && validity.grabs.isInvalid ? miscUtils.getErrorMessage(validity.grabs.validationtype) : ''}
              />
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

export default AddNewVessel;
