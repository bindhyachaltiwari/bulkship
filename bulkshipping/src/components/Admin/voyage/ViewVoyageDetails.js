import React, { Component } from 'react';
import { Datatable } from '@o2xp/react-datatable';
import { withRouter, Link } from 'react-router-dom';
import api from '../../api';
import DisplaySelectedVesselDetails from '../../Client/DisplaySelectedVesselDetails';
import Popup from 'reactjs-popup';
import { Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import LeftMenu from '../../../components/Common/LeftMenu';
class ViewVoyageDetails extends Component {

    localState = {
        voyageList: [],
        isEditPage: false,
    }

    constructor(props) {
        super(props);
        if (props && props.history && props.history.location.pathname === '/editVoyageDetails') {
            this.localState.isEditPage = true;
        }
        if (props && props.history && props.history.location && props.history.location.state) {
            this.localState.userNameFromViewUsers = props.history.location.state.userName
        }
        if (localStorage.getItem('managerRoles')) {
            this.localState.isEditPage = JSON.parse(localStorage.getItem('managerRoles')).EditVoyage;
        }
        this.state = { ...this.localState };
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    async componentDidMount() {
        const res = await api.getAllVoyageDetails();
        if (res.data.status) {
            this.setState({
                voyageList: res.data.voyageList,
                error: false,
            });
        } else {
            this.setState({ error: true });
        }
    }

    handleBackButton() {
        this.props.history.goBack();
    }

    buildCustomTableBodyCell = ({ cellVal, column, rowId }) => {
        let val;
        switch (column.id) {
            case 'otherFields':
                val = this.getPopupContent_OtherFields(cellVal, rowId);
                break;
            case 'fieldVisibility':
                val = this.getPopupContent_FieldVisibility(cellVal, rowId);
                break;
            default:
                val = <div title={cellVal} style={{ color: 'blue' }}>{cellVal}</div>;
                break;
        }
        return val;
    };

    render() {
        let { voyageList, isEditPage, userNameFromViewUsers } = this.state;
        let showAddVoyage = false;
        if ((localStorage.getItem('userRole').toLowerCase() ==='admin') || (localStorage.getItem('managerRoles') && JSON.parse(localStorage.getItem('managerRoles')).FillVoyage)) {
            showAddVoyage = true;
        }
        if (userNameFromViewUsers) {
            voyageList = voyageList.filter(f => f.chartererName === this.state.userNameFromViewUsers)
        }
        const options = {
            title: 'Client List',
            keyColumn: '_id',
            font: 'Arial',
            dimensions: {
                datatable: {
                    width: '90%',
                    height: '648px',
                },
                row: {
                    height: '10px'
                }
            },
            stripped: true,
            features: {
                canSearch: true,
                canDownload: true,
                canPrint: true,
                canOrderColumns: true,
                canRefreshRows: true,
                rowsPerPage: {
                    available: [5, 10, 25, 50, 100],
                    selected: 10
                },
            },
            data: {
                columns: [
                    {
                        id: 'chartererName',
                        label: 'Charterer Name',
                        colSize: '50px',
                        editable: false,
                    }, {
                        id: 'vesselName',
                        label: 'Vessel Name',
                        colSize: '50px',
                        editable: false,
                    }, {
                        id: 'cpDate',
                        label: 'CP Date',
                        colSize: '50px',
                        editable: false,
                    }, {
                        id: 'vesselSize',
                        label: ' Vessel Size',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'loadPort',
                        label: ' Load Port',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'dischargePort',
                        label: 'Discharge Point',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'cargo',
                        label: 'Cargo',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'cargoIntake',
                        label: ' Cargo Intake',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'ownerName',
                        label: 'Owner Name',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'shipper',
                        label: 'Shipper',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'loadPortAgent',
                        label: 'Load Port Agent',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'dischargePortAgent',
                        label: 'Discharge Port Agent',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'receiver',
                        label: 'Receiver',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'onHireSurveyor',
                        label: 'On Hire Surveyor',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'offHireSurveyor',
                        label: 'Off Hire Surveyor',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'bunkerSupplier',
                        label: 'Bunker Supplier',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'bunkerTrader',
                        label: 'Bunker Trader',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'pniInsurance',
                        label: 'PNI Insurance',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'weatherRoutingCompany',
                        label: ' Weather Routing Company',
                        colSize: '50px',
                        editable: true,
                        dataType: 'text',
                        inputType: 'input'
                    }, {
                        id: 'otherFields',
                        label: 'Other Details',
                        colSize: '80px',
                        editable: false,
                    }, {
                        id: 'fieldVisibility',
                        label: 'Visible',
                        colSize: '80px',
                        editable: false
                    }
                ],
                rows: [],
            }
        }

        if (isEditPage) {
            options.features.canEdit = true;
            options.features.canDelete = true;
        }

        if (voyageList && voyageList.length) {
            options.data.rows = [...voyageList.map(({
                shipper, bunkerSupplier, bunkerTrader, cargo, cargoIntake, chartererName, ownerName, cpDate, dischargePort, loadPort, loadPortAgent, dischargePortAgent, offHireSurveyor, onHireSurveyor, pniInsurance, receiver, vesselName, vesselSize, weatherRoutingCompany, _id, otherFields, fieldVisibility
            }) => ({
                shipper, bunkerSupplier, bunkerTrader, cargo, cargoIntake, chartererName, ownerName, cpDate, dischargePort, loadPort, loadPortAgent, dischargePortAgent, offHireSurveyor, onHireSurveyor, pniInsurance, receiver, vesselName, vesselSize, weatherRoutingCompany, _id, otherFields, fieldVisibility
            }))
            ]
        }

        this.refreshRows = () => {
            window.location.reload();
        };

        this.actionsRow = async e => {
            if (!e || !e.type) {
                return;
            }

            switch (e.type) {
                case 'save':
                    await api.updateVoyageDetails(e.payload);
                    break;
                case 'delete':
                    let resp = await api.deleteVoyageDetails(e.payload['_id']);
                    if (resp.data.status) {
                        voyageList = voyageList.filter(f => f['_id'] !== e.payload['_id']);
                        options.data.rows = voyageList;
                    } else {
                        this.refreshRows();
                    }

                    break;
                default:
                    break;
            }
        }

        return (
            <Grid container direction='row' className='main-container'>
            <LeftMenu/>
                <Grid item xs={12} md={9} lg={9}>
            <section className='right right-section'>
                <div className='right-container'>
                  <section className='component-wrapper'>
                  <Button variant='contained' color='primary' onClick={this.handleBackButton} style={{ right: '2%', position: 'fixed' }}>
                    Back
            </Button>
                  <h2> Welcome Mr. {this.capitalize(localStorage.getItem('displayName'))}</h2>
                  <div className="linkContainer">
                  { showAddVoyage ? (<Link className='addLink' to='/fillVoyageDetails'>Fill Voyage Details</Link>) : (<div></div>)}
                  </div>
            <div>
                
                <div id='table' className={'tooltipBoundary'} style={{ margin: '2% 0 6% 2%', display: 'flex' }}>
                    <Datatable options={options} actions={this.actionsRow} refreshRows={this.refreshRows} stripped CustomTableBodyCell={this.buildCustomTableBodyCell} />
                </div >
            </div>
            </section>
                </div>
                </section>
                </Grid>
                </Grid>
        );
    }

    capitalize = s => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    getPopupContent_OtherFields = (cellVal, rowId) => {
        const { voyageList } = this.state;
        if (!voyageList.some(f => f.otherFields)) {
            return;
        }

        let vsl = voyageList.find(m => m['_id'] === rowId);
        let content = <p></p>;
        if (vsl && vsl.otherFields && Object.keys(vsl.otherFields).length) {
            return content =
                <Popup trigger={
                    <Button
                        variant='contained'
                        size='small'
                        color='primary'>
                        Details </Button>}
                    position={['bottom right', 'bottom center', 'left top', 'top center']}
                    on='hover'
                    keepTooltipInside='.tooltipBoundary'>
                    <div className='content'>
                        <DisplaySelectedVesselDetails vesselDetails={vsl.otherFields} />
                    </div>
                </Popup>
        }

        return content;
    }


    getPopupContent_FieldVisibility = (cellVal, rowId) => {
        const { voyageList } = this.state;
        if (!voyageList.some(f => f.fieldVisibility)) {
            return;
        }

        let vsl = voyageList.find(m => m['_id'] === rowId);
        let content = <p></p>;
        if (vsl && vsl.fieldVisibility && Object.keys(vsl.fieldVisibility).length) {
            return content =
                <Popup trigger={
                    <Button
                        variant='contained'
                        size='small'
                        color='primary'>
                        Details </Button>}
                    position={['bottom right', 'bottom center', 'left top', 'top center']}
                    on='hover'
                    keepTooltipInside='.tooltipBoundary'>
                    <div className='content'>
                        <DisplaySelectedVesselDetails vesselDetails={vsl.fieldVisibility} />
                    </div>
                </Popup>
        }

        return content;
    }
}

export default ViewVoyageDetails;
