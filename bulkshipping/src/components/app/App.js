import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import Login from '../login';
import NavBar from '../navBar';
import LeftMenu from '../sub-component/left-menu';
import Users from '../user';
import PerformanceGraph from '../performance/PerformanceGraph';
import vessel from '../vessel';
import vesselList from '../vesselList';
import voyage from '../voyage';
import performance from '../performance';
import Client from '../client';
import './../../style/reset.css';
import './../../style/common.scss';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false
    }
  }

  render() {
    let { loggedIn } = this.props;
    const { ui, detail } = this.props;
    const { activeOverlay } = ui;
    let initialComponent = 'Users'
    if (detail.role === "Manager") {
      const mr = detail.managerRoles;
      let isFound = false;
      for (let i = 0; i < mr.length; i++) {
        if (!isFound && mr.some(s => s.indexOf('User') >= 0)) {
          initialComponent = 'Users';
          isFound = true;
        }
        if (!isFound && mr.some(s => s.indexOf('Vessel') >= 0)) {
          initialComponent = 'vessel';
          isFound = true;
        }
        if (!isFound && mr.some(s => s.indexOf('Voyage') >= 0)) {
          initialComponent = 'voyage';
          isFound = true;
        }
        if (!isFound && mr.some(s => s.indexOf('Performance') >= 0)) {
          initialComponent = 'performance';
          isFound = true;
        }
      }
    }
    if (detail.role === 'Client') {
      initialComponent = 'client';
    }

    return (
      <div className={`main ${activeOverlay ? 'active-overlay' : ''}`}>
        {loggedIn ? <Grid container direction='row' className='main-container'>
          {detail.role !== 'Client' ? <Grid item md={2} lg={2} className='left left-section'>
            <LeftMenu />
          </Grid> : ""}
          <Grid item xs={12} md={detail.role !== 'Client' ? 10 : false} lg={detail.role !== 'Client' ? 10 : false}>
            <section className='right right-section'>
              <NavBar history={this.props.history} />
              <div className='right-container'>
                <section className='component-wrapper'>
                  <Switch>
                    {initialComponent === 'Users' ? <Route exact path='/' component={Users} /> :
                      initialComponent === 'vessel' ? <Route exact path='/' component={vessel} /> :
                        initialComponent === 'voyage' ? <Route exact path='/' component={voyage} /> :
                          initialComponent === 'performance' ? <Route exact path='/' component={performance} /> :
                            initialComponent === 'client' ? <Route exact path='/' component={Client} /> :
                              <Route exact path='/' component={Users} />}
                    <Route exact path='/' component={initialComponent} />
                    <Route exact path='/user' component={Users} />
                    <Route exact path='/vessel' component={vessel} />
                    <Route exact path='/voyage' component={voyage} />
                    <Route exact path='/performance' component={performance} />
                    <Route exact path='/performanceGraph' component={PerformanceGraph} />
                    <Route exact path='/vesselList' component={vesselList} />
                  </Switch>
                </section>
              </div>
            </section>
          </Grid>
        </Grid>
          :
          <Route exact path='/' component={Login} />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
