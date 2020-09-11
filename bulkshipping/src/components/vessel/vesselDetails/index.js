import React, { Component } from 'react';
import ScrollableTabsButtonAuto from '../../sub-component/ScrollableTabsButtonAuto';
import { connect } from 'react-redux';
import './style.scss';
class vesselDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTabIndex: 0,
        }
    }

    handleIconDetail = (event, value) => {
        if (value === 1) {
            this.props.history.goBack();
        }
    };

    getTabData = () => {
        const vesselDetails = this.props.location.state.result;
        const tabs = {
            tabsLabel: [{
                label: <span className='labelColor'>VESSEL DETAILS</span>
            }, {
                label: <span className='labelColor'>BACK</span>
            }],
            tabPanelChild: [{
                child: <div style={{ margin: '2% 0 0 20%' }}>
                    {vesselDetails.map((item, i) =>
                        <table className='tableList' key={i}>
                            <tbody key='list'>
                                <tr style={{backgroundColor:'#1e4356', color:'white'}}><th className='tdList'>Field</th><th className='tdList'>Value</th></tr>
                                <tr><td className='tdList'>Vessel Name </td><td className='tdList'>{item.vesselName}</td></tr>
                                <tr><td className='tdList'>IMO </td><td className='tdList'>{item.IMO}</td></tr>
                                <tr><td className='tdList'>DWT  </td><td className='tdList'>{item.DWT}</td></tr>
                                <tr><td className='tdList'>Flag </td><td className='tdList'>{item.flag}</td></tr>
                                <tr><td className='tdList'>Vessel Type </td><td className='tdList'>{item.vesselType}</td></tr>
                                <tr><td className='tdList'>Built Year </td><td className='tdList'>{item.built}</td></tr>
                                <tr><td className='tdList'>Draft </td><td className='tdList'>{item.draft}</td></tr>
                                <tr><td className='tdList'>LOA </td><td className='tdList'>{item.LOA}</td></tr>
                                <tr><td className='tdList'>Beam </td><td className='tdList'>{item.beam}</td></tr>
                                <tr><td className='tdList'>GRT </td><td className='tdList'>{item.GRT}</td></tr>
                                <tr><td className='tdList'>NRT </td><td className='tdList'>{item.NRT}</td></tr>
                                <tr><td className='tdList'>TPC </td><td className='tdList'>{item.TPC}</td></tr>
                                <tr><td className='tdList'>Holds and Hatches </td><td className='tdList'>{item.holdsHatches}</td></tr>
                                <tr><td className='tdList'>Grain Capacity </td><td className='tdList'>{item.grainCapacity}</td></tr>
                                <tr><td className='tdList'>Bale Capacity </td><td className='tdList'>{item.baleCapacity}</td></tr>
                                <tr><td className='tdList'>Cranes </td><td className='tdList'>{item.cranes}</td></tr>
                                <tr><td className='tdList'>Grabs </td><td className='tdList'>{item.grabs}</td></tr>
                            </tbody>
                        </table>
                    )}
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


export default connect(mapStateToProps, null)(vesselDetails);
