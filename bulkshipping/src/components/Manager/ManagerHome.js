
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
class ManagerHome extends Component {
    constructor(props) {
        super(props);
        let localRoles = localStorage.getItem('managerRoles');
        localRoles = localRoles.length && localRoles.split(',');
        this.state = {
            arrayItemsRoles: [{ role: localRoles[0], to: '/addNewUser', text: 'Add New User' },
            { role: localRoles[1], to: '/addNewVessel', text: 'Add New Vessel' },
            { role: localRoles[2], to: '/fillVoyageDetails', text: 'Fill Voyage Details' },
            { role: localRoles[3], to: '/fillPerformanceDetails', text: 'Fill Performance Details' },
            { role: localRoles[4], to: '/viewAllUsers', text: 'View All Users' }]
        }
    }
    render() {
        const data = this.state.arrayItemsRoles.map(function(item, i) {
            return item.role === 'true' ? 
                (<Link style={{ width: '300px', height: '40px', marginRight: '80px' }} key={i} to={item.to}> {item.text} </Link>) :
               ''
        }.bind(this));
        return (
            <div className="about_us_2 about_us_2_animated">
                <h2> Welcome Mr. {this.capitalize(localStorage.getItem('displayName'))}</h2>
                <div style={{ display: 'inline-block', marginTop: '15%' }}>
                    {data}
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