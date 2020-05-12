import React, { Component } from 'react';
import { Datatable } from '@o2xp/react-datatable';
import api from '../../api';
import DisplaySelectedVesselDetails from '../../Client/DisplaySelectedVesselDetails';
import Popup from 'reactjs-popup';
import { Button } from '@material-ui/core';
class ViewVoyageDetails extends Component {

    localState = {
        voyageList: []
    }

    constructor(props) {
        super(props);
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
            return;
        }
    }

    handleBackButton() {
        this.props.history.goBack();
    }

    handleEditClick = e => {
        const { voyageList } = this.state;
        const c = voyageList.find(m => m['id'] === e.target.id);
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
        let { voyageList } = this.state;
        let options;
        if (voyageList.length) {
            options = {
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
                },
                data: {
                    columns: [
                        {
                            id: 'chartererName',
                            label: 'Charterer Name',
                            colSize: '50px',
                        }, {
                            id: 'vesselName',
                            label: 'Vessel Name',
                            colSize: '50px',
                        }, {
                            id: 'cpDate',
                            label: 'CP Date',
                            colSize: '50px',
                        }, {
                            id: 'vesselSize',
                            label: ' Vessel Size',
                            colSize: '50px',
                        }, {
                            id: 'loadPort',
                            label: ' Load Port',
                            colSize: '50px',
                        }, {
                            id: 'dischargePoint',
                            label: 'Discharge Point',
                            colSize: '50px',
                        }, {
                            id: 'cargo',
                            label: 'Cargo',
                            colSize: '50px',
                        }, {
                            id: 'cargoIntake',
                            label: ' Cargo Intake',
                            colSize: '50px',
                        }, {
                            id: 'ownerName',
                            label: 'Owner Name',
                            colSize: '50px',
                        }, {
                            id: 'shipper',
                            label: 'Shipper',
                            colSize: '50px',
                        }, {
                            id: 'loadPortAgent',
                            label: 'Load Port Agent',
                            colSize: '50px',
                        }, {
                            id: 'dischargePortAgent',
                            label: 'Discharge Port Agent',
                            colSize: '50px',
                        }, {
                            id: 'receiver',
                            label: 'Receiver',
                            colSize: '50px',
                        }, {
                            id: 'onHireSurveyor',
                            label: 'On Hire Surveyor',
                            colSize: '50px',
                        }, {
                            id: 'offHireSurveyor',
                            label: 'Off Hire Surveyor',
                            colSize: '50px',
                        }, {
                            id: 'bunkerSupplier',
                            label: 'Bunker Supplier',
                            colSize: '50px',
                        }, {
                            id: 'bunkerTrader',
                            label: 'Bunker Trader',
                            colSize: '50px',
                        }, {
                            id: 'pniInsurance',
                            label: 'PNI Insurance',
                            colSize: '50px',
                        }, {
                            id: 'weatherRoutingCompany',
                            label: ' Weather Routing Company',
                            colSize: '50px',
                        }
                    ],
                    rows: [
                        ...voyageList.map(({
                            shipper, bunkerSupplier, bunkerTrader, cargo, cargoIntake, chartererName, ownerName, cpDate, dischargePoint, loadPort, loadPortAgent, dischargePortAgent, offHireSurveyor, onHireSurveyor, pniInsurance, receiver, vesselName, vesselSize, weatherRoutingCompany, _id
                        }) => ({
                            shipper, bunkerSupplier, bunkerTrader, cargo, cargoIntake, chartererName, ownerName, cpDate, dischargePoint, loadPort, loadPortAgent, dischargePortAgent, offHireSurveyor, onHireSurveyor, pniInsurance, receiver, vesselName, vesselSize, weatherRoutingCompany, _id, edit: true, otherFields: true, fieldVisibility: true
                        }))
                    ],
                }
            }
            if (voyageList.some(f => f.otherFields)) {
                options.data.columns.push({
                    id: 'otherFields',
                    label: 'Other Details',
                    colSize: '80px',
                });
            }

            if (voyageList.some(f => f.fieldVisibility)) {
                options.data.columns.push({
                    id: 'fieldVisibility',
                    label: 'Visible',
                    colSize: '80px',
                });
            }
        }

        return (
            <span>
                <button className='backButton' onClick={this.handleBackButton}>Back</button>
                <h2> Welcome Mr. {this.capitalize(localStorage.getItem('displayName'))}</h2>
                < div id='table' className={'tooltipBoundary'} style={{ marginTop: '2%', marginLeft: '2%', display: 'flex' }}>
                    <Datatable options={options} stripped CustomTableBodyCell={this.buildCustomTableBodyCell} />
                </div >
            </span>
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
