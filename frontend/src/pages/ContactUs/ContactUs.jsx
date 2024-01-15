import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Input from "../../components/Common/Input";
import { CgFacebook } from "react-icons/cg";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";
import Logo from "../../assets/Logo.png";
import { toast } from "react-toastify";
const ContactUs = () => {
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    const formControls = form.current.elements;

    for (let i = 0; i < formControls.length; i++) {
      const control = formControls[i];
      if (control.tagName === "INPUT") {
        if (control.value.trim() === "") {
          toast.error("Invalid inputs");
          return;
        }
      }
    }
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      toast.success("Successfully Sent");
    } catch (error) {
      console.log(error);
    } finally {
      form.current.reset();
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
            <Input type="text" placeholder="Name" name="user_name" />
            <Input type="email" placeholder="Email" name="user_email" />
            <textarea
              placeholder="Message..."
              className="contact-message-area"
              name="message"
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
