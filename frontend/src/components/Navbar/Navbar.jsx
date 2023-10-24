import { useState } from "react";
import SearchBar from "../Common/SearchBar";
import Links from "./Links";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { CgProfile, CgFacebook } from "react-icons/cg";
import { Link } from "react-router-dom";
function Navbar() {
  const [sidebarMenu, setSidebarMenu] = useState(false);
  const hideSideBarMenu = () => {
    setSidebarMenu(false);
  };
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/">
            <h1>CandyCorp</h1>
          </Link>
          <ul>
            <li>
              <Links name="Home" path="" />
            </li>
            <li>
              <Links name="Shop" path="shop" />
            </li>
            <li>
              <Links name="Deals" path="deals" />
            </li>
            <li>
              <Links name="Bundles" path="bundles" />
            </li>

            <li>
              <Links name="Blog" path="blog" />
            </li>

            <li>
              <Links name="Contact" path="contact" />
            </li>
            <li>
              <Links name="About" path="/about" />
            </li>
          </ul>
        </div>
        <div className="nav-center">
          <SearchBar />
        </div>
        <div className="nav-right">
          <ul>
            <li>
              <AiOutlineHeart />
            </li>
            <li>
              <AiOutlineShoppingCart />
            </li>
            <li>
              <CgProfile />
            </li>
          </ul>
          <span className="hamburger">
            <button onClick={() => setSidebarMenu(true)}>
              <AiOutlineMenu />
            </button>
          </span>
        </div>
      </nav>
      {/* Mobile Responsive Navbar */}

      <nav className={`nav-responsive  ${sidebarMenu ? "show-nav" : ""}`}>
        <div className="nav-top">
          <button onClick={() => setSidebarMenu(false)}>
            <AiOutlineClose />
          </button>
          <Link to="">
            <h1>CandyCorp</h1>
          </Link>
          <ul>
            <li>
              <CgProfile />
            </li>
            <li>
              <AiOutlineHeart />
            </li>
            <li>
              <AiOutlineShoppingCart />
            </li>
          </ul>
        </div>
        <div className="nav-bottom">
          <ul>
            <li>
              <Links name="Home" path="" hideSideBarMenu={hideSideBarMenu} />
            </li>
            <li>
              <Links
                name="Shop"
                path="shop"
                hideSideBarMenu={hideSideBarMenu}
              />
            </li>
            <li>
              <Links
                name="Deals"
                path="deals"
                hideSideBarMenu={hideSideBarMenu}
              />
            </li>
            <li>
              <Links
                name="Bundles"
                path="bundles"
                hideSideBarMenu={hideSideBarMenu}
              />
            </li>

            <li>
              <Links
                name="Blog"
                path="blog"
                hideSideBarMenu={hideSideBarMenu}
              />
            </li>

            <li>
              <Links
                name="Contact"
                path="contact"
                hideSideBarMenu={hideSideBarMenu}
              />
            </li>
            <li>
              <Links
                name="About"
                path="about"
                hideSideBarMenu={hideSideBarMenu}
              />
            </li>
          </ul>
        </div>
        <div className="nav-footer-container">
          <div className="nav-footer">
            <i>
              <CgFacebook />
            </i>
            <i>
              <AiOutlineTwitter />
            </i>
            <i>
              {" "}
              <AiFillInstagram />
            </i>
          </div>
          <p className="nav-cpy">&copy; 2023 CandyCorp</p>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
