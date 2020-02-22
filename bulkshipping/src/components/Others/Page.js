import React from 'react';
import LoginHome from '../Login/LoginHome';
import ClientHome from '../Client/ClientHome';
import AdminHome from '../Admin/AdminHome';
import ManagerHome from '../Manager/ManagerHome';

function Page(props) {
    const { displayName, isLoggedIn, role, companyName, userName } = props.state;
    if (isLoggedIn) {
        switch (role.toLowerCase()) {
            case 'admin':
                return <AdminHome companyName={companyName} displayName={displayName} userName={userName} />;
            case 'manager':
                return <ManagerHome companyName={companyName} displayName={displayName} userName={userName} />;
            case 'client':
                return <ClientHome companyName={companyName} displayName={displayName} userName={userName} />;
            default:
                return <LoginHome />;
        }
    }
    return <LoginHome />;
}
export default Page