import React, { Component } from 'react';


class vesselList extends Component {
    constructor(props) {
        super(props);
        this.goback = this.goback.bind(this);
    }

    goback() {
        this.props.history.goBack();
    }
    render() {
        const vesselDetails = this.props.history.location.state.result;
        return(
            <div>
            <div className="back-button">
                <button onClick={this.goback} className="MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary MuiTab-labelIcon"><span class="MuiTab-wrapper"><svg class="MuiSvgIcon-root labelColor" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path></svg><span class="labelColor">BACK</span></span></button>
            </div>
            <div className="vesselList">
                {vesselDetails.map((item,i) => 
            <ul>
            <li key={i}>DWT : {item.DWT}</li>
          <li key={i}>VesselName :{item.vesselName}</li>
          <li key={i}>Built Year :{item.built}</li>
          <li key={i}>Draft :{item.draft}</li>
          <li key={i}>GRT :{item.GRT}</li>
          <li key={i}>NRT :{item.NRT}</li>
          <li key={i}>Cranes :{item.cranes}</li>
          <li key={i}>IMO :{item.IMO}</li>
          <li key={i}>Flag :{item.flag}</li>
          <li key={i}>LOA :{item.LOA}</li>
          <li key={i}>Beam :{item.beam}</li>
          <li key={i}>TPC :{item.tpc}</li>
          <li key={i}>GrainCapacity :{item.grainCapacity}</li>
          <li key={i}>HoldsHatches :{item.holdsHatches}</li>
          <li key={i}>BaleCapacity :{item.baleCapacity}</li>
          <li key={i}>VesselType :{item.vesselType}</li>
          </ul>
          )}
            </div>
            </div>
        )
    }

}
export default vesselList