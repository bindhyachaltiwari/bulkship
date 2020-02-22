import React from 'react';
import Select from 'react-select';

const ShowDropDownClient = props => {
    const items = props.uniqueVessel.sort().map(v => ({
        label: v,
        value: v
    }));

    const dates = props.allCpDates.sort().map(v => ({
        label: v,
        value: v
    }));

    return (
        <div>
            <Select
                value={items.filter(({ value }) => value === props.selectedVessel)}
                onChange={props.handleVesselListChange}
                options={items}
                placeholder='Select Vessel'
                isDisabled={!items || !items.length}
            />
            <br />
            <Select
                value={dates.filter(({ value }) => value === props.selectedCpDate)}
                onChange={props.handleCpDateChange}
                options={dates}
                placeholder='Select CP Date'
                isDisabled={!dates || !dates.length}
            />
        </div>
    )
}

export default ShowDropDownClient