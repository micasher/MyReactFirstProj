import { useState } from "react";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import validateRegisterSchema from "../validation/registerValidation";
import { Alert, Switch } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import RegisterFieldComponent from "../components/RegisterComponent";
import { toast } from "react-toastify";
import FormButtonsComponent from "../components/FormButtonsComponent";
const RegisterPage = () => {
  const [enableRegister, setenableRegister] = useState(true);
  const [isBiz, setIsBiz] = useState(false);
  const [inputState, setInputState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    phone: "",
    biz: isBiz,
  });
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();
  const arrOfInputs = [
    { inputName: "First Name", idAndKey: "firstName", isReq: true },
    { inputName: "Middle Name", idAndKey: "middleName", isReq: false },
    { inputName: "Last Name", idAndKey: "lastName", isReq: true },
    { inputName: "Email", idAndKey: "email", isReq: true },
    { inputName: "Password", idAndKey: "password", isReq: true },
    { inputName: "State", idAndKey: "state", isReq: false },
    { inputName: "Country", idAndKey: "country", isReq: true },
    { inputName: "City", idAndKey: "city", isReq: true },
    { inputName: "Street", idAndKey: "street", isReq: true },
    { inputName: "House Number", idAndKey: "houseNumber", isReq: true },
    { inputName: "Zip Code", idAndKey: "zipCode", isReq: false },
    { inputName: "Phone", idAndKey: "phone", isReq: true },
  ];
  const handleBtnClick = async (ev) => {
    try {
      const JoiResponse = validateRegisterSchema(inputState);
      setInputsErrorsState(JoiResponse);
      if (JoiResponse) {
        return;
      }
      await axios.post("/users/register", {
        firstName: inputState.firstName,
        middleName: inputState.middleName,
        lastName: inputState.lastName,
        email: inputState.email,
        password: inputState.password,
        state: inputState.state,
        country: inputState.country,
        city: inputState.city,
        street: inputState.street,
        houseNumber: inputState.houseNumber,
        zipCode: inputState.zipCode,
        phone: inputState.phone,
        biz: isBiz,
      });
      navigate(ROUTES.LOGIN);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateRegisterSchema(newInputState);
    if (!joiResponse) {
      setInputsErrorsState(joiResponse);
      setenableRegister(false);
      return;
    }

    const inputKeys = Object.keys(inputState);
    for (const key of inputKeys) {
      if (inputState && !inputState[key] && key !== ev.target.id) {
        joiResponse[key] = "";
      }
    }
    setInputsErrorsState(joiResponse);
    setenableRegister(true);
  };
  const handleClearClick = () => {
    const cloneInputState = JSON.parse(JSON.stringify(inputState));
    const inputKeys = Object.keys(cloneInputState);
    for (const key of inputKeys) {
      if (typeof cloneInputState[key] === "string") {
        cloneInputState[key] = "";
      } else {
        setIsBiz(false);
      }
    }
    setInputsErrorsState(null);
    setInputState(cloneInputState);
  };
  const handleBizChange = (ev) => {
    setIsBiz(ev.target.checked);
  };
  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {arrOfInputs.map((input) => (
              <Grid item xs={12} sm={6} key={input.inputName}>
                <RegisterFieldComponent
                  nameOfInput={input.inputName}
                  typeofInput={input.idAndKey}
                  isReq={input.isReq}
                  onInputeChange={handleInputChange}
                  value={inputState[input.idAndKey]}
                />
                {inputsErrorsState && inputsErrorsState[input.idAndKey] && (
                  <Alert severity="warning">
                    {inputsErrorsState[input.idAndKey].map((item) => (
                      <div key={input.idAndKey + "-errors" + item}>{item}</div>
                    ))}
                  </Alert>
                )}
              </Grid>
            ))}
            <Grid item xs={12}>
              <Switch
                checked={isBiz}
                color="primary"
                onChange={handleBizChange}
                label="Business ?"
              />
              Business ?
            </Grid>
          </Grid>
          <FormButtonsComponent
            onCancel={handleCancelBtnClick}
            onReset={handleClearClick}
            onRegister={handleBtnClick}
            clickBtnText="Sign In"
            disableProp={enableRegister}
          />
          <Grid container justifyContent="flex-start">
            <Grid item>
              <Link to={ROUTES.LOGIN}>
                <Typography variant="body2">
                  Alredy have an account ? Sign In
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;
/* <Button
            disabled={enableRegister}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleBtnClick}
          >
            Sign Up
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClearClick}
            startIcon={<ClearIcon />}
          >
            Clear
          </Button> */
