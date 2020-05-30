import React, { Component } from 'react';
import { Datatable } from '@o2xp/react-datatable';
import api from '../../api';
import DisplaySelectedVesselDetails from '../../Client/DisplaySelectedVesselDetails';
import Popup from 'reactjs-popup';
import { Button } from '@material-ui/core';

class ViewAllVessels extends Component {

    localState = {
        vesselList: [],
        isEditPage: false,
    }

    constructor(props) {
        super(props);
        if (props && props.history && props.history.location.pathname === '/editVesselDetails') {
            this.localState.isEditPage = true;
        }
        this.state = { ...this.localState };
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    async componentDidMount() {
        const res = await api.getAllVesselsDetails();
        if (res.data.status) {
            this.setState({
                vesselList: res.data.vesselList,
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
                val = this.getPopupContent(cellVal, rowId);
                break;
            default:
                val = <div title={cellVal} style={{ color: 'blue' }}>{cellVal}</div>;
                break;
        }
        return val;
    };

    render() {
        let { vesselList, isEditPage } = this.state;
        let options;
        if (vesselList.length) {
            options = {
                title: 'Vessel List',
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
                            id: 'vesselName',
                            label: 'Vessel Name',
                            colSize: '80px',
                            editable: false,
                        }, {
                            id: 'IMO',
                            label: 'IMO',
                            colSize: '80px',
                            editable: false,
                        }, {
                            id: 'DWT',
                            label: ' DWT (MT)',
                            colSize: '80px',
                            editable: false,
                        }, {
                            id: 'flag',
                            label: 'Flag',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        }, {
                            id: 'vesselType',
                            label: 'Vessel Type',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        }, {
                            id: 'built',
                            label: 'Built Year',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        }, {
                            id: 'draft',
                            label: 'Draft',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        }, {
                            id: 'LOA',
                            label: 'LOA (M)',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input',
                        }, {
                            id: 'beam',
                            label: 'Beam (M)',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        }, {
                            id: 'GRT',
                            label: 'GRT (MT)',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        }, {
                            id: 'NRT',
                            label: 'NRT (MT)',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        }, {
                            id: 'TPC',
                            label: 'TPC (MT/CBM)',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        }, {
                            id: 'holdsHatches',
                            label: 'Holds/Hatches',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        }, {
                            id: 'grainCapacity',
                            label: 'Grain Capacity (CBM)',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        }, {
                            id: 'baleCapacity',
                            label: 'Bale Capacity (CBM)',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        },
                        {
                            id: 'cranes',
                            label: 'Cranes (MT)',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        },
                        {
                            id: 'grabs',
                            label: 'Grabs (CBM)',
                            colSize: '80px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        },
                    ],
                    rows: [
                        ...vesselList.map(({ vesselName, IMO, flag, built, DWT, draft, LOA, beam, GRT, NRT, TPC, grainCapacity, baleCapacity, cranes, grabs, holdsHatches, vesselType, _id }) => ({ vesselName, IMO, flag, built, DWT, draft, LOA, beam, GRT, NRT, TPC, grainCapacity, baleCapacity, cranes, grabs, holdsHatches, vesselType, _id, otherFields: true }))
                    ],
                }
            }
            if (isEditPage) {
                options.features.canEdit = true;
                options.features.canDelete = true;
            }

            if (vesselList.some(f => f.otherFields)) {
                options.data.columns.push({
                    id: 'otherFields',
                    label: 'Other Details',
                    colSize: '80px',
                });
                options.dimensions.datatable.width = '90%';
            }
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
                    await api.updateVessel(e.payload);
                    break;
                case 'delete':
                    let resp = await api.deleteVessel(e.payload['_id']);
                    if (resp.data.status) {
                        vesselList = vesselList.filter(f => f['_id'] !== e.payload['_id']);
                        options.data.rows = vesselList;
                    } else {
                        this.refreshRows();
                    }

                    break;
                default:
                    break;
            }
        }

        return (
            <span>
                <button className='backButton' onClick={this.handleBackButton}>Back</button>
                <h2> Welcome Mr. {this.capitalize(localStorage.getItem('displayName'))}</h2>
                < div id='table' className={'tooltipBoundary'} style={{ margin: '2% 0 6% 2%', display: 'flex' }}>
                    <Datatable options={options} stripped actions={this.actionsRow} refreshRows={this.refreshRows} CustomTableBodyCell={this.buildCustomTableBodyCell} />
                </div >
            </span>
        );
    }

    capitalize = s => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    getPopupContent = (cellVal, rowId) => {
        const { vesselList } = this.state;
        if (!vesselList.some(f => f.otherFields)) {
            return;
        }

        let vsl = vesselList.find(m => m['_id'] === rowId);
        let content = <p></p>;
        if (vsl && vsl.otherFields && Object.keys(vsl.otherFields).length) {
            return content =
                <Popup
                    trigger={
                        <Button
                            variant='contained'
                            size='small'
                            color='primary'
                        >
                            Details </Button>}
                    position={['bottom right', 'bottom center', 'left top', 'top center']}
                    on='hover'
                    keepTooltipInside='.tooltipBoundary'
                >
                    <div className='content'>
                        <DisplaySelectedVesselDetails vesselDetails={vsl.otherFields} />
                    </div>
                </Popup>
        }

        return content;
    }
}

export default ViewAllVessels;
