
import React from 'react';
import Popup from 'reactjs-popup';
import { TextField, Button, IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';

const AddDynamicField = props => {
    return (
        <>
            <Popup trigger={<IconButton aria-label='Add new field'><AddCircleTwoToneIcon /></IconButton>}>
                <form id='newFieldForm' autoComplete='off' onSubmit={props.submitNewFieldDetails}>
                    <TextField
                        required
                        inputProps={{ maxLength: 25 }}
                        id='fieldLabel'
                        label='Field Label'
                        autoComplete='off'
                    />
                    <TextField
                        required
                        inputProps={{ maxLength: 50 }}
                        id='fieldValue'
                        label='Field Value'
                        autoComplete='off'
                    />
                    <Button
                        type='submit'
                        style={{ marginTop: '10%' }}
                        variant='contained'
                        size='small'
                        color='primary'
                        startIcon={<SaveIcon />}> Save</Button>
                </form>
            </Popup>
        </>
    )
}

export default AddDynamicField