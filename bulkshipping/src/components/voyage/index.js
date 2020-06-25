import React, { Component } from 'react';
import ScrollableTabsButtonAuto from '../sub-component/ScrollableTabsButtonAuto';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import ConfirmationAlert from '../../utils/confirmationAlert';
import Alert from '../../utils/alert';
import './style.scss';
import ViewVoyageDetails from './Form_ViewVoyageDetails';
import FillVoyageDetails from './Form_FillVoyageDetails';

class Voyage extends Component {

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
    const { detail } = this.props;
    let localValue = 2;
    if (detail && detail.role === 'Manager' && !detail.managerRoles.some(m => m === 'Fill Voyage Details')) {
      localValue = 1;
    }
    if (value === localValue) {
      this.setState({
        alertDetails: {
          openAlert: true,
          titleMsg: 'Sorry !!',
          descrMsg: 'You cannot directly click the tab.  Please click the edit icon from the table to edit...'
        }
      });
      return;
    }
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
      if (!detail.managerRoles.some(m => m === 'Fill Voyage Details')) {
        localValue = 1
      }

      if (!detail.managerRoles.some(m => m === 'Edit Voyage Details')) {
        return;
      }
    } else {
      localValue = 2
    }

    this.setState({ activeTabIndex: localValue, localClickedtTab: localValue, onRowClickedData: e });
  };

  getTabData = () => {
    if (this.props && this.props.detail && this.props.detail.role === 'Manager') {
      const tabs = {
        tabsLabel: [],
        tabPanelChild: []
      }
      const assignedRoles = this.props.detail.managerRoles.filter(m => m.indexOf('Voyage') >= 0);
      for (let i = 0; i < assignedRoles.length; i++) {
        const role = assignedRoles[i];
        if (role === 'View All Voyage Details') {
          tabs.tabsLabel.push({
            icon: <AccountCircleIcon className='labelColor' />,
            label: <span className='labelColor'>VIEW VOYAGE DETAILS</span>
          });
          tabs.tabPanelChild.push({
            child: <ViewVoyageDetails handleRowClicked={this.handleRowClicked} />
          })
        } else if (role === 'Fill Voyage Details') {
          tabs.tabsLabel.push({
            icon: <AccountCircleIcon className='labelColor' />,
            label: <span className='labelColor'>FILL VOYAGE DETAILS</span>
          });
          tabs.tabPanelChild.push({
            child: <FillVoyageDetails handleBlocking={this.handleBlocking} />
          })
        } else if (role === 'Edit Voyage Details') {
          tabs.tabsLabel.push({
            icon: <AccountCircleIcon className='labelColor' />,
            label: <span className='labelColor'>VIEW VOYAGE DETAILS</span>
          });
          tabs.tabPanelChild.push({
            child: <ViewVoyageDetails handleRowClicked={this.handleRowClicked} />
          })
          tabs.tabsLabel.push({
            icon: <AccountCircleIcon className='labelColor' />,
            label: <span className='labelColor'>EDIT VOYAGE DETAILS</span>
          });
          tabs.tabPanelChild.push({
            child: <FillVoyageDetails handleBlocking={this.handleBlocking} onRowClickedData={this.state.onRowClickedData} />
          })
        }
      }

      return tabs;
    } else {
      const tabs = {
        tabsLabel: [{
          icon: <AccountCircleIcon className='labelColor' />,
          label: <span className='labelColor'>VIEW VOYAGE DETAILS</span>
        }, {
          icon: <AccountCircleIcon className='labelColor' />,
          label: <span className='labelColor'>FILL VOYAGE DETAILS</span>
        }, {
          icon: <AccountCircleIcon className='labelColor' />,
          label: <span className='labelColor'>EDIT VOYAGE DETAILS</span>
        },
        ],
        tabPanelChild:
          [{
            child: <ViewVoyageDetails handleRowClicked={this.handleRowClicked} />
          },
          {
            child: <FillVoyageDetails handleBlocking={this.handleBlocking} />
          }, {
            child: <FillVoyageDetails handleBlocking={this.handleBlocking} onRowClickedData={this.state.onRowClickedData} />
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


export default connect(mapStateToProps, null)(Voyage);
