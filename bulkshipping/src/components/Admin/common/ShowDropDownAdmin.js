import React from 'react';
import Select from 'react-select';

const ShowDropDownAdmin = props => {
    const clients = props.state.allClients.sort().map(v => ({
        label: v,
        value: v
    }));

    const vessels = props.state.allVslForSelectedClient.sort().map(v => ({
        label: v,
        value: v
    }));

    const dates = props.state.allCpDatesForSelectedClient.sort().map(v => ({
        label: v,
        value: v
    }));

    return (
        <div style={{ display: 'flex', marginTop: '2%' }}>
            <div className='fillPerformanceDropDowns'>
                <Select
                    value={clients.filter(({ value }) => value === props.state.selectedClient)}
                    onChange={props.handleClientListChange}
                    options={clients}
                    placeholder='Select Client'
                    isDisabled={!clients || !clients.length}
                /></div>
            <div className='fillPerformanceDropDowns'>
                <Select
                    value={vessels.filter(({ value }) => value === props.state.selectedVessel)}
                    onChange={props.handleVesselListChange}
                    options={vessels}
                    placeholder='Select Vessel'
                    isDisabled={!vessels || !vessels.length}
                /></div>
            <div className='fillPerformanceDropDowns'>
                <Select
                    value={dates.filter(({ value }) => value === props.state.selectedCpDate)}
                    onChange={props.handleCpDateChange}
                    options={dates}
                    placeholder='Select CP Date'
                    isDisabled={!dates || !dates.length}
                />
            </div>
        </div>
    )
}

export default ShowDropDownAdmin