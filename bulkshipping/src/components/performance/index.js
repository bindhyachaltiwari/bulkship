import React, { Component } from 'react';
import ScrollableTabsButtonAuto from '../sub-component/ScrollableTabsButtonAuto';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import ConfirmationAlert from '../../utils/confirmationAlert';
import Alert from '../../utils/alert';
import './style.scss';
import FillPerformanceDetails from './Form_FillPerformanceDetails';

class Performance extends Component {

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
  }

  handleIconDetail = (event, value) => {
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

  getTabData = () => {
    if (this.props && this.props.detail && this.props.detail.role === 'Manager') {
      const tabs = {
        tabsLabel: [],
        tabPanelChild: []
      }
      const assignedRoles = this.props.detail.managerRoles.filter(m => m.indexOf('Performance') >= 0);
      for (let i = 0; i < assignedRoles.length; i++) {
        const role = assignedRoles[i];
        if (role === 'View All Performance Details') {
          tabs.tabsLabel.push({
            icon: <AccountCircleIcon className='labelColor' />,
            label: <span className='labelColor'>VIEW PERFORMANCE DETAILS</span>
          });
          tabs.tabPanelChild.push({
            child: <FillPerformanceDetails handleBlocking={this.handleBlocking} activeTabIndex='viewPage' />
          })
        } else if (role === 'Fill Performance Details') {
          tabs.tabsLabel.push({
            icon: <AccountCircleIcon className='labelColor' />,
            label: <span className='labelColor'>FILL PERFORMANCE DETAILS</span>
          });
          tabs.tabPanelChild.push({
            child: <FillPerformanceDetails handleBlocking={this.handleBlocking} />
          })
        } else if (role === 'Edit Performance Details') {
          tabs.tabsLabel.push({
            icon: <AccountCircleIcon className='labelColor' />,
            label: <span className='labelColor'>EDIT PERFORMANCE DETAILS</span>
          });
          tabs.tabPanelChild.push({
            child: <FillPerformanceDetails handleBlocking={this.handleBlocking} activeTabIndex='editPage' />
          })
        }
      }

      return tabs;
    } else if (this.props && this.props.detail && this.props.detail.role === 'Admin') {
      const tabs = {
        tabsLabel: [{
          icon: <AccountCircleIcon className='labelColor' />,
          label: <span className='labelColor'>VIEW PERFORMANCE DETAILS</span>
        }, {
          icon: <AccountCircleIcon className='labelColor' />,
          label: <span className='labelColor'>FILL PERFORMANCE DETAILS</span>
        }, {
          icon: <AccountCircleIcon className='labelColor' />,
          label: <span className='labelColor'>EDIT PERFORMANCE DETAILS</span>
        },
        ],
        tabPanelChild:
          [{
            child: <FillPerformanceDetails handleBlocking={this.handleBlocking} activeTabIndex='viewPage' />
          }, {
            child: <FillPerformanceDetails handleBlocking={this.handleBlocking} />
          }, {
            child: <FillPerformanceDetails handleBlocking={this.handleBlocking} activeTabIndex='editPage' />
          }]
      }

      return tabs;
    }
    else if (this.props && this.props.detail && this.props.detail.role === 'Client') {
      const tabs = {
        tabsLabel: [{
          icon: <AccountCircleIcon className='labelColor' />,
          label: <span className='labelColor'>VIEW PERFORMANCE DETAILS</span>
        }
        ],
        tabPanelChild:
          [{
            child: <FillPerformanceDetails handleBlocking={this.handleBlocking} activeTabIndex='viewPage' clientPerformance={this.props.history.location.state} />
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


export default connect(mapStateToProps, null)(Performance);
