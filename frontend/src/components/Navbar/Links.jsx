import React, { useState, useRef, useEffect, Children } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { NavLink, Link } from "react-router-dom";
function Links({
  name = "",
  dd_links = [],
  className = "",
  dd_menu = false,
  path = "",
  hideSideBarMenu = () => {},
  sidebarMenu = false,
  Children,
}) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      className={`nav-link-wrapper ${sidebarMenu ? "nav-link-addition" : ""}`}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >

      <div className="nav-link-header ">
        <NavLink
          onClick={() => {
            hideSideBarMenu();
            setShowMenu(false);
          }}
          to={path}
          className={({ isActive }) => {
            if (isActive) {
              return "nav-link nav-link-active";
            } else {
              return "nav-link ";
            }
          }}
        >
          {Children}
          {name}
        </NavLink>

        {dd_menu && (
          <button>
            {showMenu ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}
          </button>
        )}
      </div>
      {/* Dropdown Menu */}
      {dd_menu && (
        <div
          className={`${!sidebarMenu ? "dropdown-wrapper" : ""} ${
            showMenu ? "show-menu" : "hide-menu"
          }`}
        >
          <div className="dropdown">
            <ul className="dropdown-content">
              {dd_menu &&
                dd_links.map((link) => (
                  <li key={link.name}>
                    <Link onClick={() => setShowMenu(false)}>{link.name}</Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Links;
