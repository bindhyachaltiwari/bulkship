
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
class LeftMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuItems: [
                {
                    link: 'View All User',
                    title: 'User Manager',
                    linksTo: 'viewAllUsers', titles: ['Add New User', 'View All Users', 'Edit All Users'],
                },
                {
                    link: 'View Vessel',
                    title: 'Vessel Manager',
                    linksTo: 'viewAllVessels', titles: ['Add New Vessel', 'View All Vessels', 'Edit Vessel Details'],

                },
                {
                    link1: 'View Voyage Details',
                    title: 'Fill Details',
                    link2: 'View Performance Details',
                    linksTo1: 'viewVoyageDetails', titles1: ['Fill Voyage Details', 'View Voyage Details', 'Edit Voyage Details'],
                    linksTo2: 'viewPerformanceDetails', titles2: ['Fill Performance Details', 'View Performance Details', 'Edit Performance Details'],
                },
            ],
        }
    }

    render() {
        let { menuItems } = this.state;

        return (

            <>

                <Grid item md={3} lg={3} className='left left-section'>
                    <div className="left-menu-wrapper">

                        <div className='content-wrapper'>
                            <div className='title'>
                                <h1 className='heading_1'>Bulk Shipping</h1></div>
                            <div className='menu-items-wrappers'>
                                <ul className='menu-items'>
                                    {menuItems && menuItems.length && menuItems.map((item, index) => {
                                        if (index === 2) {
                                            return <li className='list-item'>
                                                <span>{item.title}</span>
                                                <Link style={{ cursor: 'pointer' }} to={item.linksTo1} navigation={item.links1} title={item.titles1}>{item.link1}</Link>
                                                <Link style={{ cursor: 'pointer' }} to={item.linksTo2} navigation={item.links2} title={item.titles2}>{item.link2}</Link>
                                            </li>
                                        }
                                        else {
                                            return <li className='list-item'>
                                                <span>{item.title}</span>
                                                <Link style={{ cursor: 'pointer' }} to={item.linksTo} navigation={item.links} title={item.titles}>{item.link}</Link>
                                            </li>
                                        }
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </Grid>
            </>
        );
    }
}
export default LeftMenu