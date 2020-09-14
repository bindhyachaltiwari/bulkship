import React, { Component } from "react";
import { connect } from "react-redux";
import api from "../../../api";
import UserTable from './userTable';
import ScrollableTabsButtonAuto from '../../sub-component/ScrollableTabsButtonAuto';


class voyageDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voyageDocuments: [],
    };
  }

  componentDidMount = (e) => {
    this.getVoyageDocuments();
  };

  getVoyageDocuments = async () => {
    const voyageId = this.props.history.location.state.voyageId;
    const res = await api.getVoyageDocuments(voyageId);
    let documents = [];
    if (res.data.status) {
      documents = res.data.voyageDocuments;
      for (let counter = 0; counter < documents.length; counter++) {
        const fileId = documents[counter].fileId;
        var options = { 
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric' 
        };
        documents[counter].dateTime = new Date(documents[counter].createdAt).toLocaleDateString([], options);
        documents[counter].download = <button style={{ backgroundColor: '#1e4356', color: 'white', textAlign: 'center' }} type='button' onClick={(event) => this.downloadDoc(event, fileId)}>Download</button>;
      }
    }
    this.setState({
      voyageDocuments: documents,
    });
  }

  downloadDoc = (e, fileId) => {
    window.open(api.apiUrl + '/voyageDocuments/download/' + fileId, '_blank');
  }

  handleIconDetail = (event, value) => {
    if (value === 1) {
      this.props.history.goBack();
      return;
    }
  }

  getTabData = () => {
    const columns = [
      { field: "description", title: "Description" },
      { field: "dateTime", title: "Uploaded On" },
      { field: "download", title: "Download Document" },
    ];
    const { voyageDocuments } = this.state;
    const tabs = {
      tabsLabel: [
        {
          label: <span className="labelColor">DOCUMENTS LIST</span>,
        },
        {
          label: <span className="labelColor">BACK</span>,
        },
      ],
      tabPanelChild: [
        {
          child: (
            <form>
              <UserTable
                title={"Documents List"}
                data={voyageDocuments}
                columns={columns}
                voyageId={this.props.history.location.state.voyageId}
                getVoyageDocuments={this.getVoyageDocuments}
              />
            </form>
          ),
        },
        {},
      ],
    };

    return tabs;
  };

  render() {
    const { localClickedtTab } = this.state;
    return (
      <div className='voyage-docs'>
        <ScrollableTabsButtonAuto
          paper={true}
          tabs={this.getTabData()}
          onChange={this.handleIconDetail}
          TabIndicatorProps={{ style: { background: '#e37933' } }}
          newTabVal={localClickedtTab} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { ui, detail } = state;
  return {
    ui,
    detail,
  };
};

export default connect(mapStateToProps, null)(voyageDocuments);
