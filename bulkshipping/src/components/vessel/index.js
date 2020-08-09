import React, { Component } from 'react';
import ScrollableTabsButtonAuto from '../sub-component/ScrollableTabsButtonAuto';
import { connect } from 'react-redux';
import AddNewVessel from './Form_AddNewVessel';
import ConfirmationAlert from '../../utils/confirmationAlert';
import Alert from '../../utils/alert';
import './style.scss';
import ViewAllVessels from './Form_ViewAllVessels';

class Vessel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTabIndex: 0,
      isDirty: false,
      localClickedtTab: 0,
      confAlertDetails: {
        openAlert: false,
        titleMsg: '',
        descrMsg: '',
        buttonTitle: '',
      },
      alertDetails: {
        openAlert: false,
        titleMsg: '',
        descrMsg: ''
      },

    };

    this.handleBlocking = this.handleBlocking.bind(this);
    this.handleCancelAlert = this.handleCancelAlert.bind(this);
    this.handleSuccessAlert = this.handleSuccessAlert.bind(this);
    this.handleRowClicked = this.handleRowClicked.bind(this);
  }

  handleIconDetail = (event, value) => {
    this.setState({ onRowClickedData: {} });
    if (value !== this.state.activeTabIndex) {
      const { isDirty } = this.state;
      if (isDirty) {
        this.setState({
          confAlertDetails: {
            openAlert: true,
            titleMsg: 'Discard Changes?',
            descrMsg: '  You have unsaved changes. Do you want to discard?',
            buttonTitle: ' Discard'
          },
          localClickedtTab: value
        });
        return false;
      }
    }
    this.setState({ activeTabIndex: value, localClickedtTab: value });
    return true;
  };

  handleCancelAlert = () => {
    this.setState({
      confAlertDetails: {
        openAlert: false,
        titleMsg: '',
        descrMsg: '',
        buttonTitle: '',
      },
      alertDetails: {
        openAlert: false,
        titleMsg: '',
        descrMsg: ''
      },
      localClickedtTab: this.state.activeTabIndex
    })
  };

  handleSuccessAlert = e => {
    e.preventDefault();
    const { localClickedtTab, activeTabIndex, isDirty } = this.state
    if (localClickedtTab !== activeTabIndex && isDirty) {
      this.setState({
        isDirty: false,
        confAlertDetails: {
          openAlert: false,
          titleMsg: '',
          descrMsg: '',
          buttonTitle: '',
        },
      });
      this.setState({ activeTabIndex: localClickedtTab });
      return;
    }
  }

  handleBlocking = e => this.setState({ isDirty: e });
  handleRowClicked = e => {
    const { detail } = this.props;
    let localValue = 2;
    if (detail && detail.role === 'Manager') {
      const isPresent = detail.managerRoles.some(m => m === 'Edit Vessel Details');
      if (!isPresent) {
        return;
      } else if (isPresent) {
        localValue = 2
      }
    }

    this.setState({ activeTabIndex: localValue, localClickedtTab: localValue, onRowClickedData: e });
  };

  getTabData = () => {
    if (this.props && this.props.detail && this.props.detail.role === 'Manager') {
      const tabs = {
        tabsLabel: [],
        tabPanelChild: []
      }
      let assignedRoles = this.props.detail.managerRoles.filter(m => m.indexOf('Vessel') >= 0);
      if (assignedRoles.some(s => s === 'Edit Vessel Details') && !assignedRoles.some(s => s === 'View All Vessels')) {
        assignedRoles.push('View All Vessels');
      }
      assignedRoles = assignedRoles.sort().reverse();
      for (let i = 0; i < assignedRoles.length; i++) {
        const role = assignedRoles[i];
        if (role === 'View All Vessels') {
          tabs.tabsLabel.push({
            label: <span className='labelColor'>VIEW ALL VESSELS</span>
          });
          tabs.tabPanelChild.push({
            child: <ViewAllVessels handleRowClicked={this.handleRowClicked} history={this.props.history} />
          })
        } else if (role === 'Add New Vessel') {
          tabs.tabsLabel.push({
            label: <span className='labelColor'>ADD NEW VESSEL</span>
          });
          tabs.tabPanelChild.push({
            child: <AddNewVessel handleBlocking={this.handleBlocking} />
          })
        } else if (role === 'Edit Vessel Details') {
          tabs.tabPanelChild.push({
            child: <AddNewVessel handleBlocking={this.handleBlocking} onRowClickedData={this.state.onRowClickedData} />
          })
        }
      }

      return tabs;
    } else {
      const tabs = {
        tabsLabel: [{
          label: <span className='labelColor'>VIEW ALL VESSELS</span>
        }, {
          label: <span className='labelColor'>ADD NEW VESSEL</span>
        }],
        tabPanelChild:
          [{
            child: <ViewAllVessels handleRowClicked={this.handleRowClicked} history={this.props.history} />
          },
          {
            child: <AddNewVessel handleBlocking={this.handleBlocking} />
          },
          {
            child: <AddNewVessel handleBlocking={this.handleBlocking} onRowClickedData={this.state.onRowClickedData} />
          }]
      }

      return tabs;
    }
  }

  /* tab data end */

  render() {
    const { confAlertDetails, alertDetails, isDirty, localClickedtTab } = this.state;
    return (
      <div className='my-profile'>
        <Alert alertDetails={alertDetails} handleCancelAlert={this.handleCancelAlert} />
        <ConfirmationAlert confAlertDetails={confAlertDetails} handleCancelAlert={this.handleCancelAlert} handleSuccessAlert={this.handleSuccessAlert} />
        <ScrollableTabsButtonAuto paper={true} tabs={this.getTabData()} onChange={this.handleIconDetail} TabIndicatorProps={{ style: { background: '#e37933' } }} isDirty={isDirty} newTabVal={localClickedtTab} />
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


export default connect(mapStateToProps, null)(Vessel);
