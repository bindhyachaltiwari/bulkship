import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Footer extends Component {

  constructor(props) {
    super(props);
    this.logoutAndToggleState = this.logoutAndToggleState.bind(this);
  }

  logoutAndToggleState() {
    localStorage.clear();
  }

  render() {
    return (
      <footer className='navbar navbar-dark bg-primary fixed-top'>
        <div className='bottom_footer'>
          <Link className='navbar-brand' to='/'>
            Home
            </Link>
          <Link className='navbar-brand' to='/about'>
            About
            </Link>
          <Link className='navbar-brand' to='/location'>
            Locations
            </Link>
          {localStorage.getItem('authToken') ? (
            <Link className='navbar-brand' to='/login' onClick={this.logoutAndToggleState}>
              Logout
             </Link>) : (
              <Link className='navbar-brand' to='/login'>
                Login
                </Link>
            )}
        </div>
      </footer>
    )
  }
}

export default Footer;