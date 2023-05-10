import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import ROUTES from "../routes/ROUTES";
import validateLoginSchema from "../validation/loginValidation";
import useLoggedIn from "../hooks/useLoggedIn";
import { ButtonGroup } from "@mui/material";
import { toast } from "react-toastify";

const MAX_LOGIN_ATTEMPTS = 3;
const failedAttempts = 0;
const LOCKOUT_PERIOD = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

let lockedOutEmails = [];
let failedAttemptsTest = 0;
let userEmail = localStorage.getItem('userEmail');

const LoginPage = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });

  const [inputsErrorsState, setInputsErrorsState] = useState(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();

  const handleBtnClick = async (ev) => {
    const lastAttempt = localStorage.getItem("lastLoginAttempt");
    const failedAttempts = localStorage.getItem("failedLoginAttempts") || 0;

    // check if email is locked
    if (lockedOutEmails.includes(email)) {
      toast.error("This email has been locked out. Please try again later.");
      return;
    }

    // Check if the user is currently locked out
    const lockoutData = JSON.parse(
      localStorage.getItem("loginLockout") || "{}"
    );
    const lastFailedAttempt = lockoutData.lastFailedAttempt || 0;
    if (
      failedAttempts >= MAX_LOGIN_ATTEMPTS &&
      Date.now() - lastFailedAttempt < LOCKOUT_PERIOD
    ) {
      toast.error("Error: You are locked out. Please try again later.");
      return;
    }

    // if (failedAttempts >= 3) {
    //   toast.error("error: try more 24 hours login again");
    //   return;
    // }

    try {
      const joiResponse = validateLoginSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }



      if (failedAttempts >= 3) {
        lockedOutEmails.push(userEmail);
        toast.error("Error: Maximum login attempts reached. This email has been locked out for 24 hours.");
        setTimeout(() => {
          const index = lockedOutEmails.indexOf(userEmail);
          if (index > -1) {
            lockedOutEmails.splice(index, 1);
          }
        }, 86400000); // 24 hours in milliseconds
      }
      else{

      }

      const { data } = await axios.post("/users/login", inputState);

      localStorage.removeItem("failedLoginAttempts");
      localStorage.removeItem("lastLoginAttempt");
      localStorage.setItem("token", data.token);

      setFailedAttempts(0);

      localStorage.setItem("token", data.token);
      loggedIn();

      navigate(ROUTES.HOME);
    } catch (err) {
      localStorage.setItem("failedLoginAttempts", failedAttempts++);
      localStorage.setItem("lastLoginAttempt", Date.now());
      localStorage.setItem('userEmail', userEmail);
      toast.error("error, not a registered user");

      setFailedAttempts(failedAttempts + 1);

      localStorage.setItem(
        "loginLockout",
        JSON.stringify({
          lastFailedAttempt: Date.now(),
        })
      );
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
  };
  const handleClearClick = () => {
    setInputState({
      email: "",
      password: "",
    });
    setInputsErrorsState(null);
  };
  return (
    <Container component="main" maxWidth="xs">
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
          Sign in
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={inputState.email}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.email && (
                <Alert severity="warning">
                  {inputsErrorsState.email.map((item) => (
                    <div key={"email-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={inputState.password}
                onChange={handleInputChange}
              />
              {inputsErrorsState && inputsErrorsState.password && (
                <Alert severity="warning">
                  {inputsErrorsState.password.map((item) => (
                    <div key={"password-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
          </Grid>
          <ButtonGroup>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleBtnClick}
            >
              Sign In
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClearClick}
              startIcon={<ClearIcon />}
            >
              Clear
            </Button>
          </ButtonGroup>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTES.REGISTER}>
                <Typography variant="body2">
                  Did not have an account? Sign up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;