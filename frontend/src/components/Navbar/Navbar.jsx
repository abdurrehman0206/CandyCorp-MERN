import { useState } from "react";
import SearchBar from "../Common/SearchBar";
import Links from "./Links";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineTwitter,
  AiFillInstagram
} from "react-icons/ai";
import { CgProfile,CgFacebook } from "react-icons/cg";
function Navbar() {
  const [sidebarMenu, setSidebarMenu] = useState(false);
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="nav-left">
          <a href="#">
            <h1>CandyCorp</h1>
          </a>
          <ul>
            <li>
              <Links name="Home" />
            </li>
            <li>
              <Links name="Shop" />
            </li>
            <li>
              <Links name="Deals" />
            </li>
            <li>
              <Links name="Bundles" />
            </li>
            
            <li>
              <Links name="Blog" />
            </li>

            <li>
              <Links name="Contact" />
            </li>
            <li>
              <Links name="About" />
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
            <button  onClick={() => setSidebarMenu(true)}>
              <AiOutlineMenu />
            </button>
          </span>
        </div>
      </nav>
      {/* Mobile Responsive Navbar */}
      
      <nav
        className={`nav-responsive  ${sidebarMenu ? "show-nav" : ""}`}
      >
        <div className="nav-top"> 
        <button onClick={()=>setSidebarMenu(false)}><AiOutlineClose /></button>
        <a href="#">
            <h1>CandyCorp</h1>
          </a>
          <ul >
            <li >
              <CgProfile />
             
            </li>
            <li>
              <AiOutlineHeart />
            </li>
            <li>
              <AiOutlineShoppingCart />
            </li>
          </ul>
          </div  >
          <div className="nav-bottom">
          <ul>
            <li>
              <Links name="Home" />
            </li>
            <li>
              <Links name="Shop" />
            </li>
            <li>
              <Links name="Deals" />
            </li>
            <li>
              <Links name="Bundles" />
            </li>
            
            <li>
              <Links name="Blog" />
            </li>

            <li>
              <Links name="Contact" />
            </li>
            <li>
              <Links name="About" />
            </li>
          </ul>
          </div>
         <div className="nav-footer-container">

          <div className="nav-footer" >
           <i><CgFacebook /></i>
           <i><AiOutlineTwitter /></i>
           <i> <AiFillInstagram /></i>
          </div>
          <p className="nav-cpy">&copy; 2023 CandyCorp</p>
         </div>
      </nav>
   
    </div>
  );
}

export default Navbar;
