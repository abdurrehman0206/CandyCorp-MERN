import React from "react";
import Input from "../../components/Common/Input";
import { CgFacebook } from "react-icons/cg";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import Logo from "../../assets/Logo.png";
const ContactUs = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <div className="contact-img-section">
          <img src={Logo} alt="Company Logo" />
        </div>

        <div className="contact-form-container">
          <h2>CONTACT US</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input type="text" placeholder="Name" />
            <Input type="email" placeholder="Email" />
            <textarea
              
              placeholder="Message..."
              className="contact-message-area"
            />
            <button className="btn-box-primary">Submit →</button>
          </form>

          <div className="social-icons">
            <i>
              <CgFacebook />
            </i>
            <i>
              <AiOutlineTwitter />
            </i>
            <i>
              <AiFillInstagram />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
