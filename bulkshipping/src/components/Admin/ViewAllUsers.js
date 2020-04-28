import React, { Component } from 'react';
import { Datatable } from "@o2xp/react-datatable";
import api from '../api';

class ViewAllUsers extends Component {

    localState = {
        clientList: []
    }

    constructor(props) {
        super(props);
        this.state = { ...this.localState };
        this.getAllClients();
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    getAllClients = async () => {
        const res = await api.getAllClientDetails();
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

    handleBackButton() {
        this.props.history.goBack();
    }

    handleEditClick = e => {
        const { clientList } = this.state;
        const c = clientList.find(m => m['id'] === e.target.id);
    }

    buildCustomTableBodyCell = ({ cellVal, column, rowId }) => {
        let val;
        switch (column.id) {
            case "edit":
                val = <button style={{ color: "blue", textAlign: "center", marginLeft: '20%' }} id={rowId} type="button" onClick={this.handleEditClick}>Edit</button>;
                break;
            default:
                val = <div style={{ color: "blue" }}>{cellVal}</div>;
                break;
        }
        return val;
    };

    render() {
        let { clientList } = this.state;
        let options;
        if (clientList.length) {
            options = {
                title: 'Client List',
                keyColumn: 'id',
                font: "Arial",
                dimensions: {
                    datatable: {
                        width: '60%',
                        height: '648px',
                    },
                    row: {
                        height: "10px"
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
                            id: "edit",
                            label: "Edit",
                            colSize: "50px",
                        },
                        {
                            id: "userName",
                            label: "User Name",
                            colSize: "50px",
                        },
                        {
                            id: "displayName",
                            label: "Display Name",
                            colSize: "50px",
                        },
                        {
                            id: "companyName",
                            label: "Company Name",
                            colSize: "50px",
                        },
                        {
                            id: "role",
                            label: "Role",
                            colSize: "50px",
                        },
                        {
                            id: "userType",
                            label: "User Type",
                            colSize: "50px",
                        },
                    ],
                    rows: [
                        ...clientList.map(({ userName, displayName, companyName, role, clientType, id }) => ({ userName, displayName, companyName, role, clientType, id, edit: true }))
                    ],
                }
            }
        }
        return (
            <span>
                <button className='backButton' onClick={this.handleBackButton}>Back</button>
                <h2> Welcome Mr. {this.capitalize(localStorage.getItem('displayName'))}</h2>
                < div id='table' style={{ marginTop: '2%', marginLeft: '2%', display: 'flex' }}>
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
