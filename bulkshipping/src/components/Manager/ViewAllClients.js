import React, { Component } from 'react';
import axios from 'axios';
import { Datatable } from "@o2xp/react-datatable";

class ViewAllClients extends Component {

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
        await axios.post('http://localhost:3003/userDetails/getAllClientDetails', {
            headers: { 'Content-Type': 'application/json' },
        }).then(res => {
            if (res.data.status) {
                this.setState({
                    clientList: res.data.clientList,
                    error: false,
                });
            } else {
                this.setState({ error: true });
                return;
            }
        });
    }

    handleBackButton() {
        this.props.history.goBack();
    }

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
                    canClick: true,
                },
                data: {
                    columns: [
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
                            id: "clientType",
                            label: "Client Type",
                            colSize: "50px",
                        },
                    ],
                    rows: [
                        ...clientList.map(({ userName, displayName, companyName, role, clientType}) => ({ userName, displayName, companyName, role, clientType}))
                    ],
                }
            }
        }
        return (
            <span>
                <button className='backButton' onClick={this.handleBackButton}>Back</button>
                <h2> Welcome Mr. {this.capitalize(localStorage.getItem('displayName'))}</h2>
                < div id='table' style={{ marginTop: '2%', marginLeft: '2%', display: 'flex' }}>
                    <Datatable options={options} stripped />
                </div >
            </span>
        );
    }

    capitalize = s => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

export default ViewAllClients;
