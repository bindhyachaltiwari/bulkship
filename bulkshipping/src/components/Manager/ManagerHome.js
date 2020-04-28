
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
class ManagerHome extends Component {
    constructor(props) {
        super(props);
        let localRoles = JSON.parse(localStorage.getItem('managerRoles'));
        if (Object.keys(localRoles).length) {
            this.state = {
                arrayItemsRoles: [{ role: localRoles.AddUser, to: '/addNewUser', text: 'Add New User' },
                { role: localRoles.AddVessel, to: '/addNewVessel', text: 'Add New Vessel' },
                { role: localRoles.FillVoyage, to: '/fillVoyageDetails', text: 'Fill Voyage Details' },
                { role: localRoles.FillPerformance, to: '/fillPerformanceDetails', text: 'Fill Performance Details' },
                { role: localRoles.ViewUsers, to: '/viewAllUsers', text: 'View All Users' },
                { role: localRoles.ViewVessels, to: '/viewAllVessels', text: 'View All Vessels' },
                { role: localRoles.EditVessels, to: '/editVesselDetails', text: 'Edit Vessel Details' }]
            }
        }
    }
    render() {
        const data = this.state.arrayItemsRoles.map(function (item, i) {
            return item.role ?
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