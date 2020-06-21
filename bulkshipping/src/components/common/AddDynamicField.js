import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { Paper, Grid, Button, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import './style.scss';
import miscUtils from '../../utils/miscUtils';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
}));

export default function SimplePopover(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [validity, setValidity] = React.useState({});
    const [isformValid, setIsformValid] = React.useState(false);
    const [otherFields, setOtherFields] = React.useState({});
    const [validationtype, setValidationtype] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = e => {
        e.preventDefault();
        const { id, value, name } = e.target;
        let validity = validity;
        let is;
        // let { isformValid, validity, otherFields } = localState;
        if (typeof e.target.getAttribute === 'function') {
            let validationtype = e.target.getAttribute('type');
            if (validationtype) {
                const resp = miscUtils.isFieldValid(validationtype, value, validity, id);
                isformValid = !resp.v;
                setValidity(resp.validity);
                setValidationtype(validationtype);
                setIsformValid(!resp.v);
            }
        }

        if (id) {
            Object.assign(otherFields, { [id]: value });
        } else {
            Object.assign(otherFields, { [name]: value });
        }

        // localState.otherFields = otherFields;
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    // const { validity } = localState;
    let { fieldLabel } = validity;
    return (
        <div>
            <IconButton onClick={handleClick} aria-describedby={id} aria-label='Add' className='btn-edit'><AddIcon /></IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }} >
                <form id='newFieldForm' autoComplete="off" noValidate onSubmit={props.submitNewFieldDetails}>
                    <Paper style={{ margin: '1%' }}>
                        <Grid style={{ marginLeft: '25%' }} container>
                            <Grid item xs={12}>
                                <TextField
                                    inputProps={{ maxLength: 25 }}
                                    error={validity && validity.fieldLabel && validity.fieldLabel.isInvalid}
                                    id='fieldLabel'
                                    label='Field Label *'
                                    type='aplhaNumeric*'
                                    onChange={handleChange}
                                    value={fieldLabel || ''}
                                    autoComplete='off'
                                    helperText={validity && validity.fieldLabel && validity.fieldLabel.isInvalid ? miscUtils.getErrorMessage(validity.fieldLabel.validationtype) : ''}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    inputProps={{ maxLength: 50 }}
                                    id='fieldValue'
                                    label='Field Value'
                                    autoComplete='off'
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            style={{ marginLeft: '40%' }}
                            className='white-color btn-save'
                            type='submit'
                            variant='contained'
                            size='small'
                            startIcon={<SaveIcon />}
                        > Save  </Button>
                    </Paper>
                </form>
            </Popover>
        </div>
    );
}