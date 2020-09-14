import React, { Component } from 'react';
import ScrollableTabsButtonAuto from '../../sub-component/ScrollableTabsButtonAuto';
import { connect } from 'react-redux';
import './style.scss';
class voyageDetails extends Component {

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

    toCamelCase = str => {
        return str.split(' ').map(function (word, index) {
            if (index == 0) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
    }

    getTabData = () => {
        const voyageDetails = this.props.history.location.state.result;
        const tabs = {
            tabsLabel: [{
                label: <span className='labelColor'>VESSEL DETAILS</span>
            }, {
                label: <span className='labelColor'>BACK</span>
            }],
            tabPanelChild: [{
                child: <div style={{ margin: '2% 0 0 20%' }}>
                    {voyageDetails.map((item, i) =>
                        <table className='tableList' key={i}>
                            <tbody key='list'>
                                {this.props.detail.role === 'Client' ?
                                    <>
                                        <tr style={{ backgroundColor: '#1e4356', color: 'white' }}><th className='tdList'>Field</th><th className='tdList'>Value</th></tr>
                                        {item.fieldVisibility.map((field, i) =>
                                            <tr><td className='tdList' key={field}>{field}</td><td className='tdList'>{item[this.toCamelCase(field)]}</td></tr>
                                        )}
                                    </> :
                                    <>
                                        <tr style={{ backgroundColor: '#1e4356', color: 'white' }}><th className='tdList'>Field</th><th className='tdList'>Value</th></tr>
                                        <tr><td className='tdList'>Vessel Name</td><td className='tdList'>{item.vesselName}</td></tr>
                                        <tr><td className='tdList'>CP Date</td><td className='tdList'>{item.cpDate}</td></tr>
                                        <tr><td className='tdList'>Vessel Size</td><td className='tdList'>{item.vesselSize}</td></tr>
                                        <tr><td className='tdList'>Load Port</td><td className='tdList'>{item.loadPort}</td></tr>
                                        <tr><td className='tdList'>Discharge Port </td><td className='tdList'>{item.dischargePort}</td></tr>
                                        <tr><td className='tdList'>Cargo</td><td className='tdList'>{item.cargo}</td></tr>
                                        <tr><td className='tdList'>Cargo Intake</td><td className='tdList'>{item.cargoIntake}</td></tr>
                                        <tr><td className='tdList'>Owner Name</td><td className='tdList'>{item.ownerName}</td></tr>
                                        <tr><td className='tdList'>Shipper</td><td className='tdList'>{item.shipper}</td></tr>
                                        <tr><td className='tdList'>Load Port Agent</td><td className='tdList'>{item.loadPortAgent}</td></tr>
                                        <tr><td className='tdList'>Discharge Port Agent</td><td className='tdList'>{item.dischargePortAgent}</td></tr>
                                        <tr><td className='tdList'>Receiver</td><td className='tdList'>{item.receiver}</td></tr>
                                        <tr><td className='tdList'>On Hire Surveyor</td><td className='tdList'>{item.onHireSurveyor}</td></tr>
                                        <tr><td className='tdList'>Off Hire Surveyor</td><td className='tdList'>{item.offHireSurveyor}</td></tr>
                                        <tr><td className='tdList'>Bunker Supplier</td><td className='tdList'>{item.bunkerSupplier}</td></tr>
                                        <tr><td className='tdList'>Bunker Trader</td><td className='tdList'>{item.bunkerTrader}</td></tr>
                                        <tr><td className='tdList'>PNI Insurance</td><td className='tdList'>{item.pniInsurance}</td></tr>
                                        <tr><td className='tdList'>Weather Routing Company</td><td className='tdList'>{item.weatherRoutingCompany}</td></tr>
                                        <tr><td className='tdList'>Field Visibility</td><td className='tdList'><select>{item.fieldVisibility.map((e) => <option key={e}>{e}</option>)}</select></td></tr>
                                    </>}
                            </tbody>
                        </table>
                    )}
                </div>
            },
            {}]
        }
        return tabs;
    }

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

export default connect(mapStateToProps, null)(voyageDetails);