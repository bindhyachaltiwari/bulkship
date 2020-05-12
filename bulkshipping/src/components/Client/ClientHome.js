import React, { Component } from 'react';
import { Datatable } from '@o2xp/react-datatable';
import Popup from 'reactjs-popup';
import DisplaySelectedVesselDetails from './DisplaySelectedVesselDetails';
import { withRouter } from 'react-router-dom'
import PieCharts from '../../components/Others/PieCharts';
import api from '../api';

class ClientHome extends Component {
    constructor(props) {
        super(props);
        this.getAllVoyage();
        this.state = {
            vesselList: [],
            vesselDetails: {
                vesselName: '',
                vesselSize: '',
                cpDate: '',
                loadPort: '',
                dischargePoint: '',
                cargo: '',
                cargoIntake: '',
                ownerName: ''
            },
            tableData: [],
            performanceDetails: {},
            isPeformancePage: false,
            error: false,
            userName: '',
        }
    }

    getAllVoyage = async () => {
       await api.getAllVoyage({ 'companyName': localStorage.getItem('companyName') }).then(res => {
            if (res.data.status) {
                this.setState({
                    vesselList: res.data.vesselList,
                    companyName: localStorage.getItem('companyName'),
                    error: false,
                });
            } else {
                this.setState({
                    error: true,
                    companyName: localStorage.getItem('companyName'),
                });
                return;
            }
        });
    }

    handlePerformanceClick = e => {
        const { vesselList } = this.state;
        const c = vesselList.find(m => m['_id'] === e.target.id);
        this.props.history.push({
            pathname: '/CheckPerformance',
            state: { detail: c }
        });
    }


    // handleVesselClick = e => {
    //     const { vesselList } = this.state;
    //     const c = vesselList.find(m => m['_id'] === e.target.id);
    //     console.log(c.vesselName);
    //     alert(c.vesselName)
    // }

    buildCustomTableBodyCell = ({ cellVal, column, rowId }) => {
        let val;
        switch (column.id) {
            case 'checkPerformance':
                val = <button style={{ color: 'blue', textAlign: 'center' }} id={rowId} type='button' onClick={this.handlePerformanceClick}>Check Performance</button>;
                break;
            case 'vesselName':
                val = this.getPopupContent(cellVal, rowId);
                break;
            default:
                val = <div style={{ color: 'blue' }}>{cellVal}</div>;
                break;
        }
        return val;
    };

    render() {
        let { vesselList } = this.state;
        let options;
        let showData;
        if (vesselList.length) {
            options = {
                title: 'Fixture List',
                keyColumn: 'id',
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
                },
                data: {
                    columns: [
                        {
                            id: 'vesselName',
                            label: 'Vessel Name',
                            colSize: '50px',
                            dataType: ''
                        },
                        {
                            id: 'cpDate',
                            label: 'CP Date',
                            colSize: '50px',
                        },
                        {
                            id: 'checkPerformance',
                            label: 'Performance',
                            colSize: '50px',
                        },
                    ],
                    rows: [
                        ...vesselList.map(({ vesselName, cpDate, _id }) => ({ vesselName, cpDate, id: _id, checkPerformance: true }))
                    ],
                }
            }

            const ourCount = {};
            let previousYearDate = new Date();
            const pastYear = previousYearDate.getFullYear() - 1;
            previousYearDate.setFullYear(pastYear);
            vesselList.forEach(v => {
                if (!ourCount[v.cargo]) {
                    ourCount[v.cargo] = 0;
                }
                if (new Date(v.cpDate).getTime() <= new Date().getTime() && new Date(v.cpDate).getTime() > previousYearDate.getTime()) {
                    ourCount[v.cargo] += parseInt(v.cargoIntake);
                }
            });


            showData = < div id='table' style={{ marginTop: '2%', marginLeft: '2%', display: 'flex' }}>
                <Datatable options={options} stripped CustomTableBodyCell={this.buildCustomTableBodyCell} />
                <div style={{ marginTop: '15%', marginLeft: '0%' }}>
                    {/* <DisplaySelectedVesselDetails vesselDetails={ourCount} /> */}
                    <PieCharts vesselDetails={ourCount} />

                </div>
            </div >
        } else {
            showData = <div style={{ marginTop: '15%' }}> Oops!! There are no business details for you.</div>
        }
        return (
            <div className='about_us_2 about_us_2_animated'>
                <span>
                    <h2> Welcome Mr. {this.capitalize(localStorage.getItem('displayName'))}</h2>
                    {showData}
                </span>
            </div>
        );
    }

    capitalize = s => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }


    getPopupContent = (cellVal, rowId) => {
        const { vesselList } = this.state;
        let vesselDetails = vesselList.find(m => m['_id'] === rowId);
        vesselDetails = (({ vesselName, vesselSize, cpDate, loadPort, cargo, cargoIntake, ownerName }) => (
            { vesselName, vesselSize, cpDate, loadPort, cargo, cargoIntake, ownerName }))(vesselDetails);

        const content = <div>
            <Popup trigger={<a id={rowId} style={{ color: 'blue', textAlign: 'center', textDecoration: 'underline', cursor: 'pointer' }}> {cellVal} </a>}
                modal closeOnDocumentClick >
                <div className='content'>
                    <DisplaySelectedVesselDetails vesselDetails={vesselDetails} />
                </div>
            </Popup>
        </div>

        return content;
    }
}

export default withRouter(ClientHome);
