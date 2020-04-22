import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class ManagerHome extends Component {

    render() {
        let isAdmin = localStorage.getItem('isAdmin');
        if(isAdmin === 'true') {
            isAdmin = true;                
        }
        else {
            isAdmin = false;
        }
        return (
            <div className="about_us_2 about_us_2_animated">
                <h2> Welcome Mr. {this.capitalize(localStorage.getItem('displayName'))}</h2>
                <div style={{ display: 'inline-block', marginTop: '15%' }}>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px' }} to="/viewAllClients">View All Clients </Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px' }} to="/viewAllVessels">View All Vessels</Link>
                    {/* <Link style={{ width: '300px', height: '40px', marginRight: '80px' }} to="/fillVoyageDetails">Fill Voyage Details </Link>
                    <Link style={{ width: '300px', height: '40px' }} to="/fillPerformanceDetails">Fill Performance Details</Link> */}
                    {
                        isAdmin ? (
                            <div>
                            <Link style={{ width: '300px', height: '40px', marginRight: '80px' }} to="/addNewClient">Add New Client </Link>
                            <Link style={{ width: '300px', height: '40px', marginRight: '80px' }} to="/addNewVessel">Add New Vessel</Link>
                            <Link style={{ width: '300px', height: '40px', marginRight: '80px' }} to="/fillVoyageDetails">Fill Voyage Details </Link>
                            <Link style={{ width: '300px', height: '40px',marginRight: '80px' }} to="/fillPerformanceDetails">Fill Performance Details</Link>
                            </div>
                        ) : ''
                    }
                </div>
            </div>
        )
    }
    capitalize = s => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
}

export default withRouter(ManagerHome);