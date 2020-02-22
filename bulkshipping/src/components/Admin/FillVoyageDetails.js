import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import '../../css/Admin.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import FormHelperText from '@material-ui/core/FormHelperText'

class FillVoyageDetails extends Component {

  localState = {
    vesselDetails: {
      chartererName: '',
      vesselName: '',
      vesselSize: '',
      cpDate: new Date(),
      loadPort: '',
      cargo: '',
      cargoIntake: '',
      onwerName: '',
      Shipper: '',
      loadPortAgent: '',
      dischargePoint: '',
      receiver: '',
      onHireSurveyor: '',
      offHireSurveyor: '',
      bunkerSupplier: '',
      bunkerTrader: '',
      pniInsurance: '',
      weatherRoutingCompany: '',
    },
    clientList: [],
    vesselList: []
  }

  constructor(props) {
    super(props);
    this.state = { ...this.localState };
    this.handleAdminChange = this.handleAdminChange.bind(this);
    this.handleVesselDetailSubmit = this.handleVesselDetailSubmit.bind(this);
    this.handleChartererNameChange = this.handleChartererNameChange.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentWillMount() {
    this.getAllClients();
    this.getAllVessels();
  }

  handleChartererNameChange = e => {
    this.setState({
      vesselDetails: {
        ...this.state.vesselDetails,
        chartererName: e.value,
      }
    });
  };

  handleVesselNameChange = e => {
    this.setState({
      vesselDetails: {
        ...this.state.vesselDetails,
        vesselName: e.value,
      }
    });
  };

  handleAdminChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      vesselDetails: {
        ...this.state.vesselDetails,
        [name]: value,
      }
    });
  };

  handleDateFieldChange = (V) => {
    this.setState({
      vesselDetails: {
        ...this.state.vesselDetails,
        cpDate: V
      }
    })
  };

  handleBackButton() {
    this.props.history.goBack();
  }

  getAllClients = async () => {
    await axios.post('http://localhost:3003/userDetails/getAllClients', {
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      if (res.data.status) {
        const cl = res.data.clientList.sort().map(v => ({
          label: v,
          value: v
        }));
        this.setState({
          clientList: cl,
          error: false,
        });
      } else {
        this.setState({ error: true });
        return;
      }
    });
  }

  getAllVessels = async () => {
    await axios.post('http://localhost:3003/vesselDetails/getAllVessels', {
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      if (res.data.status) {
        const vl = res.data.vesselList.map(m => m.vesselName + '_' + m.DWT).sort().map(v => ({
          label: v,
          value: v
        }));
        this.setState({
          vesselList: vl,
          error: false,
        });

      } else {
        this.setState({ error: true });
        return;
      }
    });
  }

  async handleVesselDetailSubmit(event) {
    event.preventDefault();
    const { chartererName, vesselName, cpDate } = this.state.vesselDetails;
    if (!chartererName || !vesselName || !cpDate.toString()) {
      this.setState({
        success: false,
        errorMsg: 'Please fill the required details'
      });
      return;
    }

    let data = (await axios.post('http://localhost:3003/performanceDetails/insertPerformanceData', {
      headers: { 'Content-Type': 'application/json' },
      data: {
        cpDate: this.state.vesselDetails.cpDate,
        vesselName: this.state.vesselDetails.vesselName,
        chartererName: this.state.vesselDetails.chartererName,
        isDetailsFilled: false,
      }
    }));

    data = (await axios.post('http://localhost:3003/voyageDetails/insertVoyageData', {
      headers: { 'Content-Type': 'application/json' },
      data: {
        ...this.state.vesselDetails
      }
    }));

    if (data.data.status.errors || data.data.status.errmsg) {
      this.setState({
        success: false,
        errorMsg: data.data.status.errmsg
      });
      return;
    } else {
      this.setState({
        ...this.localState.vesselDetails,
        success: false,
        errorMsg: 'Success!! Voyage Details saved for = ' + chartererName
      });
      document.getElementById('voyageDetailsForm').reset();
      return;
    }
  }

  render() {
    const { clientList, vesselList } = this.state;
    return (
      <div className="about_us_2 about_us_2_animated">
        <Button variant="contained" color="primary" onClick={this.handleBackButton} style={{ top: "4%", left: "10%", position: "fixed" }}>
          Back
        </Button>
        <h2>Fill Voyage Details</h2>
        <FormHelperText style={{ textAlign: 'center', fontSize: 'large' }} error={Boolean(!this.state.success)}>
          {this.state.success ? '' : this.state.errorMsg}
        </FormHelperText>
        <form id='voyageDetailsForm' onSubmit={this.handleVesselDetailSubmit} style={{ margin: "1%" }}>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
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
                    value={clientList.filter(({ value }) => value === this.state.vesselDetails.chartererName)}
                    onChange={this.handleChartererNameChange}
                    options={clientList}
                    placeholder='Select Charterer Name'
                    required
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
                    value={vesselList.filter(({ value }) => value === this.state.vesselDetails.vesselName)}
                    onChange={this.handleVesselNameChange}
                    options={vesselList}
                    placeholder='Select Vessel Name'
                    required
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
                  <input type="text" name="vesselSize" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    CP Date *
                </label>
                </td>
                <td>
                  <DatePicker selected={this.state.vesselDetails.cpDate} onChange={this.handleDateFieldChange} value={this.state.vesselDetails.cpDate} required autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Load Port
                </label>
                </td>
                <td>
                  <input type="text" name="loadPort" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Discharge Point
                </label>
                </td>
                <td>
                  <input type="text" name="dischargePoint" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Cargo
                </label>
                </td>
                <td>
                  <input type="text" name="cargo" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Cargo Intake
                </label>
                </td>
                <td>
                  <input type="text" name="cargoIntake" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Owner Name
                </label>
                </td>
                <td>
                  <input type="text" name="onwerName" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Shipper
                </label>
                </td>
                <td>
                  <input type="text" name="Shipper" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Load Port Agent
                </label>
                </td>
                <td>
                  <input type="text" name="loadPortAgent" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Discharge Port Agent
                </label>
                </td>
                <td>
                  <input type="text" name="dischargePortAgent" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Receiver
                </label>
                </td>
                <td>
                  <input type="text" name="receiver" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    On Hire Surveyor
                </label>
                </td>
                <td>
                  <input type="text" name="onHireSurveyor" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Off Hire Surveyor
                </label>
                </td>
                <td>
                  <input type="text" name="offHireSurveyor" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Bunker Supplier
                </label>
                </td>
                <td>
                  <input type="text" name="bunkerSupplier" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Bunker Trader
                </label>
                </td>
                <td>
                  <input type="text" name="bunkerTrader" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    PNI Insurance
                </label>
                </td>
                <td>
                  <input type="text" name="pniInsurance" onChange={this.handleAdminChange} />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Weather Routing Company
                </label>
                </td>
                <td>
                  <input type="text" name="weatherRoutingCompany" onChange={this.handleAdminChange} />
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            type="submit"
            variant="raised"
            color="primary"
            style={{ margin: '16px' }}>
            {'Submit'}
          </Button>
        </form>
      </div>
    );
  }
}

export default FillVoyageDetails;