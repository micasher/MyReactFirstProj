import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { Divider, Container, Button } from "@mui/material";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardComponent from "../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const MyCardsPage = () => {
  const navigate = useNavigate();
  const [cardsArr, setCardsArr] = useState(null);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const userId = payload._id;
  useEffect(() => {
    axios
      .get("/cards/my-cards")
      .then(({ data }) => {
        setCardsArr(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };
  const handleCreateBtn = () => {
    navigate(ROUTES.CREATE);
  };
  const handleImageToShowData = (id) => {
    navigate(`/cardData/${id}`);
  };
  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id != id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };

  const addRemoveToLikesArray = async (id) => {
    try {
      let { data } = await axios.patch("/cards/card-like/" + id);
      const newCardsArr = JSON.parse(JSON.stringify(cardsArr));
      newCardsArr.map((card) => {
        if (card._id == data._id) {
          card.likes = [...data.likes];
        }
      });
      setCardsArr(newCardsArr);
    } catch (err) {
      let error = err.response.data;
      error.startsWith("card validation failed:") &&
        toast.error(
          "invalid card, cannot be added until some details are filled! sorry for the inconvenience"
        );
    }
  };

  if (!cardsArr) {
    return <CircularProgress />;
  }
  if (cardsArr.length == 0) {
    return (
      <Container>
        <h1>No Cards Available!</h1>
        <h2>Click the button below to create your first card!</h2>
        <Button
          variant="outlined"
          onClick={handleCreateBtn}
          endIcon={<AddCircleOutlineIcon />}
        >
          Create
        </Button>
      </Container>
    );
  }
  return (
    <Box>
      <Typography variant="h2" color="primary">
        My-Card Page
      </Typography>
      <Typography variant="h6" color="primary">
        Here you can find all your business cards
      </Typography>
      <Divider></Divider>
      <br />
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={4} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              phone={item.phone}
              cardNumber={item.bizNumber}
              address={item.address}
              img={item.image ? item.image.url : ""}
              onLike={addRemoveToLikesArray}
              canLike={payload}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              canEdit={payload && payload.biz && payload._id === item.user_id}
              onClickImage={handleImageToShowData}
              canDelete={
                (payload && payload.isAdmin) ||
                (payload && payload.biz && payload._id === item.user_id)
              }
              isLike={payload && item.likes.includes(payload._id)}
            />
          </Grid>
        ))}
        <Grid>
          <Button
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              "@media (max-width: 600px)": {
                bottom: "10px",
                right: "10px",
              },
            }}
            variant="outlined"
            onClick={handleCreateBtn}
            endIcon={<AddCircleOutlineIcon />}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyCardsPage;
