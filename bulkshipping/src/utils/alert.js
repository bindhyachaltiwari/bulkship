import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Alert(props) {

  return (
    <div>
      <Dialog
        open={props.alertDetails.openAlert || false}
        onClose={props.handleCancelAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.alertDetails.titleMsg}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.alertDetails.descrMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCancelAlert} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}