import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CallIcon from "@mui/icons-material/Call";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import PropTypes from "prop-types";
import atom from "../logo.svg";
const CardComponent = ({
  img,
  title,
  subTitle,
  id,
  onDelete,
  onEdit,
  canEdit,
  canLike,
  address,
  phone,
  cardNumber,
  onLike,
  onClickImage,
  canDelete,
  isLike,
  isTheUsersCard,
}) => {
  const handleDeleteBtnClick = () => {
    onDelete(id);
  };
  const handleEditBtnClick = () => {
    onEdit(id);
  };
  const handleLikeBtnClick = () => {
    onLike(id);
  };
  const handleImageBtnClick = () => {
    onClickImage(id);
  };
  return (
    <Card square raised>
      <CardActionArea>
        <CardMedia
          onClick={handleImageBtnClick}
          component="img"
          image={img ? img : atom}
        />
      </CardActionArea>
      {isTheUsersCard ? (
        <Typography component="h4" variant="h6" color="gold">
          Your Card &#127775;
        </Typography>
      ) : (
        <Typography component="h4" variant="h6">
          {" "}
          &#8192;
        </Typography>
      )}
      <CardHeader title={title} subheader={subTitle}></CardHeader>
      <CardContent>
        <Typography>Adress: {address}</Typography>
        <Typography>Phone: {phone}</Typography>
        <Typography>Card Number: {cardNumber}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="text" color="primary">
          <CallIcon />
        </Button>

        {canLike ? (
          isLike ? (
            <Button>
              <FavoriteIcon color="primary" onClick={handleLikeBtnClick} />
            </Button>
          ) : (
            <Button>
              <FavoriteBorderIcon
                color="primary"
                onClick={handleLikeBtnClick}
              />
            </Button>
          )
        ) : (
          ""
        )}
        {canEdit ? (
          <Button variant="text" color="warning" onClick={handleEditBtnClick}>
            Edit
          </Button>
        ) : (
          ""
        )}
        {canDelete ? (
          <Button variant="text" color="error" onClick={handleDeleteBtnClick}>
            <DeleteIcon />
          </Button>
        ) : (
          ""
        )}
      </CardActions>
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  description: PropTypes.string,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  canEdit: PropTypes.bool,
};
CardComponent.defaultProps = {
  img: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K",
  subTitle: "",
  canEdit: false,
  canDelete: false,
  canLike: false,
  isTheUsersCard: false,
};

export default CardComponent;
