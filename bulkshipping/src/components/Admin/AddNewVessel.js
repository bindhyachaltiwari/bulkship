import React, { Component } from 'react';
import axios from 'axios';
import '../../css/Admin.css';
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button';

class AddNewVessel extends Component {

  vesselDetails = {
    vesselName: '',
    IMO: '',
    DWT: '',
    built: '',
    LOA: '',
    beam: '',
    cranes: '',
    grabs: '',
    success: true,
    errorMsg: ''
  };

  constructor(props) {
    super(props);
    this.state = { ...this.vesselDetails };
    this.handleVesselDetailsChange = this.handleVesselDetailsChange.bind(this);
    this.handleAddNewVesselSubmit = this.handleAddNewVesselSubmit.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  handleVesselDetailsChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      success: true,
      errorMsg: ''
    });
  };

  handleBackButton() {
    this.props.history.goBack();
  }

  async handleAddNewVesselSubmit(event) {
    event.preventDefault();
    const { vesselName, IMO, DWT } = this.state;
    if (!vesselName || !DWT || !IMO) {
      this.setState({
        success: false,
        errorMsg: 'Please fill the required details'
      });
      return;
    }

    let data = (await axios.post('http://localhost:3003/vesselDetails/insertVesselDetails', {
      headers: { 'Content-Type': 'application/json' },
      data: {
        ...this.state
      }
    }));

    if (data.data.status.errors || data.data.status.errmsg) {
      this.setState({
        success: false,
        errorMsg: data.data.status.errmsg
      });
      return;
    } else {
      this.setState({
        ...this.vesselDetails,
        success: false,
        errorMsg: 'Success!! New vessel created = ' + vesselName,
      });
      document.getElementById('vesselDetailsForm').reset();
      return;
    }
  }

  render() {
    return (
      <div className="about_us_2 about_us_2_animated">
        <Button variant="contained" color="primary" onClick={this.handleBackButton} style={{ top: "4%", left: "10%", position: "fixed" }}>
          Back
        </Button>
        <h2>Add New Vessel</h2>
        <FormHelperText style={{ textAlign: 'center', fontSize: 'large' }} error={Boolean(!this.state.success)}>
          {this.state.success ? '' : this.state.errorMsg}
        </FormHelperText>
        <form id='vesselDetailsForm' onSubmit={this.handleAddNewVesselSubmit} style={{ margin: "1%" }}>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label>
                    Vessel Name *
                </label>
                </td>
                <td>
                  <input type="text" name="vesselName" required onChange={this.handleVesselDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    IMO *
                </label>
                </td>
                <td>
                  <input type="text" name="IMO" required onChange={this.handleVesselDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    DWT *
                </label>
                </td>
                <td>
                  <input type="text" name="DWT" required onChange={this.handleVesselDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Built
                </label>
                </td>
                <td>
                  <input type="text" name="built" onChange={this.handleVesselDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    LOA
                </label>
                </td>
                <td>
                  <input type="text" name="LOA" onChange={this.handleVesselDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Beam
                </label>
                </td>
                <td>
                  <input type="text" name="beam" onChange={this.handleVesselDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Cranes
                </label>
                </td>
                <td>
                  <input type="text" name="cranes" onChange={this.handleVesselDetailsChange} autoComplete="off" />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Grabs
                </label>
                </td>
                <td>
                  <input type="text" name="grabs" onChange={this.handleVesselDetailsChange} autoComplete="off" />
                </td>
              </tr>
            </tbody>
          </table>
          <Button
            type="submit"
            variant="raised"
            color="primary"
            style={{ margin: '16px' }}>
            {'Submit'}
          </Button>
        </form>
      </div>
    );
  }
}

export default AddNewVessel;