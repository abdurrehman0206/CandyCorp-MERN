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
  const navItems = [
    { name: "Home", path: "" },
    { name: "Shop", path: "shop" },
    { name: "deals", path: "deals" },
    { name: "Bundles", path: "bundles" },
    { name: "Blog", path: "blog" },
    { name: "Contact", path: "contact" },
    { name: "About", path: "about" },
  ];
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
          {/* Nav  Items */}
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Links name={item.name} path={item.path} />
              </li>
            ))}
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
          {/* Nav  Items */}
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Links
                  name={item.name}
                  path={item.path}
                  hideSideBarMenu={hideSideBarMenu}
                />
              </li>
            ))}
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
