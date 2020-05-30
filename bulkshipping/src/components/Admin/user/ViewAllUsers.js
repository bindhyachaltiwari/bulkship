import React, { Component } from 'react';
import { Datatable } from '@o2xp/react-datatable';
import api from '../../api';
import DisplaySelectedVesselDetails from '../../Client/DisplaySelectedVesselDetails';
import Popup from 'reactjs-popup';
import { Button } from '@material-ui/core';
class ViewAllUsers extends Component {

    localState = {
        clientList: []
    }

    constructor(props) {
        super(props);
        this.state = { ...this.localState };
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    componentDidMount = async e => {
        const res = await api.getAllUserDetails();
        if (res.data.status) {
            this.setState({
                clientList: res.data.clientList,
                error: false,
            });
        } else {
            this.setState({ error: true });
            return;
        }
    }

    handleBackButton = () => {
        this.props.history.goBack();
    }

    handleViewVesselList = e => {
        const { clientList } = this.state;
        const cl = clientList.find(m => m['id'] === e.target.id);
        if (cl && cl.companyName) {
            this.props.history.push({
                pathname: '/viewVoyageDetails',
                state: { userName: cl.companyName }
            });
        }
    }

    buildCustomTableBodyCell = ({ cellVal, column, rowId }) => {
        let val;
        switch (column.id) {
            case 'viewVesselList':
                const { clientList } = this.state;
                const cl = clientList.find(m => m['id'] === rowId);
                if (cl && cl.role === 'Client') {
                    val = <button style={{ color: 'blue', textAlign: 'center', marginLeft: '20%' }} id={rowId} type='button' onClick={this.handleViewVesselList}>View Vessels</button>;
                } else if (cl && cl.role === 'Manager') {
                    val = this.getPopupContent_ManagerRoles(cl);
                } else {
                    val = ''
                }
                break;
            default:
                val = <div style={{ color: 'blue' }}>{cellVal}</div>;
                break;
        }
        return val;
    };

    getPopupContent_ManagerRoles = (vsl) => {
        let content = <p></p>;
        let active = [];
        if (vsl && vsl.managerRoles && Object.keys(vsl.managerRoles).length) {
            const identifiers = Object.keys(vsl.managerRoles)
            active = identifiers.filter(function (id) {
                return vsl.managerRoles[id]
            })
            if(active && active.length){
                active = active.map(m=>m.replace(/([A-Z])/g, ' $1').trim());
            }
            return content =
                <Popup trigger={
                    <button style={{ color: 'blue', textAlign: 'center', marginLeft: '20%' }} type='button'>View Roles</button>
                }
                    position={['bottom right', 'bottom center', 'left top', 'top center']}
                    on='hover'
                    keepTooltipInside='.tooltipBoundary'>
                    <div className='content'>
                        <DisplaySelectedVesselDetails vesselDetails={active} />
                    </div>
                </Popup>
        }

        return content;
    }
    render() {
        let { clientList } = this.state;
        let options;
        if (clientList.length) {
            options = {
                title: 'User List',
                keyColumn: 'id',
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
                    rowsPerPage: {
                        available: [5, 10, 25, 50, 100],
                        selected: 10
                    },
                },
                data: {
                    columns: [
                        {
                            id: 'userName',
                            label: 'User Name',
                            colSize: '50px',
                        },
                        {
                            id: 'displayName',
                            label: 'Display Name',
                            colSize: '50px',
                        },
                        {
                            id: 'companyName',
                            label: 'Company Name',
                            colSize: '50px',
                        },
                        {
                            id: 'role',
                            label: 'Role',
                            colSize: '50px',
                        },
                        {
                            id: 'clientType',
                            label: 'User Type',
                            colSize: '50px',
                        },
                        {
                            id: 'viewVesselList',
                            label: 'View',
                            colSize: '50px',
                        },
                    ],
                    rows: [
                        ...clientList.map(({ userName, displayName, companyName, role, clientType, id, viewVesselList }) => ({ userName, displayName, companyName, role, clientType, id, viewVesselList: true }))
                    ],
                }
            }
        }
        return (
            <span>
                <button className='backButton' onClick={this.handleBackButton}>Back</button>
                <h2> Welcome Mr. {this.capitalize(localStorage.getItem('displayName'))}</h2>
                < div id='table' className={'tooltipBoundary'} style={{ margin: '2% 0 6% 2%', display: 'flex' }}>
                    <Datatable options={options} stripped CustomTableBodyCell={this.buildCustomTableBodyCell} />
                </div >
            </span>
        );
    }

    capitalize = s => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

export default ViewAllUsers;
