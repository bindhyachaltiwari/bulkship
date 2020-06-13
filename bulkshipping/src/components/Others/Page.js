import React from 'react';
import LoginHome from '../Login/LoginHome';
import ClientHome from '../Client/ClientHome';
import AdminHome from '../Admin/AdminHome';
import ManagerHome from '../Manager/ManagerHome';
import ViewAllUsers from '../Admin/user/ViewAllUsers'

function Page(props) {
    if (localStorage.getItem('authToken')) {
        switch (localStorage.getItem('userRole').toLowerCase()) {
            case 'admin':
                return <ViewAllUsers/>;
            case 'manager':
                return <ViewAllUsers/>;
            case 'client':
                return <ClientHome/>;
            default:
                return <LoginHome />;
        }
    }
    return <LoginHome />;
}
export default Page