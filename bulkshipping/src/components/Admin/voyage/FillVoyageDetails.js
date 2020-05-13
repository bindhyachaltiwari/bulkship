import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import '../../../css/Admin.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import FormHelperText from '@material-ui/core/FormHelperText'
import api from '../../api';
import { Checkbox } from '@material-ui/core';
import AddDynamicField from '../common/AddDynamicField';


class FillVoyageDetails extends Component {

  localState = {
    voyageDetails: {
      chartererName: '',
      vesselName: '',
      vesselSize: '',
      cpDate: new Date(),
      loadPort: '',
      cargo: '',
      cargoIntake: '',
      ownerName: '',
      shipper: '',
      loadPortAgent: '',
      dischargePoint: '',
      receiver: '',
      onHireSurveyor: '',
      offHireSurveyor: '',
      bunkerSupplier: '',
      bunkerTrader: '',
      pniInsurance: '',
      weatherRoutingCompany: '',
      fieldVisibility: {},
      otherFields: {}
    },
    clientList: [],
    vesselList: [],
    newFields: []
  }

  constructor(props) {
    super(props);
    this.state = { ...this.localState };
    this.handleAdminChange = this.handleAdminChange.bind(this);
    this.handleVesselDetailSubmit = this.handleVesselDetailSubmit.bind(this);
    this.handleChartererNameChange = this.handleChartererNameChange.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  componentWillMount() {
    this.getAllClientList();
    this.getAllVesselsList();
  }

  handleChartererNameChange = e => {
    const { voyageDetails } = this.state;
    Object.assign(voyageDetails, { chartererName: e.value });
    this.setState({ voyageDetails });
  };

  handleVesselNameChange = e => {
    const { voyageDetails } = this.state;
    Object.assign(voyageDetails, { vesselName: e.value });
    this.setState({ voyageDetails });
  };

  handleAdminChange = e => {
    e.preventDefault();
    const { value, name } = e.target;
    const { voyageDetails } = this.state;
    Object.assign(voyageDetails, { [name]: value });
    this.setState({ voyageDetails });
  };

  handleDateFieldChange = value => {
    const { voyageDetails } = this.state;
    Object.assign(voyageDetails, { cpDate: value });
    this.setState({ voyageDetails });
  };

  handleCheckBoxChange = e => {
    const { checked, name } = e.target;
    const { voyageDetails } = this.state;
    let { fieldVisibility } = voyageDetails;
    if (!fieldVisibility[name]) {
      Object.assign(fieldVisibility, { [name]: checked });
    } else if (fieldVisibility[name] && !checked) {
      delete fieldVisibility[name];
    }
    this.setState({
      voyageDetails: {
        ...this.state.voyageDetails,
        fieldVisibility
      }
    });
  }

  handleBackButton = () => this.props.history.goBack();

  getAllClientList = async () => {
    const res = await api.getAllClientList();
    if (res.data.status) {
      const clientList = res.data.clientList.sort().map(v => ({
        label: v, value: v
      }));
      this.setState({ clientList, error: false });
    } else {
      this.setState({ error: true });
      return;
    }
  }

  getAllVesselsList = async () => {
    const res = await api.getAllVesselsList();
    if (res.data.status) {
      const vesselList = res.data.vesselList.map(m => m.vesselName + '_' + m.DWT).sort().map(v => ({
        label: v, value: v
      }));
      this.setState({ vesselList, error: false });
    } else {
      this.setState({ error: true });
      return;
    }
  }

  submitNewFieldDetails = e => {
    e.preventDefault();
    console.log(e)
    const inputs = e.target.querySelectorAll('input');
    if (inputs && inputs.length) {
      const voyageDetails = this.state.voyageDetails;
      Object.assign(voyageDetails.otherFields, { [inputs[0].value.trim()]: inputs[1].value.trim() });
      this.setState({ voyageDetails });
      document.getElementById('newFieldForm').reset();
      this.displayOtherFields();
    }
  };

  async handleVesselDetailSubmit(event) {
    event.preventDefault();
    const { voyageDetails } = this.state;
    const { chartererName, vesselName, cpDate } = voyageDetails;
    if (!chartererName || !vesselName || !cpDate.toString()) {
      this.setState({
        success: false,
        errorMsg: 'Please fill the required details'
      });
      return;
    }

    let data = await api.insertPerformanceData({ cpDate, vesselName, chartererName, isDetailsFilled: false });
    data = await api.insertVoyageData({ voyageDetails });
    if (data.data.status.errors || data.data.status.errmsg) {
      this.setState({
        success: false,
        errorMsg: data.data.status.errmsg
      });
      return;
    } else {
      this.setState({
        ...this.localState.voyageDetails,
        success: false,
        errorMsg: 'Success!! Voyage Details saved for = ' + chartererName
      });
      document.getElementById('voyageDetailsForm').reset();
      if (document.getElementById('newFieldForm')) {
        document.getElementById('newFieldForm').reset();
      }
      return;
    }
  }

  render() {
    const { clientList, vesselList, newFields } = this.state;
    return (
      <div className='about_us_2 about_us_2_animated'>
        <Button variant='contained' color='primary' onClick={this.handleBackButton} style={{ top: '4%', left: '10%', position: 'fixed' }}>
          Back
        </Button>
        <h2>Fill Voyage Details</h2>
        <AddDynamicField submitNewFieldDetails={this.submitNewFieldDetails} />
        <FormHelperText style={{ textAlign: 'center', fontSize: 'large' }} error={Boolean(!this.state.success)}>
          {this.state.success ? '' : this.state.errorMsg}
        </FormHelperText>
        <form id='voyageDetailsForm' onSubmit={this.handleVesselDetailSubmit} style={{ margin: '1%' }}>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
                <th>Visible</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label>
                    Charterer Name *
                </label>
                </td>
                <td>
                  <Select
                    value={clientList.filter(({ value }) => value === this.state.voyageDetails.chartererName)}
                    onChange={this.handleChartererNameChange}
                    options={clientList}
                    placeholder='Select Charterer Name'
                    required
                  />
                </td>
                <td>
                  <Checkbox
                    defaultChecked
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Vessel Name *
                </label>
                </td>
                <td>
                  <Select
                    value={vesselList.filter(({ value }) => value === this.state.voyageDetails.vesselName)}
                    onChange={this.handleVesselNameChange}
                    options={vesselList}
                    placeholder='Select Vessel Name'
                    required
                  />
                </td>
                <td>
                  <Checkbox
                    defaultChecked
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    CP Date *
                </label>
                </td>
                <td>
                  <DatePicker selected={this.state.voyageDetails.cpDate} onChange={this.handleDateFieldChange} value={this.state.voyageDetails.cpDate} required autoComplete='off' maxDate={new Date()}
                    placeholderText='Select a date before 1 day in the future' />
                </td>
                <td>
                  <Checkbox
                    defaultChecked
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Vessel Size
                </label>
                </td>
                <td>
                  <input type='text' name='vesselSize' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='vesselSize'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Load Port
                </label>
                </td>
                <td>
                  <input type='text' name='loadPort' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='loadPort'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Discharge Point
                </label>
                </td>
                <td>
                  <input type='text' name='dischargePoint' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='dischargePoint'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Cargo
                </label>
                </td>
                <td>
                  <input type='text' name='cargo' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='cargo'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Cargo Intake
                </label>
                </td>
                <td>
                  <input type='text' name='cargoIntake' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='cargoIntake'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Owner Name
                </label>
                </td>
                <td>
                  <input type='text' name='ownerName' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='ownerName'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Shipper
                </label>
                </td>
                <td>
                  <input type='text' name='shipper' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='shipper'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Load Port Agent
                </label>
                </td>
                <td>
                  <input type='text' name='loadPortAgent' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='loadPortAgent'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Discharge Port Agent
                </label>
                </td>
                <td>
                  <input type='text' name='dischargePortAgent' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='dischargePortAgent'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Receiver
                </label>
                </td>
                <td>
                  <input type='text' name='receiver' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='receiver'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    On Hire Surveyor
                </label>
                </td>
                <td>
                  <input type='text' name='onHireSurveyor' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='onHireSurveyor'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Off Hire Surveyor
                </label>
                </td>
                <td>
                  <input type='text' name='offHireSurveyor' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='offHireSurveyor'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Bunker Supplier
                </label>
                </td>
                <td>
                  <input type='text' name='bunkerSupplier' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='bunkerSupplier'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Bunker Trader
                </label>
                </td>
                <td>
                  <input type='text' name='bunkerTrader' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='bunkerTrader'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    PNI Insurance
                </label>
                </td>
                <td>
                  <input type='text' name='pniInsurance' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='pniInsurance'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Weather Routing Company
                </label>
                </td>
                <td>
                  <input type='text' name='weatherRoutingCompany' onChange={this.handleAdminChange} />
                </td>
                <td>
                  <Checkbox
                    name='weatherRoutingCompany'
                    color='primary'
                    onChange={this.handleCheckBoxChange}
                  />
                </td>
              </tr>
              {newFields}
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
      </div>
    );
  }

  displayOtherFields() {
    const otherFields = this.state.voyageDetails.otherFields;
    let data = [];
    if (otherFields && Object.keys(otherFields).length) {
      const keys = Object.keys(otherFields);
      for (let i = 0; i < keys.length; i++) {
        data.push(<tr key={i}>
          <td key={keys[i]}>
            <label>
              {keys[i]}
            </label>
          </td>
          <td key={otherFields[keys[i]]}>
            <input type='text' maxLength={50} required name={keys[i]} onChange={this.handleNewFieldDetailsChange} defaultValue={otherFields[keys[i]]} />
          </td>
          <td>
            <Checkbox name={keys[i]} color='primary' onChange={this.handleCheckBoxChange} />
          </td>
        </tr>)
      }
    }
    this.setState({ newFields: data });
  }


}

export default FillVoyageDetails;