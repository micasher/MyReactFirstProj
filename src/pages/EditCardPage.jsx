import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import validateEditSchema, {
  validateEditCardParamsSchema,
} from "../validation/editValidation";
import { CircularProgress } from "@mui/material";
import atom from "../logo.svg";
import { toast } from "react-toastify";
import EditCardPageFieldComponent from "../components/EditCardPageComponent";
import FormButtonsComponent from "../components/FormButtonsComponent";
const EditCardPage = () => {
  const { id } = useParams();
  const [inputState, setInputState] = useState(null);
  const [disableEd, setDisableEdit] = useState(false);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const navigate = useNavigate();
  const arrOfInputs = [
    { inputName: "Title", idAndKey: "title", isReq: true },
    { inputName: "Sub Title", idAndKey: "subTitle", isReq: true },
    { inputName: "Description", idAndKey: "description", isReq: true },
    { inputName: "State", idAndKey: "state", isReq: false },
    { inputName: "Country", idAndKey: "country", isReq: true },
    { inputName: "City", idAndKey: "city", isReq: true },
    { inputName: "Street", idAndKey: "street", isReq: true },
    { inputName: "House Number", idAndKey: "houseNumber", isReq: true },
    { inputName: "ZIP Code", idAndKey: "zipCode", isReq: false },
    { inputName: "Phone", idAndKey: "phone", isReq: true },
    { inputName: "Email", idAndKey: "email", isReq: true },
    { inputName: "Web Page URL", idAndKey: "web", isReq: false },
    { inputName: "Image URL", idAndKey: "url", isReq: false },
    { inputName: "Image Alt", idAndKey: "alt", isReq: false },
  ];
  useEffect(() => {
    (async () => {
      try {
        const errors = validateEditCardParamsSchema({ id });
        if (errors) {
          // there was errors = incorrect id
          navigate("/");
          return;
        }
        const { data } = await axios.get("/cards/card/" + id);
        let newInputState = {
          ...data,
        };
        if (data.image && data.image.url) {
          newInputState.url = data.image.url;
        } else {
          newInputState.url = "";
        }
        if (data.image && data.image.alt) {
          newInputState.alt = data.image.alt;
        } else {
          newInputState.alt = "";
        }
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.createdAt;
        delete newInputState.__v;
        setInputState(newInputState);
        if (!validateEditSchema(newInputState)) {
          setDisableEdit(false);
        }
      } catch (err) {
        console.log("error from axios", err);
      }
    })();
  }, [id]);
  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (!joiResponse) {
        //move to homepage
        await axios.put("/cards/" + id, inputState);
        navigate(ROUTES.HOME);
      }
    } catch (err) {
      console.log("err", err.response.data);
      toast.error("error");
    }
  };
  const handleClearClick = () => {
    const cloneInputState = JSON.parse(JSON.stringify(inputState));
    const inputKeys = Object.keys(cloneInputState);
    for (const key of inputKeys) {
      if (typeof cloneInputState[key] === "string") {
        cloneInputState[key] = "";
      }
    }
    setInputsErrorsState(null);
    setInputState(cloneInputState);
  };
  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateEditSchema(newInputState);
    if (!joiResponse) {
      setInputsErrorsState(joiResponse);
      setDisableEdit(false);
      return;
    }
    setDisableEdit(true);
    const inputKeys = Object.keys(inputState);
    for (const key of inputKeys) {
      if (inputState && !inputState[key] && key != ev.target.id) {
        if (joiResponse[key]) {
          joiResponse[key] = "";
        }
      }
    }
    setInputsErrorsState(joiResponse);
  };

  if (!inputState) {
    return <CircularProgress />;
  }
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
          <EditIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Edit card
        </Typography>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={inputState.url ? inputState.url : atom}
        />
        <br></br>
        <Grid container spacing={2}>
          {arrOfInputs.map((input) => (
            <Grid item xs={12} sm={6} key={input.inputName}>
              <EditCardPageFieldComponent
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
        </Grid>
        <FormButtonsComponent
          onCancel={handleCancelBtnClick}
          onReset={handleClearClick}
          onRegister={handleSaveBtnClick}
          clickBtnText="Save"
          disableProp={disableEd}
        />
      </Box>
    </Container>
  );
};
export default EditCardPage;

/* <Button
            disabled={disableEd}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSaveBtnClick}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleCancelBtnClick}
          >
            Cancel
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            startIcon={<ClearIcon />}
            onClick={handleClearClick}
          >
            Clear
          </Button> */
