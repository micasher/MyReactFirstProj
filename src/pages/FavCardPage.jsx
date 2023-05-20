import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";
import { Divider } from "@mui/material";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FabCardPage = () => {
  const navigate = useNavigate();
  const [cardsArr, setCardsArr] = useState(null);
  const [likedCardsArrState, setLikedCardsArrState] = useState(null);
  const [originalLikedCardsArrState, setOriginalLikedCardsArrState] =
    useState(null);
  const { payload } = useSelector((bigPie) => bigPie.authSlice);
  const { _id } = payload;
  useEffect(() => {
    axios
      .get("/cards/get-my-fav-cards")
      .then(({ data }) => {
        setOriginalLikedCardsArrState(data);
        setLikedCardsArrState(data);
      })
      .catch((err) => {
        console.log("ERR" + err.response.data);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/cards/get-my-fav-cards")
      .then(({ data }) => {
        setLikedCardsArrState(data);
      })
      .catch((err) => {
        console.log("ERR" + err.response.data);
      });
  }, [originalLikedCardsArrState]);
  const handleImageToShowData = (id) => {
    navigate(`/cardData/${id}`);
  };
  const addRemoveToLikesArray = async (id) => {
    try {
      let { data } = await axios.patch("/cards/card-like/" + id);
      const newCardsArr = JSON.parse(JSON.stringify(likedCardsArrState));
      newCardsArr.map((card) => {
        if (card._id === data._id) {
          card.likes = [...data.likes];
        }
      });
      setLikedCardsArrState(newCardsArr);
      setOriginalLikedCardsArrState(newCardsArr);
    } catch (err) {
      let error = err.response.data;
      error.startsWith("card validation failed:") &&
        toast.error(
          "invalid card, cannot be added until some details are filled! sorry for the inconvenience"
        );
    }
  };
  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
  };
  const handleDeleteFromInitialCardsArr = async (id) => {
    try {
      await axios.delete("/cards/" + id); // /cards/:id
      setCardsArr((newCardsArr) =>
        newCardsArr.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.log("error when deleting", err.response.data);
    }
  };

  if (!likedCardsArrState) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Typography variant="h2" color="primary">
        Favorite Card Page
      </Typography>
      <Typography variant="h6" color="primary">
        Here you cand find all your favorite business cards
      </Typography>
      <Divider></Divider>
      <br />
      <Grid container spacing={2}>
        {likedCardsArrState.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              phone={item.phone}
              cardNumber={item.bizNumber}
              address={item.address}
              img={item.image ? item.image.url : ""}
              canLike={payload}
              isLike={payload && item.likes.includes(payload._id)}
              onLike={addRemoveToLikesArray}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              canEdit={payload && payload.biz && payload._id === item.user_id}
              onClickImage={handleImageToShowData}
              canDelete={
                (payload && payload.isAdmin) ||
                (payload && payload.biz && payload._id === item.user_id)
              }
              isTheUsersCard={payload && payload._id === item.user_id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FabCardPage;
