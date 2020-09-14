import React from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import api from '../../api';
import { connect } from 'react-redux';

function UserTable(props) {
  let propsInside = props;
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} onClick={() => {
      for (let i = 0; i < data.length; i++) {
        let singleClientId = data[i]
        if ((singleClientId.role === 'Manager' && singleClientId.managerRoles && singleClientId.managerRoles.length) ||
          (singleClientId.role === 'Client' && singleClientId.clientDisplay && singleClientId.clientDisplay.length)) {
          if (singleClientId.role === 'Manager') {
            singleClientId.displayRoles = <select>{singleClientId.managerRoles.map((e) => <option>{e}</option>)}</select>
          } else if (singleClientId.role === 'Client') {
            singleClientId.displayRoles = <select>{singleClientId.clientDisplay.map((e) => <option>{e}</option>)}</select>
          }
        }
        if (singleClientId.role === 'Client') {
          singleClientId.viewDetails = <button style={{ backgroundColor: '#1e4356', color: 'white', textAlign: 'center' }} type='button' id={singleClientId.id} onClick={propsInside.handleClickState}>View</button>;
        }
      }
    }} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} onClick={() => {
      for (let i = 0; i < data.length; i++) {
        let singleClientId = data[i]
        if ((singleClientId.role === 'Manager' && singleClientId.managerRoles) ||
          (singleClientId.role === 'Client' && singleClientId.clientDisplay)) {
          singleClientId.displayRoles = 'Roles';
        }
        if (singleClientId.role === 'Client') {
          singleClientId.viewDetails = 'View Details';
        }
      }
    }} />),

    activateUser: forwardRef((props, ref) => <CheckCircleIcon style={{ color: 'green' }}{...props} ref={ref} />),
    deactivateUser: forwardRef((props, ref) => <CancelIcon style={{ color: 'red' }} {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  let [columns, setColumns] = React.useState([]);
  let [data, setData] = React.useState([]);

  if (props.columns && props.columns.length && !columns.length) {
    setColumns(props.columns);
  }

  if (props.data && props.data.length && !data.length) {
    setData(props.data);
  }

  const showDelete = () => {
    const { detail } = props;
    const { managerRoles } = detail;
    if (detail && detail.role === 'Admin') {
      return true;
    } else if (detail && detail.role === 'Manager') {
      if (managerRoles && managerRoles.length) {
        return managerRoles.some(s => s === 'Edit User Details');
      }
    }
  }

  return (
    <MaterialTable
      title={props.title}
      columns={props.columns}
      data={data}
      icons={tableIcons}
      style={{ zIndex: '0' }}
      options={{
        headerStyle: {
          backgroundColor: '#1e4356',
          color: '#FFF',
        },
        pageSize: 7,
        pageSizeOptions: [5, 7, 10, 15, 20],
        exportButton: true,
        rowStyle: rowData => ({
          whiteSpace: 'nowrap'
        })
      }}

      actions={[
        rowData => showDelete() && rowData.role !== 'Admin' ? ({
          icon: rowData.isActive ? tableIcons.activateUser : tableIcons.deactivateUser,
          tooltip: rowData.isActive ? 'Active User.' : 'Deactivated User.',
          onClick: async (event, rowData) => {
            const data = {
              userName: rowData.userName,
              isActive: !rowData.isActive
            }
            let resp = await api.activateUser(data);
            if (resp.data.status) {
              rowData.isActive = !rowData.isActive
              props.showAlert(rowData);
            } else {
              props.showAlert('User Activation/Deactivation Failed');
            }
          }
        }) : ''
      ]}
      editable=
      {showDelete() ?
        {
          onRowUpdate: (newData, oldData) => new Promise(resolve => {
            resolve();
            props.onRowClick(newData, oldData);
          }),
          onRowDelete: (oldData) =>
            new Promise(resolve => {
              setTimeout(async () => {
                if (oldData.role === 'Admin') {
                  props.showAlert('Admin cannot be deleted');
                  resolve();
                  return;
                } else {
                  const dataDelete = [...data];
                  let resp = await api.deleteUserDetails(oldData['id']);
                  if (resp.data.status) {
                    let index = dataDelete.indexOf(oldData);
                    dataDelete.splice(index, 1);
                  }
                  setData([...dataDelete]);
                  resolve();
                }
              }, 600);

            }),
        } : null}
    />
  );
}

const mapStateToProps = (state, ownProps) => {
  const { ui, detail } = state;
  return {
    ui,
    detail
  };
}


export default connect(mapStateToProps, null)(UserTable);