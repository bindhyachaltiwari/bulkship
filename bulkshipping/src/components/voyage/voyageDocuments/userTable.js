import React from "react";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { connect } from "react-redux";
import UploadDocumentsPopup from "./uploadDocumentsPopup";
import api from '../../../api';

function UserTable(props) {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    CloudUploadIcon: forwardRef((props, ref) => (
      <CloudUploadIcon {...props} ref={ref} />
    )),
  };

  const [columns, setColumns] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (props.columns && props.columns.length && !columns.length) {
    setColumns(props.columns);
  }

  if (props.data && props.data.length && !data.length) {
    setData(props.data);
  }

  const showDelete = () => {
    const { detail } = props;
    const { managerRoles } = detail;
    if (detail && detail.role === 'Client') {
      return false;
    }
    return true;
  }

  return (
    <>
      <MaterialTable
        title={props.title}
        columns={props.columns}
        data={props.data}
        icons={tableIcons}
        style={{ zIndex: "0" }}
        options={{
          headerStyle: {
            backgroundColor: "#1e4356",
            color: "#FFF",
          },
          pageSize: 7,
          pageSizeOptions: [5, 7, 10, 15, 20],
        }}
        editable={
        showDelete() ?
        {
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(async () => {
                let resp = await api.deleteVoyageDocument(oldData['fileId']);
                if (resp.data.status) {
                  props.getVoyageDocuments();
                }
                resolve();
              }, 600);
            }),
        } : null }
        actions={showDelete() ? [
          {
            icon: tableIcons.CloudUploadIcon,
            tooltip: "Upload Document",
            isFreeAction: true,
            onClick: (event) => {
              setAnchorEl(event.currentTarget);
            },
          },
        ] : null}
      />
      <UploadDocumentsPopup
        anchorEl={anchorEl}
        handleClose={handleClose}
        voyageId={props.voyageId}
        getVoyageDocuments={props.getVoyageDocuments}
      />
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  const { ui, detail } = state;
  return {
    ui,
    detail,
  };
};

export default connect(mapStateToProps, null)(UserTable);
