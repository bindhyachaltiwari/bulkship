import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

class ManagerHome extends Component {

    render() {
        return (
            <div className="about_us_2 about_us_2_animated">
                <h2> Welcome Mr. {this.capitalize(localStorage.getItem('displayName'))}</h2>
                <div style={{ display: 'inline-block', marginTop: '15%' }}>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px' }} to="/viewAllClients">View All Clients </Link>
                    <Link style={{ width: '300px', height: '40px', marginRight: '80px' }} to="/viewAllVessels">View All Vessels</Link>
                    {/* <Link style={{ width: '300px', height: '40px', marginRight: '80px' }} to="/fillVoyageDetails">Fill Voyage Details </Link>
                    <Link style={{ width: '300px', height: '40px' }} to="/fillPerformanceDetails">Fill Performance Details</Link> */}
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