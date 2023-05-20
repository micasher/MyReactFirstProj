import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import atom from "../logo.svg";
import { toast } from "react-toastify";
import Avatar from "@mui/material/Avatar";
import validateCreateSchema from "../validation/createCardValidation";
import EditCardPageFieldComponent from "../components/EditCardPageComponent";
import FormButtonsComponent from "../components/FormButtonsComponent";

const CardCreationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [enableEdit, setenableEdit] = useState(true);
  const [inputsErrorsState, setInputsErrorsState] = useState({});
  const [inputState, setInputState] = useState({
    url: "",
    title: "",
    subTitle: "",
    description: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    email: "",
    phone: "",
    state: "",
    zipCode: "",
    web: "",
    alt: "",
  });
  const arrOfInputs = [
    { inputName: "Image URL", idAndKey: "url", isReq: false },
    { inputName: "Title", idAndKey: "title", isReq: true },
    { inputName: "Sub Title", idAndKey: "subTitle", isReq: true },
    { inputName: "Description", idAndKey: "description", isReq: true },
    { inputName: "Country", idAndKey: "country", isReq: true },
    { inputName: "City", idAndKey: "city", isReq: true },
    { inputName: "Street", idAndKey: "street", isReq: true },
    { inputName: "House Number", idAndKey: "houseNumber", isReq: true },
    { inputName: "Email", idAndKey: "email", isReq: true },
    { inputName: "Phone", idAndKey: "phone", isReq: true },
    { inputName: "State", idAndKey: "state", isReq: false },
    { inputName: "ZIP Code", idAndKey: "zipCode", isReq: false },
    { inputName: "Web Page URL", idAndKey: "web", isReq: false },
    { inputName: "Image Alt", idAndKey: "alt", isReq: false },
  ];
  const handleSaveBtnClick = async (event) => {
    try {
      const joiResponse = validateCreateSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (!joiResponse) {
        await axios.post("/cards/", inputState);

        navigate(ROUTES.HOME);
        toast.success("Card created successfully!");
      }
    } catch (error) {
      toast.error("Failed to create card. Please try again later.");
    }
  };

  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateCreateSchema(newInputState);
    if (!joiResponse) {
      setInputsErrorsState(joiResponse);
      setenableEdit(false);
      return;
    }
    const inputKeys = Object.keys(inputState);
    for (const key of inputKeys) {
      if (inputState && !inputState[key] && key !== ev.target.id) {
        joiResponse[key] = "";
      }
    }
    setInputsErrorsState(joiResponse);
    setenableEdit(true);
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
          Create Card Page
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
          disableProp={enableEdit}
        />
      </Box>
    </Container>
  );
};
export default CardCreationForm;
/* <Button
            disabled={enableEdit}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSaveBtnClick}
          >
            Save
          </Button>
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleCancleBtnClick}
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
