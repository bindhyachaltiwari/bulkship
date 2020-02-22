import React from 'react';

const DisplaySelectedVesselDetails = props => {
    var pairs = [];
    const getDisplayKey = key => {
        key = key.charAt(0).toUpperCase() + key.slice(1)
        return key.replace(/([A-Z])/g, ' $1').trim()
    }

    for (var key in props.vesselDetails) {
        pairs.push(
            <tr>
                <td>
                    <label>
                        {getDisplayKey(key)}
                    </label>
                </td>
                <td>
                    {props.vesselDetails[key]}
                </td>
            </tr>
        )
    }

    return (
        <form>
            <table style={{marginTop:'5%'}}>
                <thead>
                </thead>
                <tbody>
                    {pairs}
                </tbody>
            </table>
        </form>
    )
}


export default DisplaySelectedVesselDetails