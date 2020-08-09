import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { Paper, Grid, Button, TextField } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import './style.scss';

export default function SimplePopover(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
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
                                    id='fieldLabel'
                                    label='Field Label *'
                                    autoComplete='off'
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    inputProps={{ maxLength: 50 }}
                                    id='fieldValue'
                                    label='Field Value'
                                    autoComplete='off'
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