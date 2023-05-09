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
import ROUTES from "../routes/ROUTES";
import { useNavigate, useParams } from "react-router-dom";
import { validateEditCardParamsSchema } from "../validation/editValidation";
import axios from "axios";
import { toast } from "react-toastify";
import atom from "../logo.svg";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const CardPage = () => {
  const { id } = useParams();
  const [cardState, setCardState] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const errors = validateEditCardParamsSchema({ id });
        if (errors) {
          navigate("/");
          return;
        }
        const { data } = await axios.get("/cards/card/" + id);
        let newcardState = {
          ...data,
        };
        if (data.image && data.image.url) {
          newcardState.url = data.image.url;
        } else {
          newcardState.url = "";
        }
        if (data.image && data.image.alt) {
          newcardState.alt = data.image.alt;
        } else {
          newcardState.alt = "";
        }
        delete newcardState.image;
        delete newcardState.__v;
        delete newcardState._id;
        delete newcardState.user_id;
        if (!newcardState.zipCode || newcardState.zipCode <= 1) {
          delete newcardState.zipCode;
        }
        !newcardState.web && delete newcardState.web;
        !newcardState.state && delete newcardState.state;
        newcardState.createdAt = new Date(
          newcardState.createdAt
        ).toLocaleDateString("hi");
        setCardState(newcardState);
      } catch (err) {
        toast.error(err);
      }
    })();
  }, [id]);

  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };

  if (!cardState) {
    return <CircularProgress />;
  }
  let cardKeys = Object.keys(cardState);
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
        <Typography align="center" component="h1" variant="h3">
          Card Page:
        </Typography>
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
                <Grid
                  key={propOfCard}
                  item
                  sx={{ maxWidth: "15rem" }}
                  xs={12}
                  // sm={12}
                  // md={6}
                  // xl={4}
                >
                  <Typography variant="h6" gutterBottom color="white">
                    <Button color="info" variant="outlined" disabled>
                      {propOfCard}
                    </Button>{" "}
                    {propOfCard == "web" ? (
                      <Link
                        href={cardState.web}
                        underline="hover"
                        target="_blank"
                      >
                        {cardState.web}
                      </Link>
                    ) : propOfCard == "likes" ? (
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
