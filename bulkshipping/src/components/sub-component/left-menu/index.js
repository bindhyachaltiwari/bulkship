import React from 'react';
import { Link } from 'react-router-dom';
import { leftMenuMapping } from './constants';
import { connect } from 'react-redux';
import Overlay from './../overlay';
import actionTypes from '../../../store/actions/constants';

import './style.scss';

class LeftMenu extends React.Component {
    constructor() {
        super();

        this.state = {
            activeMenu: false
        }
    }
    clickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    toggleMenu = (e) => {
        e = e || window.event;
        e.stopPropagation();
        const { activeMenu } = this.state;
        const { setOverlay } = this.props;
        if (!activeMenu) {
            setOverlay('menu-overlay');
        } else {
            setOverlay('');
        }
        this.setState({ activeMenu: !activeMenu });


    }

    render() {
        const { ui, detail } = this.props;
        let { activeOverlay } = ui;
        const isMenuActive = this.state.activeMenu;
        let menuItem = [];
        if (detail.role === 'Admin') {
            menuItem = ['user', 'vessel', 'voyage', 'performance'];
        } else if (detail.role === "Manager") {
            const mr = this.props.detail.managerRoles;
            if (mr.some(s => s.indexOf('User') >= 0)) {
                menuItem.push('user')
            }
            if (mr.some(s => s.indexOf('Vessel') >= 0)) {
                menuItem.push('vessel')
            }
            if (mr.some(s => s.indexOf('Voyage') >= 0)) {
                menuItem.push('voyage')
            }
            if (mr.some(s => s.indexOf('Performance') >= 0)) {
                menuItem.push('performance')
            }
        }
        return (
            <>
                <div className={`left-menu-wrapper ${isMenuActive ? 'active-menu' : ''}`}>
                    <div className='menu-bar'>
                        <div className='menu-icon' onClick={this.toggleMenu}>
                            <span className='bar b1'></span>
                            <span className='bar b2'></span>
                            <span className='bar b3'></span>
                        </div>
                    </div>
                    <div className='content-wrapper'>
                        <div className='title'>
                            <h1 className='heading_1'>Bulkcom Shipping</h1></div>
                        <div className='menu-items-wrappers'>
                            <ul className='menu-items' onClick={this.clickHandler}>
                                {menuItem && menuItem.length && menuItem.map((item, index) => {
                                    let isActive = false;
                                    isActive = (index === 0) ? true : false;
                                    return <li className={`list-item ${isActive && 'active'}`} key={`item__${index}`} data-link={leftMenuMapping[item].link}>
                                        <Link to={leftMenuMapping[item].link}>{leftMenuMapping[item].title}</Link>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                {activeOverlay && <Overlay extraClass='menu-overlay' callback={this.toggleMenu} />}
            </>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    const { ui, detail } = state;
    return {
        ui, detail
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveTab: (data) => { dispatch({ type: actionTypes.SET_ACTIVE_TAB, data }) },
        setOverlay: (data) => { dispatch({ type: actionTypes.SET_OVERLAY, data }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);