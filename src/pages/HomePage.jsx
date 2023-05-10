import { Box, CircularProgress, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Divider } from "@mui/material";
import CardComponent from "../components/CardComponent";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        // setCardsArr(data);
        filterFunc(data);
      })
      .catch((err) => {
        console.log("err from axios", err);

        toast.error("Oops");
      });
  }, []);
  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      setOriginalCardsArr(data);
      setCardsArr(data.filter((card) => card.title.startsWith(filter)));
      return;
    }
    if (originalCardsArr) {
      let newOriginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        newOriginalCardsArr.filter(
          (card) =>
            card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
        )
      );
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

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
  const handleEditFromInitialCardsArr = (id) => {
    navigate(`/edit/${id}`); //localhost:3000/edit/123213
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

  const handleImageToShowData = (id) => {
    navigate(`/cardData/${id}`);
  };

  if (!cardsArr) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Typography variant="h2" color="primary" align="center">
        Let's explore
      </Typography>
      <Typography variant="h6" color="secondary">
        Here you cand find business cards from all categories
      </Typography>
      <br />
      <Divider></Divider>
      <br />
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              title={item.title}
              subTitle={item.subTitle}
              phone={item.phone}
              cardNumber={item.bizNumber}
              address={item.address}
              img={item.image ? item.image.url : ""}
              onDelete={handleDeleteFromInitialCardsArr}
              onEdit={handleEditFromInitialCardsArr}
              canEdit={payload && payload.biz && payload._id === item.user_id}
              canLike={payload}
              onLike={addRemoveToLikesArray}
              isLike={payload && item.likes.includes(payload._id)}
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
export default HomePage;
