import React, { Component } from 'react';
import api from '../../api';
import { Link } from 'react-router-dom';
import ShowDropDownAdmin from '../common/ShowDropDownAdmin';
import FormHelperText from '@material-ui/core/FormHelperText'
import '../../../css/Admin.css';
import ViewPerformanceModule from './ViewPerformanceModule';
import { Grid } from '@material-ui/core';
import LeftMenu from '../../../components/Common/LeftMenu';

class ViewPerformanceDetails extends Component {

    constructor(props) {
        super(props);
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

    async componentDidMount() {
        const res = await api.getAllVesselsPerformance({ isDetailsFilled: true });
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
    }

    handleCpDateChange = async e => {
        const { vesselList, selectedVessel, selectedClient, selectedCpDate } = this.state;
        if (selectedCpDate && e.value === selectedCpDate) return;
        const performanceDetails = vesselList.find(m => m.vesselName === selectedVessel && m.chartererName === selectedClient && m.cpDate === e.value);
        const res = await api.getPortDetails({ userName: selectedClient, vesselName: selectedVessel, cpDate: e.value });
        if (res.data.status) {
            this.setState({
                portDetails: res.data.portDetails,
                performanceDetails,
                selectedCpDate: e.value,
                error: false,
            });
        } else {
            this.setState({ error: true, errorMsg: 'Failed to fetch data' });
        }
        this.setState({
            performanceDetails,
            selectedCpDate: e.value,
            error: false
        });

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
        this.setState({
            allVslForSelectedClient: allVessels,
            selectedClient: e.value,
            selectedVessel: '',
            selectedCpDate: '',
            error: false,
            performanceDetails: {}
        });
    }

    render() {
        const { selectedCpDate, error, performanceDetails, portDetails } = this.state;
        const { addressCommission, bunkerIFOAct, bunkerIFOOrg, bunkerMDOAct, bunkerMDOOrg, dischargePortDAAct$, dischargePortDAOrg$,
            dischargePortDelay, intermediatePortDelay, loadPortDAAct$, loadPortDAOrg$, loadPortDelay, tcHire, freightAct, freightOrg,
            totalAct, totalOrg, voyageDays, CargoQuantityAct, CargoQuantityOrg, ILOHCandCVEAct$, ILOHCandCVEOrg$, PNIInsuranceAct$, PNIInsuranceOrg$,
            bunkerSurveyCostBendsAct$, bunkerSurveyCostBendsOrg$, despatchPaidAct$, despatchPaidOrg$, otherExpenseOrg$, otherExpenseAct$, wXRoutingExpenseAct$, wXRoutingExpenseOrg$,
            demmurrageReceivedOrg$, demmurrageReceivedAct$, HraWarRiskOrg$, HraWarRiskAct$, remarks, loadPort, dischargePort } = performanceDetails;
        let showTable;
        let showAddPerformance = false;
        let showEditPerformance = false;
        if ((localStorage.getItem('userRole').toLowerCase() === 'admin') || (localStorage.getItem('managerRoles') && JSON.parse(localStorage.getItem('managerRoles')).FillPerformance)) {
            showAddPerformance = true;
        }
        if ((localStorage.getItem('userRole').toLowerCase() === 'admin') || (localStorage.getItem('managerRoles') && JSON.parse(localStorage.getItem('managerRoles')).EditPerformance)) {
            showEditPerformance = true;
        }
        if (selectedCpDate) {
            showTable = <div>
                <form style={{ margin: '1%' }}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label> Load Port</label>
                                </td>
                                <td>
                                    <input type='text' disabled value={portDetails ? portDetails.loadPort : ''} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label> Discharge Port</label>
                                </td>
                                <td>
                                    <input type='text' disabled value={portDetails ? portDetails.dischargePort : ''} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>  TC Hire (Per day)</label>
                                </td>
                                <td>
                                    <input type='text' disabled value={tcHire || 0} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>   Address Commission</label>
                                </td>
                                <td>
                                    <input type='text' disabled value={addressCommission || 0} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <br />
                <form style={{ margin: '1%' }}>
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
                                    <label>Voyage Days</label>
                                </td>
                                <ViewPerformanceModule obj={voyageDays} />
                            </tr>
                            <tr>
                                <td>
                                    <label>Delays at Port</label>
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
                                    <label>Load Port Delay</label>
                                </td>
                                <ViewPerformanceModule obj={loadPortDelay} />
                            </tr>
                            <tr>
                                <td>
                                    <label> Discharge Port Delay</label>
                                </td>
                                <ViewPerformanceModule obj={dischargePortDelay} />
                            </tr>
                            <tr>
                                <td>
                                    <label> Intermediate Port Delays</label>
                                </td>
                                <ViewPerformanceModule obj={intermediatePortDelay} />
                            </tr>
                            <tr>
                                <td>
                                    <label> Bunker Consumption (MT)</label>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <label>IFO</label>
                                </td>
                                <td>
                                    <input type='text' disabled value={bunkerIFOOrg && bunkerIFOOrg.consumption ? bunkerIFOOrg.consumption : 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={bunkerIFOAct && bunkerIFOAct.consumption ? bunkerIFOAct.consumption : 0} />
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label> MDO</label>
                                </td>
                                <td>
                                    <input type='text' disabled value={bunkerMDOOrg && bunkerMDOOrg.consumption ? bunkerMDOOrg.consumption : 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={bunkerMDOAct && bunkerMDOAct.consumption ? bunkerMDOAct.consumption : 0} />
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Bunker Price (USD)</label>
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>
                                    <label>IFO</label></td>
                                <td>
                                    <input type='text' disabled value={bunkerIFOOrg && bunkerIFOOrg.price ? bunkerIFOOrg.price : 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={bunkerIFOAct && bunkerIFOAct.price ? bunkerIFOAct.price : 0} />
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
                                    <label>MDO</label>
                                </td>
                                <td>
                                    <input type='text' disabled value={bunkerMDOOrg && bunkerMDOOrg.price ? bunkerMDOOrg.price : 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={bunkerMDOAct && bunkerMDOAct.price ? bunkerMDOAct.price : 0} />
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
                                    <label> Load Port DA</label>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <input type='text' disabled value={loadPortDAOrg$ || 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={loadPortDAAct$ || 0} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Discharge Port DA</label>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <input type='text' disabled value={dischargePortDAOrg$ || 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={dischargePortDAAct$ || 0} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>ILOHC and CVE</label>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <input type='text' disabled value={ILOHCandCVEOrg$ || 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={ILOHCandCVEAct$ || 0} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Bunker Survey Cost Bends</label>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <input type='text' disabled value={bunkerSurveyCostBendsOrg$ || 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={bunkerSurveyCostBendsAct$ || 0} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>WX Routing Expense</label>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <input type='text' disabled value={wXRoutingExpenseOrg$ || 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={wXRoutingExpenseAct$ || 0} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>PNI Insurance</label>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <input type='text' disabled value={PNIInsuranceOrg$ || 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={PNIInsuranceAct$ || 0} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Despatch Paid</label>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <input type='text' disabled value={despatchPaidOrg$ || 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={despatchPaidAct$ || 0} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Other Expense</label>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <input type='text' disabled value={otherExpenseOrg$ || 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={otherExpenseAct$ || 0} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>HRA/WAR Risk</label>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <input type='text' disabled value={HraWarRiskOrg$ || 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={HraWarRiskAct$ || 0} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Demmurrage Received</label>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <input type='text' disabled value={demmurrageReceivedOrg$ || 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={demmurrageReceivedAct$ || 0} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Cargo Quantity (MT)</label>
                                </td>
                                <td>
                                    <input type='text' disabled value={CargoQuantityOrg || 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={CargoQuantityAct || 0} />
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Total</label>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <input type='text' disabled value={totalOrg || 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={totalAct || 0} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Freight (USD/MT)</label>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <input type='text' disabled value={freightOrg || 0} />
                                </td>
                                <td>
                                    <input type='text' disabled value={freightAct || 0} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Remark</label>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                    <input type='text' disabled value={remarks || ''} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div >
        }
        return (
            <Grid container direction='row' className='main-container'>
                <LeftMenu />
                <Grid item xs={12} md={9} lg={9}>
                    <section className='right right-section'>
                        <div className='right-container'>
                            <section className='component-wrapper'>
                                <h2>View Performance Details</h2>
                                {showAddPerformance ? (<Link className='addLink' to='/fillPerformanceDetails'>Fill Performance Details</Link>) : (<></>)}
                                {showEditPerformance ? (<Link className='addLink' to='/editPerformanceDetails'>Edit Performance Details</Link>) : (<></>)}
                                <div className='about_us_2 about_us_2_animated'>
                                    <FormHelperText style={{ textAlign: 'center', fontSize: 'large' }} error={error}>
                                        {error ? this.state.errorMsg : ''}
                                    </FormHelperText>
                                    <ShowDropDownAdmin
                                        handleClientListChange={this.handleClientListChange}
                                        handleVesselListChange={this.handleVesselListChange}
                                        handleCpDateChange={this.handleCpDateChange}
                                        state={this.state}
                                    />
                                    <br />
                                    {showTable}
                                </div>
                            </section>
                        </div>
                    </section>
                </Grid>
            </Grid>
        )
    }
}

export default ViewPerformanceDetails;
