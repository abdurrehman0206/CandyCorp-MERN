import React, { useContext, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { NavLink, Link } from "react-router-dom";
import { filterContext } from "../../context/filterContext";
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
  const { resetValue } = useContext(filterContext);
  return (
    <div
      className={`nav-link-wrapper ${sidebarMenu ? "nav-link-addition" : ""}`}
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <div className="nav-link-header ">
        <NavLink
          onClick={() => {
            resetValue();
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

        {dd_menu && sidebarMenu && (
          <button
            onClick={() => {
              resetValue();
              // hideSideBarMenu();
              setShowMenu(false);
            }}
          >
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
                dd_links.map((link, key) => (
                  <li key={key}>
                    <NavLink
                      to={link.path}
                      onClick={() => {
                        resetValue();
                        hideSideBarMenu();
                        // setShowMenu(false);
                      }}
                    >
                      {link.name}
                    </NavLink>
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
