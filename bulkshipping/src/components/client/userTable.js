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
import ListAltIcon from '@material-ui/icons/ListAlt';
import { connect } from 'react-redux';

function UserTable(props) {

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
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
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    ListAltIcon: forwardRef((props, ref) => <ListAltIcon {...props} ref={ref} />)
  };

  let [columns, setColumns] = React.useState([]);
  let [data, setData] = React.useState([]);

  if (props.columns && props.columns.length && !columns.length) {
    setColumns(props.columns);
  }

  if (props.data && props.data.length && !data.length) {
    setData(props.data)
  }

  return (
    <MaterialTable
      title={props.title}
      columns={props.columns}
      data={props.data}
      icons={tableIcons}
      style={{ zIndex: '0' }}
      options={{
        headerStyle: {
          backgroundColor: '#1e4356',
          color: '#FFF',
        },
        pageSize: 9,
        pageSizeOptions: [6, 9, 12, 15, 20],
      }}
      actions={[
        {
          icon: tableIcons.ListAltIcon,
          tooltip: 'Fixture List',
          isFreeAction: true,
          onClick: (event) => {
            props.history.push({
              pathname: '/clientFixtures',
              companyName: props.history.location.state && props.history.location.state.companyName
            });
          }
        }
      ]}
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