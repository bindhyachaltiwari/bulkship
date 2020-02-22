import React from 'react';
function DisplaySelectedVesselPerformance(props) {
  return (
    <div>
      <button style={{ top: "4%", left: "2%", position: "fixed" }} onClick={props.handleBackButton}>Back</button>
      <h3 style={{ marginTop: '3%' }}> Performace page</h3>
    </div>
  );
}
export default DisplaySelectedVesselPerformance;