import React from 'react';
import Button from '@material-ui/core/Button';
function LogoutButton(props) {
    return (
        <Button
        className = 'backButton' onClick={props.onClick}>
        Logout
      </Button>
    );
}
export default LogoutButton;