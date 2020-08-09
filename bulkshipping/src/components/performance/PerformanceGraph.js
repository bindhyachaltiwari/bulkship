import React, { Component } from 'react';
import ScrollableTabsButtonAuto from '../sub-component/ScrollableTabsButtonAuto';
import { connect } from 'react-redux';
import './style.scss';
import ApexChart from './BarGraph'

class PerformanceGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {
            actualData: props.history.location.state.actualData,
            originalData: props.history.location.state.originalData
        }
    }

    handleIconDetail = (event, value) => {
        if (value === 1) {
            const { state } = this.props.location;
            this.props.history.push({
                pathname: '/performance',
                state: {
                    detail: state.detail,
                    loadPort: state.loadPort,
                    cpDate: state.cpDate,
                    dischargePort: state.dischargePort,
                    vesselName: state.vesselName
                }
            });
        }
    };

    getTabData = () => {
        const { actualData, originalData } = this.state
        const tabs = {
            tabsLabel: [{
                label: <span className='labelColor'>PERFORMANCE GRAPH</span>
            }, {
                label: <span className='labelColor'>BACK</span>
            }],
            tabPanelChild: [{
                child: <div id="barChart">
                    <ApexChart actualData={actualData} originalData={originalData} />
                </div>
            },
            {}]
        }

        return tabs;
    }

    /* tab data end */

    render() {
        const { localClickedtTab } = this.state;
        return (
            <div className='my-profile'>
                <ScrollableTabsButtonAuto paper={true} tabs={this.getTabData()} onChange={this.handleIconDetail} TabIndicatorProps={{ style: { background: '#e37933' } }} newTabVal={localClickedtTab} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { ui, detail } = state;
    return {
        ui,
        detail
    };
}


export default connect(mapStateToProps, null)(PerformanceGraph);
