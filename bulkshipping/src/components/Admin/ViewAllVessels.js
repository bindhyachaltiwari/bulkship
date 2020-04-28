import React, { Component } from 'react';
import { Datatable } from '@o2xp/react-datatable';
import api from '../api';

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
        this.getAllVesselDetails();
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    getAllVesselDetails = async () => {
        const res = await api.getAllVesselsDetails();
        if (res.data.status) {
            this.setState({
                vesselList: res.data.vesselList,
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
                        width: '60%',
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
                },
                data: {
                    columns: [
                        {
                            id: 'vesselName',
                            label: 'Vessel Name',
                            colSize: '50px',
                            editable: false,
                        },
                        {
                            id: 'IMO',
                            label: 'IMO',
                            colSize: '50px',
                            editable: false,
                        },
                        {
                            id: 'DWT',
                            label: ' DWT (MT)',
                            colSize: '50px',
                            editable: false,
                        },
                        {
                            id: 'built',
                            label: 'Built Year',
                            colSize: '50px',
                            editable: true,
                            dataType: 'number',
                            inputType: 'input'
                        },
                        {
                            id: 'LOA',
                            label: 'LOA (m)',
                            colSize: '50px',
                            editable: true,
                            dataType: 'number',
                            inputType: 'input',
                        },
                        {
                            id: 'beam',
                            label: 'Beam (m)',
                            colSize: '50px',
                            editable: true,
                            dataType: 'number',
                            inputType: 'input'
                        },
                        {
                            id: 'cranes',
                            label: 'Cranes (MT)',
                            colSize: '50px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        },
                        {
                            id: 'grabs',
                            label: 'Grabs (CBM)',
                            colSize: '50px',
                            editable: true,
                            dataType: 'text',
                            inputType: 'input'
                        },
                    ],
                    rows: [
                        ...vesselList.map(({ vesselName, IMO, DWT, built, LOA, beam, cranes, grabs, _id }) => ({ vesselName, IMO, DWT, built, LOA, beam, cranes, grabs, _id, edit: true, delete: true }))
                    ],
                }
            }
            if (isEditPage) {
                options.features.canEdit = true;
                options.features.canDelete = true;
                options.dimensions.datatable.width = '80%'
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
                < div id='table' style={{ marginTop: '2%', marginLeft: '2%', display: 'flex' }}>
                    <Datatable options={options} stripped actions={this.actionsRow} refreshRows={this.refreshRows} />
                </div >
            </span>
        );
    }

    capitalize = s => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

export default ViewAllVessels;
