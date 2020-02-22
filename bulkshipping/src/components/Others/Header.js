import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.toggleHeaderState =this.toggleHeaderState.bind(this);
    this.logoutAndToggleState = this.logoutAndToggleState.bind(this);
    this.state = {
      showHeader:props.toggleState,
    }
  }
  handleClick = ()=> {
    this.setState({
      showHeader:!this.state.showHeader,
    })
  }
  toggleHeaderState() {
    this.setState({
      showHeader:false,
    })
  }
  logoutAndToggleState() {
    localStorage.setItem('authToken','');
    localStorage.setItem('userRole','');
    localStorage.setItem('displayName','');
    this.setState({
      showHeader:false,
    })
  }
  render() {
    return (
      <div className={this.state.showHeader ? 'menu_open menu':'menu'}  id="main_menu">
      <div className="header_right">
                      <div className="explore" id="menu_label">explore</div>
                      <img src="https://aegisuae.com/resources/img/arrow_white.svg" alt="arrow" className="arrow"/>
                      <button className="js-toggle-nav c-btn-nav -inited" id="menu_button" onClick={this.handleClick} >
                          <div className="c-btn-nav_burger">
                              <span className="c-burger_top"></span>
                              <span className="c-burger_middle"></span>
                              <span className="c-burger_bottom"></span>
                              <div className="c-close-burger_top"></div>
                              <div className="c-close-burger_bottom"></div>
                          </div>
                      </button>
      </div>
      <div className={this.state.showHeader ? 'left_menu_open left_menu':'left_menu'} id="left_menu" scroll="no">
          <ul className ={this.state.showHeader ? 'opened main_nav':'main_nav'} id="navigation">
          <li>
          <Link className="" to="/" onClick ={this.toggleHeaderState}>
              Home
              <span className="menu_line"></span>
          </Link>
          </li>
          <li>
          <Link className="" to="/about" onClick ={this.toggleHeaderState}>
            About
            <span className="menu_line"></span>
          </Link>
          </li>
          <li>
            <Link className="" to="/location" onClick ={this.toggleHeaderState}>
            Locations
            <span className="menu_line"></span>
          </Link>
          </li>
          {localStorage.getItem('authToken') ? (
             <li>
             <Link className="" to="/login" onClick ={this.logoutAndToggleState}>
             Logout
             <span className="menu_line"></span>
           </Link>
           </li>
          ) : (
            <li>
              <Link className="" to="/login" onClick ={this.toggleHeaderState}>
              Login
              <span className="menu_line"></span>
              </Link>
            </li>
          )}
        </ul>
      </div>
      </div>
    )
  }
  
}
export default Header;