import React from "react";
import { AiOutlineTwitter, AiFillInstagram } from "react-icons/ai";
import { CgFacebook } from "react-icons/cg";
import { Link } from "react-router-dom";
function Footer() {
  const footerItems = [
    {
      title: "Navigations",
      links: [
        { name: "Home", path: "/" },
        { name: "Bundles", path: "/bundles" },
        { name: "Shop", path: "/shop" },
        { name: "About Us", path: "/about" },
      ],
    },
    {
      title: "Customer Services",
      links: [{ name: "Contact Us", path: "/contact" }],
    },
    {
      title: "My Account",
      links: [
        { name: "Sign in", path: "" },
        { name: "View Cart", path: "" },
        { name: "Help", path: "" },
      ],
    },
  ];

  return (
    <div className="footer-container">
      <footer className="footer">
        {/* Section 1  : Social Media */}
        <section className="footer-top-section">
          {/* Left */}
          <div>
            <span>Stay linked with us through our social media platforms.</span>
          </div>
          {/* Right */}
          <div className="top-section-right">
            <a href="">
              <CgFacebook />
            </a>
            <a href="">
              <AiOutlineTwitter />
            </a>
            <a href="">
              <AiFillInstagram />
            </a>
          </div>
        </section>

        {/*  Section 2 : Navigation*/}
        <section className="footer-bottom-section">
          <div className="footer-bottom-company-name">
            <h3>Candy Corp</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              voluptatem tempora eius adipisci ratione aspernatur sint
              repellendus quis itaque error.
            </p>
          </div>
          {footerItems.map((item) => {
            return (
              <div className="footer-columns">
                <h3>{item.title}</h3>
                <ul>
                  {item.links.map((link) => (
                    <li key={link.name}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>
      </footer>
    </div>
  );
}

export default Footer;
