import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "../Common/SearchBar";
import Links from "./Links";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
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
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const nav = useNavigate();
  const navItems = [
    { name: "Home", path: "" },
    { name: "Shop", path: "products" },
    {
      name: "Deals",
      path: "deals",
      dd_menu: false,
      dd_links: [
        { name: "New Arrivals", path: "deals/new-arrivals" },
        { name: "Best Sellers", path: "deals/best-sellers" },
      ],
    },
    {
      name: "Bundles",
      path: "bundles",
    },
    {
      name: "Blog",
      path: "blogs",
    },
    { name: "Contact", path: "contact" },
    {
      name: "About",
      path: "about",
    },
  ];
  const [sidebarMenu, setSidebarMenu] = useState(false);
  const hideSideBarMenu = () => {
    setSidebarMenu(false);
  };
  return (
    <div className="navbar-container">
      <nav className="navbar">
        {/* navbar left */}
        <div className="nav-left">
          <Link to="/">
            <h1>CandyCorp</h1>
          </Link>
          {/* Nav  Items */}
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                <Links
                  name={item.name}
                  path={item.path}
                  dd_menu={item.dd_menu}
                  dd_links={item.dd_links}
                />
              </li>
            ))}
          </ul>
        </div>
        {/* Navbar Center  */}
        <div className="nav-center">
          <SearchBar />
        </div>
        {/* Navbar Right */}
        <div className="nav-right">
          <ul>
            <li>
              <NavLink>
                <AiOutlineHeart />
              </NavLink>
            </li>
            <li>
              <NavLink to="cart" className="navbar-cart-icon">
                <AiOutlineShoppingCart />
                <span className="cart-quantity-counter">
                  {/* Cart Counter goes here */}
                  {user ? user.shoppingCart.length : 0}
                </span>
              </NavLink>
            </li>
            <li className="nav-user-icon">
              <NavLink>
                {user ? (
                  <img src={user.image} alt={user.username} />
                ) : (
                  <CgProfile />
                )}

                <div className="dropdown-wrapper show-profile-menu ">
                  <div className="dropdown">
                    <ul className="dropdown-content">
                      {user && (
                        <>
                          <li>
                            <Link to="account">My Account</Link>
                          </li>
                          <li>Orders</li>
                        </>
                      )}
                    </ul>
                    {user ? (
                      <button
                        className="btn-box-outline"
                        onClick={() => {
                          logout();
                        }}
                      >
                        Logout
                      </button>
                    ) : (
                      <button
                        className="btn-box-primary"
                        onClick={() => {
                          nav("/login");
                        }}
                      >
                        Sign in
                      </button>
                    )}
                  </div>
                </div>
              </NavLink>
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
          <button
            className="nav-top-close-btn"
            onClick={() => setSidebarMenu(false)}
          >
            <AiOutlineClose />
          </button>
          <Link to="">
            <h1>CandyCorp</h1>
          </Link>

          <ul>
            <li className="nav-user-icon">
              <NavLink to="account" onClick={hideSideBarMenu}>
                {user ? (
                  <img src={user.image} alt={user.username} />
                ) : (
                  <CgProfile />
                )}
              </NavLink>
            </li>
            <li>
              <NavLink>
                <AiOutlineHeart />
              </NavLink>
            </li>
            <li>
              <NavLink
                to="cart"
                onClick={hideSideBarMenu}
                className="navbar-cart-icon-resp"
              >
                <AiOutlineShoppingCart />
                <span className="cart-quantity-counter-resp">
                  {user ? user.shoppingCart.length : 0}
                </span>
              </NavLink>
            </li>
          </ul>
          {user ? (
            <button
              className="btn-box-outline"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="btn-box-primary"
              onClick={() => {
                nav("/login");
              }}
            >
              Sign in
            </button>
          )}
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
                  dd_menu={item.dd_menu}
                  dd_links={item.dd_links}
                  sidebarMenu={true}
                  className={`${item.dd_menu ? "sidebar-dropdown" : ""}`}
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
