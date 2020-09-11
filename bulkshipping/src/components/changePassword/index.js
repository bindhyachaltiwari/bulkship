import React, { Component } from 'react';
import ScrollableTabsButtonAuto from '../sub-component/ScrollableTabsButtonAuto';
import { connect } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api";

class changePassword extends Component {

    constructor(props) {
        super(props);
        this.defaultError = {
            confirmPassword: 'Password doesnot match.',
            passwordLength: 'Password must be of 8 digits.',
            passwordStrength: 'Must have at least one uppercase, one lowercase, one number and one special character',
            passwordUpdated: 'Password updated successfully',
            passwordUpdatedFailed: 'Update password failed. Please try again...'
        };
        this.state = {
            formData: {
                updatePassword: '',
                confirmPassword: '',
            },
            error: {
                updatePasswordError: '',
                confirmPasswordError: '',
            },
        };
    }

    onInputHandler = (e) => {
        const value = e.target.value;
        const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            value
        );
        const { formData, error } = this.state;
        if (e.target.name === 'updatePassword') {
            formData.updatePassword = value;
            const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
            if (value.length < 8) {
                error.updatePasswordError = this.defaultError.passwordLength;
            } else if (!regex.test(value)) {
                error.updatePasswordError = this.defaultError.passwordStrength;
            } else {
                error.updatePasswordError = '';
            }
        } else if (e.target.name === 'confirmPassword') {
            formData.confirmPassword = value;
            if (formData.updatePassword !== value) {
                error.confirmPasswordError = this.defaultError.confirmPassword;
            } else {
                error.confirmPasswordError = '';
            }
        }

        this.setState({ formData, error });
    };

    handleIconDetail = (event, value) => {
        if (value === 1) {
            this.props.history.goBack();
        }
    };

    updatePassword = async () => {
        const { formData, error } = this.state;
        const data = {
            user: this.props.history.location.state.result,
            confirmPass: formData.confirmPassword
        }
        const resp = await api.updatePassword(data);
        if (resp && resp.data && resp.data.status) {
            formData.confirmPassword = '';
            formData.updatePassword = '';
            error.confirmPasswordError = this.defaultError.passwordUpdated;
            this.setState({ formData, error });
        } else {
            error.confirmPasswordError = this.defaultError.passwordUpdatedFailed
            this.setState({ error });
        }
    }

    getTabData = () => {
        const { formData, error } = this.state;
        const { updatePassword, confirmPassword } = formData;
        const { updatePasswordError, confirmPasswordError } = error;
        const tabs = {
            tabsLabel: [{
                label: <span className='labelColor'>CHANGE PASSWORD</span>
            }, {
                label: <span className='labelColor'>BACK</span>
            }],
            tabPanelChild: [{
                child: <main id="main" className="login-container">
                    <form name="updatePasswordForm" role="form" method="post" encType="multipart/form-data"            >
                        <h3>Change Password</h3>
                        <div className="form-group">
                            <label>New password</label>
                            <input type="password" className="form-control" placeholder="Enter passsword" name="updatePassword" value={updatePassword} tabIndex="1" onChange={this.onInputHandler} />
                            {updatePasswordError && <p className="error">{updatePasswordError}</p>}
                        </div>
                        <div className="form-group">
                            <label>Confirm password</label>
                            <input type="password" className="form-control" placeholder="Enter confirm password" name="confirmPassword" value={confirmPassword} tabIndex="1" onChange={this.onInputHandler} />
                            {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
                        </div>
                        <button type="button" disabled={updatePasswordError || confirmPasswordError || !updatePassword.length || !confirmPassword.length} className="btn btn-primary btn-block" onClick={this.updatePassword}> Submit </button>
                    </form>
                </main>
            },
            {}]
        }

        return tabs;
    }

    /* tab data end */

    render() {
        const { localClickedtTab } = this.state;
        return (
            <div className='my-profile'>
                <ScrollableTabsButtonAuto paper={true} tabs={this.getTabData()} onChange={this.handleIconDetail} TabIndicatorProps={{ style: { background: '#e37933' } }} newTabVal={localClickedtTab} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { ui, detail } = state;
    return {
        ui,
        detail
    };
}


export default connect(mapStateToProps, null)(changePassword);
