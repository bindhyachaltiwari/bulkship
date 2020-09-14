import React from 'react';
import auth0Client from './../../Auth';
import { connect } from 'react-redux';
import { setLoginDetails } from './../../store/actions';
import Overlay from './../sub-component/overlay';
import actionTypes from '../../store/actions/constants';
import './style.scss';
import miscUtils from '../../utils/miscUtils';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';

class NavBar extends React.Component {
    constructor() {
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
        if (!dropdownActive) {
            setOverlay('menu-nav-dropdown');
        } else {
            setOverlay('');
        }
        this.setState({ dropdownActive: !dropdownActive });
    }

    signOut = () => {
        const { saveUsername } = this.props;
        auth0Client.signOut();
        saveUsername('signout');
        window.location.href = '/Login';
        localStorage.removeItem('detail');
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('ui');
    };

    changePassword = () => {
        this.props.history.push({
            pathname: '/changePassword',
            state: {
                result: this.props.detail.userName
            }
        });
    }

    render() {
        const { detail, ui } = this.props;
        const { displayName } = detail;
        let { activeOverlay } = ui;
        miscUtils.schoolDetails = detail.schoolDetails;
        miscUtils.schoolId = detail.schoolId;
        miscUtils.role = detail.role;
        miscUtils.studentId = detail.studentId ? detail.studentId : '';
        const { dropdownActive } = this.state;
        const showOverlay = activeOverlay === 'menu-nav-dropdown';
        return (
            <header style={{ backgroundColor: '#1e4356' }}>
                <nav className={`nav-wrapper ${dropdownActive && 'active-dropdown'}`}>
                    {
                        auth0Client.isAuthenticated() &&
                        <div className='nav-bar'>
                            {/* <span className='logo-wrapper'>logo</span> */}
                            <span className='title'>Bulkcom Shipping</span>
                            <span className='profile-wrapper' onClick={this.toggleDropdown}>
                                <IconButton aria-label='Add' className='btn-logout' ><ExitToAppIcon /></IconButton>
                                <ul className={`profile-dropdown ${dropdownActive ? 'show' : 'hide'}`}>
                                    <li><label className="mr-2 text-black">{`${displayName ? capitalize(displayName) : 'name'}`}</label></li>
                                    <li><button className="btn btn-primary btn-blue" style={{ width: '80%', backgroundColor: '#1e4356' }} onClick={this.changePassword}>Change Password</button></li>
                                    <li><button className="btn btn-primary btn-blue" style={{ width: '80%', backgroundColor: '#1e4356' }} onClick={this.signOut}>Sign Out</button></li>
                                </ul>
                            </span>

                        </div>
                    }
                </nav>
                {showOverlay && <Overlay extraClass='menu-overlay' callback={this.toggleDropdown} />}
            </header>
        );
    }
}

const capitalize = s => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveUsername: (userId) => { dispatch(setLoginDetails(userId)) },
        setOverlay: (data) => { dispatch({ type: actionTypes.SET_OVERLAY, data }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);