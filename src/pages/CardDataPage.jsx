import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import atom from "../logo.svg";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";

const CardPage = () => {
  const navigate = useNavigate();
  const [bizNumberState, setBizNumberState] = useState(null);
  const { id } = useParams();
  const [cardState, setCardState] = useState(null);
  const { payload } = useSelector((bigSlice) => bigSlice.authSlice);
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get(`/cards/card/${id}`);
        const cardData = response.data;

        const newCardState = {
          ...cardData,
        };

        if (cardData.image && cardData.image.url) {
          newCardState.url = cardData.image.url;
        } else {
          newCardState.url = "";
        }

        if (cardData.image && cardData.image.alt) {
          newCardState.alt = cardData.image.alt;
        } else {
          newCardState.alt = "";
        }

        delete newCardState.image;
        delete newCardState.__v;
        delete newCardState._id;
        delete newCardState.user_id;

        if (!newCardState.zipCode || newCardState.zipCode <= 1) {
          delete newCardState.zipCode;
        }

        !newCardState.web && delete newCardState.web;
        !newCardState.state && delete newCardState.state;

        newCardState.createdAt = new Date(
          newCardState.createdAt
        ).toLocaleDateString("hi");

        setCardState(newCardState);
        setBizNumberState(newCardState.bizNumber);
      } catch (error) {
        toast.error("Failed to fetch card data");
      }
    };

    fetchCardData();
  }, [id]);

  const handleCancelBtnClick = () => {
    navigate("/");
  };

  const handleAlertOpen = (message) => {
    const result = window.confirm(message);
    updateBizNumber(result);
  };

  const updateBizNumber = async (result) => {
    if (!result) {
      return;
    }
    try {
      await axios.patch(`/cards/bizNumber/${id}`);
      // Fetch the updated card data
      const { data } = await axios.get(`/cards/card/${id}`);
      setBizNumberState(data.bizNumber);
      // Update the bizNumber and other relevant fields in the state
      toast.success("Business number updated successfully");
    } catch (error) {
      toast.error("Failed to update business number");
    }
  };
  if (!cardState) {
    return <CircularProgress />;
  }
  const cardKeys = Object.keys(cardState);
  return (
    <Container component="main" maxWidth="xl">
      <br />
      <Grid container>
        <Grid item sm={3}>
          <Button variant="outlined" onClick={handleCancelBtnClick}>
            <FirstPageIcon />
            Back to Home
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 600, md: 600 },
            maxWidth: { xs: 600, md: 600 },
          }}
          alt={cardState.alt ? cardState.alt : ""}
          src={cardState.url ? cardState.url : atom}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
        }}
      >
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {cardKeys.map((propOfCard) =>
              propOfCard !== "url" && propOfCard !== "alt" ? (
                <Grid key={propOfCard} item sx={{ maxWidth: "15rem" }} xs={12}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "primary" }}
                  >
                    <Button color="info" variant="outlined" disabled>
                      {propOfCard}
                    </Button>{" "}
                    {propOfCard === "bizNumber" ? (
                      <Fragment>
                        {bizNumberState ? bizNumberState : cardState.bizNumber}
                        {payload && payload.isAdmin ? (
                          <Button
                            variant="outlined"
                            onClick={() =>
                              handleAlertOpen(
                                "Are you sure you want to change the card business number?"
                              )
                            }
                            style={{ marginLeft: 10 }}
                          >
                            Change Biz Number
                          </Button>
                        ) : (
                          ""
                        )}
                      </Fragment>
                    ) : propOfCard === "web" ? (
                      <Link
                        href={cardState.web}
                        underline="hover"
                        target="_blank"
                      >
                        {cardState.web}
                      </Link>
                    ) : propOfCard === "likes" ? (
                      <Fragment>
                        {cardState.likes.length}
                        <FavoriteBorderIcon sx={{ ml: 1 }} color="error" />
                      </Fragment>
                    ) : (
                      cardState[propOfCard]
                    )}
                  </Typography>
                </Grid>
              ) : (
                ""
              )
            )}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default CardPage;
