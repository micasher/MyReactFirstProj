import { Fragment, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import ROUTES from "../routes/ROUTES";
import { Button, CircularProgress, Divider, Typography } from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import { toast } from "react-toastify";
const ProfileDataPage = () => {
  const { id } = useParams();
  const [isBizState, setIsBiz] = useState(false);
  const [profileState, setProfileState] = useState(null);
  const [usersArr, setUsersArr] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/users/getAllUsers")
      .then(({ data: { users } }) => {
        let currentProfile = { ...users.find((user) => user._id == id) };
        setUsersArr(users);
        delete currentProfile._id;
        delete currentProfile.__v;
        currentProfile.createdAt = new Date(
          currentProfile.createdAt
        ).toLocaleDateString("hi");
        if (!currentProfile.imageUrl) {
          currentProfile.imageUrl =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        }
        if (!currentProfile.imageAlt) {
          currentProfile.imageAlt =
            "This is the profile picture of " + currentProfile.firstName;
        }
        if (!currentProfile.state) {
          delete currentProfile.state;
        }
        if (!currentProfile.middleName) {
          delete currentProfile.middleName;
        }

        if (!currentProfile.zipCode || currentProfile.zipCode <= 1) {
          delete currentProfile.zipCode;
        }
        setIsBiz(currentProfile.biz);
        setProfileState(currentProfile);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      })
      .catch((err) => {
        toast.error("ERR", err.response.data);
      });
  }, [id]);
  const handleTopClick = (ev) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  const handleBizChange = async (ev) => {
    try {
      let newUsersArr = JSON.parse(JSON.stringify(usersArr));
      let currentUser = newUsersArr.find((user) => user._id == id);
      await axios.put("/users/userInfo/" + currentUser._id, {
        firstName: currentUser.firstName,
        middleName: currentUser.middleName,
        lastName: currentUser.lastName,
        phone: currentUser.phone,
        email: currentUser.email,
        imageUrl: currentUser.imageUrl,
        imageAlt: currentUser.imageAlt,
        state: currentUser.state,
        country: currentUser.country,
        city: currentUser.city,
        street: currentUser.street,
        houseNumber: currentUser.houseNumber,
        zipCode: currentUser.zipCode,
        biz: !currentUser.biz,
      });
      currentUser.biz = !currentUser.biz;
      newUsersArr.map((user) => {
        if (user._id == currentUser._id) {
          user = { ...currentUser };
        }
      });
      setIsBiz(currentUser.biz);
    } catch (err) {
      // toast.error("ERR" + err);
      console.log("ERR", err);
    }
  };
  const handleBackToCRMClick = () => {
    navigate(ROUTES.CRM);
  };
  if (!profileState) {
    return <CircularProgress />;
  }
  let profileKeys = Object.keys(profileState);
  return (
    <Container
      // style={{ backgroundColor: "#000044" }}
      component="main"
      maxWidth="lg"
    >
      <Button onClick={handleBackToCRMClick} color="error" variant="contained">
        <KeyboardReturnIcon />
      </Button>
      <h1 style={{ margin: -3 }}>Profile Details:</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <img
            src={profileState.imageUrl}
            alt={profileState.imageAlt}
            style={{ maxWidth: "150px", maxHeight: "150px" }}
          />
          <br />
          <Grid container spacing={2}>
            {profileKeys.map((key) => (
              <Grid item xl={6} sm={12} key={key}>
                {key == "imageUrl" || key == "imageAlt" ? (
                  ""
                ) : (
                  <Fragment>
                    <Typography
                      // style={{ backgroundColor: "#00002b" }}
                      component="h5"
                      variant="h5"
                    >
                      {key == "isAdmin" || key == "biz"
                        ? profileState[key]
                          ? `${key}: yes`
                          : `${key}: not`
                        : ` ${key}: ${profileState[key]}`}
                    </Typography>
                    <Divider />
                  </Fragment>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default ProfileDataPage;
