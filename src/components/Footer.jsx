import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        padding: "20px",
        textAlign: "center",
      }}
    >
      <p>© {new Date().getFullYear()} Michael Shermak. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
