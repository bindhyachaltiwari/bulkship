import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class AdminHome extends Component {

    history;

    render() {
        return (
            <div className='about_us_2 about_us_2_animated'>
                <h2> Welcome Mr. {this.capitalize(localStorage.getItem('displayName'))}</h2>
                <div style={{ display: 'inline-block', marginTop: '15%' }}>

                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/addNewUser'>Add New User </Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/viewAllUsers'>View All Users </Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', pointerEvents: 'none' }} to='/editUserDetails'>Edit User Details</Link><br /><br />

                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/addNewVessel'>Add New Vessel</Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/viewAllVessels'>View All Vessels</Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/editVesselDetails'>Edit Vessel Details</Link><br /><br />

                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'green' }} to='/fillVoyageDetails'> Fill Voyage Details</Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'green' }} to='/viewVoyageDetails' >View Voyage Details</Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'green' }} to='/editVoyageDetails'> Edit Voyage Details</Link><br /><br />

                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/fillPerformanceDetails' >Fill Performance Details</Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', pointerEvents: 'none' }} to='/viewPerformanceDetails' >View Performance Details</Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', pointerEvents: 'none' }} to='/editPerformanceDetails' >Edit Performance Details</Link>
                </div>
            </div>
        )
    }
    capitalize = s => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

export default withRouter(AdminHome);