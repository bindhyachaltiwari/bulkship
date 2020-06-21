import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Callback from '../../Callback';
import Login from '../login';
import NavBar from '../navBar';
import LeftMenu from '../sub-component/left-menu';
import actionTypes from './../../store/actions/constants';
import Users from '../user';
import { connect } from 'react-redux';
import './../../style/reset.css';
import './../../style/common.scss';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid} from '@material-ui/core';
import vessel from '../vessel';
import voyage from '../voyage';
import performance from '../performance';

class App extends React.Component {
  constructor(){
    super();
    this.isholidayAvailable = false;
    this.state = {
      loggedIn: false
    }
  }

  render() {
    let { loggedIn, detail } = this.props;
    loggedIn = true; // remove
    // const {detail} = this.props // remove
    const { ui } = this.props;
    const { activeOverlay } = ui;
    return (
      <div className={`main ${activeOverlay ? 'active-overlay' : ''}`}>
        {loggedIn ? <Grid container direction='row' className='main-container'>
          {/* 'left left-section' */}
          <Grid item md={3} lg={3} className='left left-section'>
            <LeftMenu />
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <section className='right right-section'>
                <NavBar history={this.props.history}/>
                <div className='right-container'>
                  <section className='component-wrapper'>
                      <Switch>
                          <Route exact path='/' component={Users}/>
                          <Route exact path='/callback' component={Callback}/>
                          <Route exact path='/user' component={Users}/>
                           <Route exact path='/vessel' component={vessel}/>
                           <Route exact path='/voyage' component={voyage}/>
                           <Route exact path='/performance' component={performance}/>
                      </Switch>
                  </section>
                </div>
            </section>
          </Grid>
        </Grid>
        :
        <Route exact path='/' component={Login}/>
        }
    </div>
  );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { detail, loggedIn, ui } = state;
  return {
      detail,
      loggedIn,
      ui
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      setHolidays : (data) => {dispatch({type: actionTypes.SET_HOLIDAYS, data})}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
