import React from "react";
import Logo from './img/logo1.svg';

const Header = () => {
  return (
    <header id="header" className={`fixed-top ${window.location.href.indexOf('Login') === -1 ? 'header-transparent' : ''}`}>
      <div className="container">
        <div className="logo float-left">
          <h1 className="text-light">
            <a href="/">
              <span>Bulkcom Shipping</span>
            </a>
          </h1>
          {/* <a href="/"><img src={Logo} alt="" className="img-fluid" /></a> */}
        </div>

        <nav className="nav-menu float-right d-none d-lg-block">
          <ul>
            <li className={`${window.location.href.indexOf('Login') === -1 ? 'active' : ''}`}>
              <a href="/#intro">Home</a>
            </li>
            <li>
              <a href="/#about">About Us</a>
            </li>
            <li>
              <a href="/#services">Services</a>
            </li>
            <li>
              <a href="/#team">Career</a>
            </li>
            <li>
              <a href="/#contact">Contact Us</a>
            </li>
            <li className={`login-btn ${window.location.href.indexOf('Login') > -1 ? 'active' : ''}`}>
              <svg
                className="login-img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 74.11 89"
              >
                <g id="Calque_2" data-name="Calque 2">
                  <g id="Calque_1-2" data-name="Calque 1">
                    <path d="M37.06,49.47A37.06,37.06,0,0,0,0,86.53a2.47,2.47,0,0,0,4.94,0,32.12,32.12,0,1,1,64.23,0,2.47,2.47,0,0,0,4.94,0A37.05,37.05,0,0,0,37.06,49.47Z"></path>
                    <path d="M37.06,47.76A23.88,23.88,0,1,0,13.18,23.88,23.89,23.89,0,0,0,37.06,47.76Zm0-42.82A18.94,18.94,0,1,1,18.12,23.88,19,19,0,0,1,37.06,4.94Z"></path>
                  </g>
                </g>
              </svg>
              <a href='/Login' target="_blank">E-Ops Login</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
