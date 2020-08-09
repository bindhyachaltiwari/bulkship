import React, { Component } from 'react';
import { connect } from 'react-redux';
import './style.scss';
import UserTable from './userTable';
import api from '../../api';
import ScrollableTabsButtonAuto from '../sub-component/ScrollableTabsButtonAuto';

class clientFixtures extends Component {

  constructor(props) {
    super(props);
    this.getAllVoyage();
    this.state = {
      vesselList: [],
    }
  }

  getAllVoyage = async () => {
    const { detail } = this.props;
    const localList = [];
    const res = await api.getAllVoyage({ 'companyName': detail.companyName });
    if (res.data.status) {
      const vesselList = res.data.vesselList;
      for (let i = 0; i < vesselList.length; i++) {
        let v = vesselList[i];
        localList.push({
          vesselName: v.vesselName.split('_')[0],
          DWT: v.vesselName.split('_')[1],
          cpDate: v.cpDate,
          ownerName: v.ownerName
        })
      }
      this.setState({
        vesselList: localList
      });
    }
  }

  handleIconDetail = (event, value) => {
    if (value === 1) {
      this.props.history.goBack();
      return;
    }
  };

  getTabData = () => {
    const columns = [{ field: 'vesselName', title: 'Vessel Name' },
    { field: 'cpDate', title: 'CP Date' },
    { field: 'DWT', title: 'Dead Weight' },
    { field: 'ownerName', title: 'Owner Name' },
    ];
    const { vesselList } = this.state;
    const tabs = {
      tabsLabel: [{
        label: <span className='labelColor'>FIXTURE LIST</span>
      }, {
        label: <span className='labelColor'>BACK</span>
      }],
      tabPanelChild: [{
        child: <form>
          <UserTable title={'Fixture List'} data={vesselList} columns={columns} />
        </form>
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

export default connect(mapStateToProps, null)(clientFixtures);
