import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { Box } from "@mui/material";
import myImage from "../../src/assets/imgs/card.jpg";
const AboutPage = () => {
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" color="primary">
        About Us Page
      </Typography>
      <Divider></Divider>
      <br />
      <p>
        Welcome to our business card publishing website! Our website is
        dedicated to helping businesses of all sizes and industries create
        professional and eye-catching business cards. We understand the
        importance of having a business card that stands out and makes a lasting
        impression on potential clients, customers, and partners. That's why we
        offer a variety of design templates and customization options to ensure
        that your business card reflects your unique brand identity. At our
        website, we believe that high-quality business cards don't have to come
        with a high price tag. Our affordable pricing options make it easy for
        businesses on any budget to create professional-grade business cards
        that will help elevate their brand and make a lasting impression.
        Whether you're a small business owner, a startup, or a large
        corporation, we're here to help you create the perfect business card for
        your needs. Our team of designers and customer service representatives
        are always available to answer any questions and provide support
        throughout the design process. Thank you for choosing our website for
        your business card publishing needs. We look forward to helping you
        create a standout business card that will help take your business to the
        next level.
      </p>
      <img src={myImage} alt="example card" />
    </Box>
  );
};

export default AboutPage;
