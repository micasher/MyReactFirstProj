import { Button, Grid } from "@mui/material";
import React, { Fragment } from "react";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
const FormButtonsComponent = ({
  onCancel,
  onReset,
  onRegister,
  clickBtnText,
  disableProp,
}) => {
  const handleCancelBtnClick = () => {
    onCancel();
  };
  const handleResetBtnClick = () => {
    onReset();
  };
  const handleBtnClick = () => {
    onRegister();
  };
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleCancelBtnClick}
            color="error"
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleResetBtnClick}
            color="info"
          >
            <AutorenewOutlinedIcon />
          </Button>
        </Grid>
      </Grid>
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleBtnClick}
        color="success"
        disabled={disableProp}
      >
        {clickBtnText}
      </Button>
    </Fragment>
  );
};

export default FormButtonsComponent;
