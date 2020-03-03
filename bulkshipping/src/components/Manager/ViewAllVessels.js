import React, { Component } from 'react';
import axios from 'axios';
import { Datatable } from "@o2xp/react-datatable";

class ViewAllVessels extends Component {

    localState = {
        vesselList: []
    }

    constructor(props) {
        super(props);
        this.state = { ...this.localState };
        this.getAllVessels();
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    getAllVessels = async () => {
        await axios.post('/vesselDetails/getAllVesselDetails', {
            headers: { 'Content-Type': 'application/json' },
        }).then(res => {
            if (res.data.status) {
                this.setState({
                    vesselList: res.data.vesselList,
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
        let { vesselList } = this.state;
        let options;
        if (vesselList.length) {
            options = {
                title: 'Vessel List',
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
                            id: "vesselName",
                            label: "Vessel Name",
                            colSize: "50px",
                        },
                        {
                            id: "IMO",
                            label: "IMO",
                            colSize: "50px",
                        },
                        {
                            id: "DWT",
                            label: "DWT",
                            colSize: "50px",
                        },
                        {
                            id: "built",
                            label: "Built",
                            colSize: "50px",
                        },
                        {
                            id: "LOA",
                            label: "LOA",
                            colSize: "50px",
                        },
                        {
                            id: "beam",
                            label: "Beam",
                            colSize: "50px",
                        },
                        {
                            id: "cranes",
                            label: "cranes",
                            colSize: "50px",
                        },
                        {
                            id: "grabs",
                            label: "grabs",
                            colSize: "50px",
                        },
                    ],
                    rows: [
                        ...vesselList
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

export default ViewAllVessels;
