import React, { Component } from 'react';
import '../../../css/Admin.css';
import FormHelperText from '@material-ui/core/FormHelperText'
import Button from '@material-ui/core/Button';
import api from '../../api';
import AddDynamicField from '../common/AddDynamicField';

class AddNewVessel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vesselDetails: {
        otherFields: {}
      },
      success: true,
      errorMsg: '',
      newFields: []
    };
    this.handleVesselDetailsChange = this.handleVesselDetailsChange.bind(this);
    this.handleAddNewVesselSubmit = this.handleAddNewVesselSubmit.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.submitNewFieldDetails = this.submitNewFieldDetails.bind(this);
    this.handleNewFieldDetailsChange = this.handleNewFieldDetailsChange.bind(this);
  }

  handleVesselDetailsChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const { vesselDetails } = this.state;
    Object.assign(vesselDetails, { [name]: value.trim() });
    this.setState({ success: true, errorMsg: '', vesselDetails });
  }

  handleBackButton = () => this.props.history.goBack();

  async handleAddNewVesselSubmit(event) {
    event.preventDefault();
    const { vesselDetails } = this.state;
    const data = await api.insertVesselDetails({ vesselDetails });
    if (data.data.status.errors || data.data.status.errmsg) {
      this.setState({
        success: false,
        errorMsg: data.data.status['_message']
      });
      return;
    } else {
      this.setState({
        vesselDetails: {},
        success: false,
        errorMsg: 'Success!! New vessel created = ' + vesselDetails.vesselName,
      });
      document.getElementById('vesselDetailsForm').reset();
      if (document.getElementById('newFieldForm')) {
        document.getElementById('newFieldForm').reset();
      }
    }
  }

  submitNewFieldDetails = e => {
    e.preventDefault();
    console.log(e)
    const inputs = e.target.querySelectorAll('input');
    if (inputs && inputs.length) {
      const { vesselDetails } = this.state;
      const { otherFields } = vesselDetails;
      Object.assign(otherFields, { [inputs[0].value.trim()]: inputs[1].value.trim() });
      this.setState({ vesselDetails });
      document.getElementById('newFieldForm').reset();
      this.displayOtherFields();
    }
  };

  handleNewFieldDetailsChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const { vesselDetails } = this.state;
    const { otherFields } = vesselDetails;
    Object.assign(otherFields, { [name]: value.trim() });
    this.setState({ vesselDetails });
  }

  render() {
    const { errorMsg, success, newFields } = this.state;
    return (
      <div className='about_us_2 about_us_2_animated'>
        <Button variant='contained' size='small' color='primary' onClick={this.handleBackButton} style={{ top: '4%', left: '10%', position: 'fixed' }}> Back </Button>
        <h2>Add New Vessel</h2>
        <AddDynamicField submitNewFieldDetails={this.submitNewFieldDetails} />
        <FormHelperText style={{ textAlign: 'center', fontSize: 'large' }} error={Boolean(!success)}>
          {success ? '' : errorMsg}
        </FormHelperText>

        <form id='vesselDetailsForm' onSubmit={this.handleAddNewVesselSubmit} style={{ margin: '1%' }}>
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
                  <input type='text' name='vesselName' required onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    IMO *
                </label>
                </td>
                <td>
                  <input type='text' name='IMO' required onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    DWT (MT) *
                </label>
                </td>
                <td>
                  <input type='text' name='DWT' required onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Flag
                </label>
                </td>
                <td>
                  <input type='text' name='flag' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Vessel Type
                </label>
                </td>
                <td>
                  <input type='text' name='vesselType' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Built Year
                </label>
                </td>
                <td>
                  <input type='text' name='built' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Draft (M)
                </label>
                </td>
                <td>
                  <input type='text' name='draft' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    LOA (M)
                </label>
                </td>
                <td>
                  <input type='text' name='LOA' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Beam (M)
                </label>
                </td>
                <td>
                  <input type='text' name='beam' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    GRT (MT)
                </label>
                </td>
                <td>
                  <input type='text' name='GRT' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    NRT (MT)
                </label>
                </td>
                <td>
                  <input type='text' name='NRT' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    TPC (MT/CBM)
                </label>
                </td>
                <td>
                  <input type='text' name='TPC' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                  Holds/Hatches
                </label>
                </td>
                <td>
                  <input type='text' name='holdsHatches' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>

              <tr>
                <td>
                  <label>
                    Grain Capacity (CBM)
                </label>
                </td>
                <td>
                  <input type='text' name='grainCapacity' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Bale Capacity (CBM)
                </label>
                </td>
                <td>
                  <input type='text' name='baleCapacity' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Cranes (MT)
                </label>
                </td>
                <td>
                  <input type='text' name='cranes' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Grabs (CBM)
                </label>
                </td>
                <td>
                  <input type='text' name='grabs' onChange={this.handleVesselDetailsChange} autoComplete='off' />
                </td>
              </tr>
              {newFields}
            </tbody>
          </table>
          <Button
            type='submit'
            variant='contained'
            size='small'
            color='primary'
            style={{ margin: '16px' }}>
            Submit </Button>
        </form>
      </div>
    );
  }

  displayOtherFields() {
    const otherFields = this.state.vesselDetails.otherFields;
    let data = [];
    if (otherFields && Object.keys(otherFields).length) {
      const keys = Object.keys(otherFields);
      for (let i = 0; i < keys.length; i++) {
        data.push(<tr key={i}>
          <td key={keys[i]}>
            <label>
              {keys[i]}
            </label>
          </td>
          <td key={otherFields[keys[i]]}>
            <input type='text' maxLength={50} required name={keys[i]} onChange={this.handleNewFieldDetailsChange} defaultValue={otherFields[keys[i]]} />
          </td>
        </tr>)
      }
    }
    this.setState({ newFields: data });
  }

}

export default AddNewVessel;