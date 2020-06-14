import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LeftMenu from '../Common/LeftMenu'

class AdminHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: [
                {
                    link: 'View All User',
                    title: 'User Manager',
                    links: ['addNewUser', 'viewAllUsers', 'editUserDetails'], titles: ['Add New User', 'View All Users', 'Edit All Users'],
                },
                {
                    link: 'View Vessel',
                    title: 'Vessel Manager',
                    links: ['addNewVessel', 'viewAllVessels', 'editVesselDetails'], titles: ['Add New Vessel', 'View All Vessels', 'Edit Vessel Details'],

                },
                {
                    link1: 'Fill Voyage Details',
                    title: 'Fill Details',
                    link2: 'Fill Performance Details',
                    links1: ['fillVoyageDetails', 'viewVoyageDetails', 'editVoyageDetails'], titles1: ['Fill Voyage Details', 'View Voyage Details', 'Edit Voyage Details'],
                    links2: ['fillPerformanceDetails', 'viewPerformanceDetails', 'editPerformanceDetails'], titles2: ['Fill Performance Details', 'View Performance Details', 'Edit Performance Details'],
                },
            ],
            navigateLinks: []
        }
    }

    history;

    render() {
        return (
            <div className='about_us_2 about_us_2_animated'>
                <h2> Welcome Mr. {this.capitalize(localStorage.getItem('displayName'))}</h2>
                <LeftMenu menuItems={this.state.menuItems} />
            </div>
        )
    }
    capitalize = s => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

export default withRouter(AdminHome);