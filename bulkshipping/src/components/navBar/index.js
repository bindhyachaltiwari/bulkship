import React from 'react';
// import {Link, withRouter} from 'react-router-dom';
import auth0Client from './../../Auth';
import { connect } from 'react-redux';
import { setLoginDetails } from './../../store/actions';
import Overlay from './../sub-component/overlay';
import actionTypes from '../../store/actions/constants';
import './style.scss';
import miscUtils from '../../utils/miscUtils';

class NavBar extends React.Component {
  constructor(){
    super();

    this.state = {
        dropdownActive: false,
    }
  }

  toggleDropdown = (e) => {
        e = e || window.event;
        e.stopPropagation();
        const { dropdownActive } = this.state;
        const { setOverlay } = this.props;

        console.log('toggleDropdown: ');
        if(!dropdownActive) {
            setOverlay('menu-nav-dropdown');
        } else {
            setOverlay('');
        }
        this.setState({dropdownActive: !dropdownActive});
  }

  signOut = () => {
    console.log('signout login');
    const { saveUsername } = this.props;
    auth0Client.signOut();
    saveUsername('signout');
    // this.props.history.push('/login');
    window.location.href='/'
  };

    render(){
        const { detail, ui } = this.props;
        const { userId } = detail;
        let { activeOverlay } = ui;
        miscUtils.schoolDetails = detail.schoolDetails;
        miscUtils.schoolId = detail.schoolId;
        miscUtils.role = detail.role;
        miscUtils.studentId = detail.studentId ? detail.studentId: '';
        const { dropdownActive } = this.state;
        const showOverlay = activeOverlay === 'menu-nav-dropdown';
      return (
          <header>
                <nav className={`nav-wrapper ${dropdownActive && 'active-dropdown'}`}>
                    {/* {
                        !auth0Client.isAuthenticated() &&
                        <Link to='login' className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</Link>
                    } */}
                    {
                        auth0Client.isAuthenticated() &&
                        <div className='nav-bar'>
                        {/* <label className="mr-2 text-white">{`${auth0Client.getProfile() && auth0Client.getProfile().name}`}</label>
                        <button className="btn btn-dark" onClick={this.signOut}>Sign Out</button> */}
                        <span className='logo-wrapper'>logo</span>
                        <span className='title'>Bulkcom Shipping</span>
                        <span className='profile-wrapper' onClick={this.toggleDropdown}>
                            <span className='profile-name'>profile</span>
                            <ul className={`profile-dropdown ${dropdownActive ? 'show' : 'hide'}`}>
                                <li><label className="mr-2 text-white">{`${userId ? userId : 'name'}`}</label></li>
                                <li><button className="btn btn-primary" onClick={this.signOut}>Sign Out</button></li>
                            </ul>
                        </span>
                        
                        </div>
                    }
                </nav>
                {showOverlay && <Overlay extraClass='menu-overlay' callback={this.toggleDropdown}/>}
          </header>
      );
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveUsername : (userId) => {dispatch(setLoginDetails(userId))},
        setOverlay : (data) => {dispatch({type: actionTypes.SET_OVERLAY, data})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);