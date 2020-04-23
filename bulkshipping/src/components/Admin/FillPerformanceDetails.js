import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ShowDropDownAdmin from './ShowDropDownAdmin';
import FormHelperText from '@material-ui/core/FormHelperText'
import api from '../api';
class FillPerformanceDetails extends Component {

  constructor(props) {
    super(props);
    this.getAllVesselsPerformance();
    this.handleVesselListChange = this.handleVesselListChange.bind(this);
    this.handleClientListChange = this.handleClientListChange.bind(this);
    this.handleCpDateChange = this.handleCpDateChange.bind(this);
    this.handlePerformanceDetailSubmit = this.handlePerformanceDetailSubmit.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.state = {
      vesselList: [],
      selectedClient: 'SelectClient',
      selectedVessel: 'SelectVessel',
      selectedCpDate: 'SelectCpDate',
      allClients: [],
      allVslForSelectedClient: [],
      allCpDatesForSelectedClient: [],
      error: false,
      performanceDetails: {

      },
    }
  }

  handlePerformanceDetailsChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      performanceDetails: {
        ...this.state.performanceDetails,
        [name]: value.trim(),
      },
      success: true,
      errorMsg: ''
    });
  }

  getAllVesselsPerformance = async () => {
    const res = await api.getAllVesselsPerformance({ 'isDetailsFilled': false });
    if (res.data.status) {
      const allClients = [...new Set(res.data.vesselList.map(m => m.chartererName))];
      this.setState({
        vesselList: res.data.vesselList,
        allClients: allClients,
        error: false,
      });
    } else {
      this.setState({ error: true });
      return;
    }
  };

  handleCpDateChange = e => {
    const { vesselList, selectedVessel } = this.state;
    let vesselDetails = vesselList.find(m => m.vesselName === selectedVessel && m.cpDate === e.value);
    vesselDetails = (({ chartererName, vesselName, vesselSize, cpDate, loadPort, cargo, cargoIntake, onwerName }) => (
      { chartererName, vesselName, vesselSize, cpDate, loadPort, cargo, cargoIntake, onwerName }))(vesselDetails);
    this.setState({
      vesselDetails: vesselDetails,
      selectedCpDate: e.value,
      isPeformancePage: false,
      success: true,
      errorMsg: ''
    });
  };

  handleVesselListChange = async e => {
    const { selectedVessel, vesselList, selectedClient } = this.state;
    if (e.value !== selectedVessel) {
      this.setState({ selectedCpDate: 'SelectCpDate' });
    }

    const allCpDates = vesselList.filter(f => f.vesselName === e.value && f.chartererName === selectedClient).map(m => m.cpDate);
    if (!allCpDates.length || (allCpDates.length === 1 && allCpDates[0] === '')) {
      this.setState({
        allCpDatesForSelectedClient: [],
        selectedVessel: e.value,
        selectedCpDate: 'SelectCpDate',
        isPeformancePage: false,
        error: true,
      });
      return;
    }

    this.setState({
      allCpDatesForSelectedClient: allCpDates,
      selectedVessel: e.value,
      selectedCpDate: 'SelectCpDate',
      isPeformancePage: false,
      error: false,
    });
  }

  handleClientListChange = e => {
    const { selectedClient, vesselList } = this.state;
    if (e.value !== selectedClient) {
      this.setState({ selectedCpDate: 'SelectCpDate', selectedVessel: 'SelectVessel' });
    }

    const allVessels = [...new Set(vesselList.filter(m => m.chartererName === e.value).map(m => m.vesselName))];
    if (!allVessels.length || (allVessels.length === 1 && allVessels[0] === '')) {
      this.setState({
        allVslForSelectedClient: [],
        selectedClient: e.value,
        selectedVessel: 'SelectVessel',
        selectedCpDate: 'SelectCpDate',
        error: true
      });
      return;
    }

    this.setState({
      allVslForSelectedClient: allVessels,
      selectedClient: e.value,
      selectedVessel: 'SelectVessel',
      selectedCpDate: 'SelectCpDate',
      error: false
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
    if (data.data.status.errors || data.data.status.errmsg) {
      this.setState({
        success: false,
        errorMsg: data.data.status.errmsg
      });
      return;
    } else {
      document.getElementById('performanceDetailsForm').reset();
      this.setState({
        performanceDetails: {},
        success: false,
        errorMsg: 'Success!! Performance Details saved for = ' + this.state.selectedClient
      });
      return;
    }
  }

  render() {
    const { selectedCpDate } = this.state;
    let showTable;
    if (selectedCpDate !== 'SelectCpDate') {
      showTable = <div>
        <Button variant="contained" color="primary" onClick={this.handleBackButton} style={{ top: "4%", left: "10%", position: "fixed" }}>
          Back
        </Button>
        <form id='performanceDetailsForm' onSubmit={this.handlePerformanceDetailSubmit} style={{ margin: "1%" }}>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Original Value</th>
                <th>Actual Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label>
                    Number of Days *
                  </label>
                </td>
                <td>
                  <input type="text" name="NumberOfDaysOrg" required onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="NumberOfDaysAct" required onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Bunker Consumption (MT) *
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
                  <input type="text" name="BunkerConsumptionIFOOrg" required onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="BunkerConsumptionIFOAct" required onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    MDO
              </label>
                </td>
                <td>
                  <input type="text" name="BunkerConsumptionMDOOrg" required onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="BunkerConsumptionMDOAct" required onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Bunker Price *
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
                  <input type="text" name="BunkerPriceIFOOrg" required onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="BunkerPriceIFOAct" required onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    MDO
              </label>
                </td>
                <td>
                  <input type="text" name="BunkerPriceMDOOrg" required onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="BunkerPriceMDOAct" required onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Load Port DA *
              </label>
                </td>
                <td>
                  <input type="text" name="LoadPortDAOrg" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="LoadPortDAAct" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Discharge Port DA *
              </label>
                </td>
                <td>
                  <input type="text" name="DischargePortDAOrg" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="DischargePortDAAct" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    ILOHC and CVE
              </label>
                </td>
                <td>
                  <input type="text" name="ILOHCandCVEOrg" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="ILOHCandCVEAct" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Bunker Survey Cost Bends *
              </label>
                </td>
                <td>
                  <input type="text" name="BunkerSurveyCostBendsOrg" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="BunkerSurveyCostBendsAct" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    WX Routing Expense *
              </label>
                </td>
                <td>
                  <input type="text" name="WXRoutingExpenseOrg" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="WXRoutingExpenseAct" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    PNI Insurance *
              </label>
                </td>
                <td>
                  <input type="text" name="PNIInsuranceOrg" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="PNIInsuranceAct" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Despatch Paid
              </label>
                </td>
                <td>
                  <input type="text" name="DespatchPaidOrg" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="DespatchPaidAct" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Other Expense
              </label>
                </td>
                <td>
                  <input type="text" name="OtherExpenseOrg" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="OtherExpenseAct" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    HRA/WAR Risk
              </label>
                </td>
                <td>
                  <input type="text" name="HRA_WARRiskOrg" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="HRA_WARRiskAct" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Demmurrage Received
              </label>
                </td>
                <td>
                  <input type="text" name="DemmurrageReceivedOrg" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="DemmurrageReceivedAct" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Cargo Quantity (MT)
              </label>
                </td>
                <td>
                  <input type="text" name="CargoQuantityOrg" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
                </td>
                <td>
                  <input type="text" name="CargoQuantityAct" onChange={this.handlePerformanceDetailsChange} autoComplete="off" />
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
    }
    return (
      <div className="about_us_2 about_us_2_animated">
        <h2>Fill Performance Details</h2>
        <FormHelperText style={{ textAlign: 'center', fontSize: 'large' }} error={Boolean(!this.state.success)}>
          {this.state.success ? '' : this.state.errorMsg}
        </FormHelperText>
        <Button variant="contained" color="primary" onClick={this.handleBackButton} style={{ top: "4%", left: "10%", position: "fixed" }}>
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