import React, { Component } from 'react';
import axios from 'axios';
import Page from '../Others/Page';
import LogoutButton from './LogoutButton';
export default class LoginHome extends Component {

    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            userName: '',
            password: '',
            isLoggedIn: false,
            role: ''
        }
    }

    handleLogoutClick() {
        this.setState({
            userName: '',
            password: '',
            isLoggedIn: false,
            role: ''
        });
    }

    handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    async handleLoginClick(e) {
        e.preventDefault();
        const { userName, password } = this.state;
        if (userName && password) {
            let resp = (await axios.post('http://localhost:3003/userDetails/login', {
                headers: { 'Content-Type': 'application/json' },
                data: {
                    'userName': userName,
                    'password': password
                }
            }));

            resp = resp.data;
            if (!resp.status) {
                alert(resp.err);
                return;
            }

            this.setState({
                isLoggedIn: true,
                role: resp.role,
            });
        } else {
            alert('Enter Credentials');
        }
    }

    render() {
        const { isLoggedIn } = this.state;
        let button;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        }
        return (
            <div>
                <Page handleChange={this.handleChange} match={this.props.match} state={this.state} />
                {button}
            </div>
        )
    }
}