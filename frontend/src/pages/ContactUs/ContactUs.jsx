import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Input from "../../components/Common/Input";
import { CgFacebook } from "react-icons/cg";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import Logo from "../../assets/Logo.png";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.name]: e.target.value });
  };
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      alert("email successfully sent check inbox");
    } catch (error) {
      console.log(error);
    } finally {
      form.current.reset();
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };
  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <div className="contact-img-section">
          <img src={Logo} alt="Company Logo" />
        </div>

        <div className="contact-form-container">
          <h2>CONTACT US</h2>
          <form ref={form} onSubmit={sendEmail}>
            <Input
              type="text"
              placeholder="Name"
              name="user_name"
              onChange={handleChange}
            />
            <Input
              type="email"
              placeholder="Email"
              name="user_email"
              onChange={handleChange}
            />
            <textarea
              placeholder="Message..."
              className="contact-message-area"
              name="message"
              onChange={handleChange}
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
