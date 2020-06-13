import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import LeftMenu from '../Common/LeftMenu'

class AdminHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems:[
                {
                    link: 'View All User',
                    title: 'User Manager',
                    links:['addNewUser','viewAllUsers','editUserDetails'],titles:['Add New User','View All Users','Edit All Users'],
                },
                {
                    link: 'View Vessel',
                    title: 'Vessel Manager',
                    links:['addNewVessel','viewAllVessels','editVesselDetails'],titles:['Add New Vessel','View All Vessels','Edit Vessel Details'],
                    
                },
                {
                    link1: 'Fill Voyage Details',
                    title: 'Fill Details',
                    link2:'Fill Performance Details',
                   links1:['fillVoyageDetails','viewVoyageDetails','editVoyageDetails'],titles1:['Fill Voyage Details','View Voyage Details','Edit Voyage Details'],
                   links2:['fillPerformanceDetails','viewPerformanceDetails','editPerformanceDetails'],titles2:['Fill Performance Details','View Performance Details','Edit Performance Details'],
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
                {/* <div style={{ display: 'inline-block', marginTop: '15%' }}>

                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/addNewUser'>Add New User </Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/viewAllUsers'>View All Users </Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', pointerEvents: 'none' }} to='/editUserDetails'>Edit User Details</Link><br /><br />

                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/addNewVessel'>Add New Vessel</Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/viewAllVessels'>View All Vessels</Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/editVesselDetails'>Edit Vessel Details</Link><br /><br />

                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/fillVoyageDetails'> Fill Voyage Details</Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/viewVoyageDetails' >View Voyage Details</Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'Blue' }} to='/editVoyageDetails'> Edit Voyage Details</Link><br /><br />

                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'green' }} to='/fillPerformanceDetails' >Fill Performance Details</Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color: 'green' }} to='/viewPerformanceDetails' >View Performance Details</Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px', color:'green'}} to='/editPerformanceDetails' >Edit Performance Details</Link>
                </div> */}
                

                   
                        <LeftMenu menuItems = {this.state.menuItems}/>
                    
                    
                
            </div>
        )
    }
    capitalize = s => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

export default withRouter(AdminHome);