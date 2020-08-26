import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import { Paper, Grid, Button, TextField } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import api from '../../../api';

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  inputField: {
    marginBottom: 20,
  },
}));

export default function UploadDocumentsPopup(props) {
  const classes = useStyles();
  const open = Boolean(props.anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [description, setDescription] = React.useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = React.useState("");
  const [uploadedImage, setUploadedImage] = React.useState({});

  const uploadDocument = async () => {
    if (!description.trim() || !uploadedImage.name) {
      return alert("Caption or file is missing");
    }

    let formData = new FormData();
    formData.append("description", description);
    formData.append("voyageId", props.voyageId);
    formData.append("file", uploadedImage);

    let response = await api.uploadDocument(formData);
    if (response.data.status) {
      props.handleClose();
      props.getVoyageDocuments();
    }
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={props.anchorEl}
      onClose={props.handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Paper style={{ margin: "1%" }}>
        <Grid style={{ marginLeft: "25%" }} container>
          <Grid item xs={12}>
            <TextField
              inputProps={{ maxLength: 25 }}
              id="fieldLabel"
              label="Description*"
              autoComplete="off"
              value={description}
              className={classes.inputField}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Grid>
          <br />
          <br />
          <Grid item xs={12}>
            <input
              type="file"
              className="Upload__Input"
              onChange={(event) => {
                setUploadedImageUrl(URL.createObjectURL(event.target.files[0]));
                setUploadedImage(event.target.files[0]);
              }}
            />
          </Grid>
        </Grid>
        <Button
          style={{ marginLeft: "40%" }}
          className="white-color btn-save"
          onClick={uploadDocument}
          variant="contained"
          size="small"
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </Paper>
    </Popover>
  );
}
