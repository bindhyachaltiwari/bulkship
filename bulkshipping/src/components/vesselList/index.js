import React, { Component } from 'react';


class vesselList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const vesselDetails = this.props.history.location.state.result;
        return(
            <div>
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
        )
    }

}
export default vesselList