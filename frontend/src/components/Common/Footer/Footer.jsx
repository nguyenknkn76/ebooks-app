import React from "react";
import { FaDiscord, FaTwitter, FaReddit, FaGithub } from "react-icons/fa";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-icons">
        <FaDiscord className="footer-icon" />
        <FaTwitter className="footer-icon" />
        <FaReddit className="footer-icon" />
        <FaGithub className="footer-icon" />
      </div>

      <div className="footer-copyright">
        © Copyright ଘ(੭ˊᵕˋ)੭ ੈ♡‧₊˚
      </div>
    </div>
  );
};

export default Footer;
