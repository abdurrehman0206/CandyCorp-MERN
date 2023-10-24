import React, { useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { NavLink } from "react-router-dom";
function Links({
  name,
  dd_links,
  className = "",
  dd_menu = false,
  path = "/",
  hideSideBarMenu = () => {},
}) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className={className ? className : "nav-link-wrapper"}>
      <div>
        <NavLink
          onClick={() => hideSideBarMenu()}
          to={path}
          className={({ isActive }) => {
            if (isActive) {
              return "nav-link nav-link-active";
            } else {
              return "nav-link ";
            }
          }}
        >
          {name}
        </NavLink>
        {dd_menu && (
          <button onClick={() => setShowMenu(!showMenu)}>
            {" "}
            {showMenu ? <AiOutlineCaretUp /> : <AiOutlineCaretDown />}{" "}
          </button>
        )}
      </div>

      {dd_menu && (
        <div
          className={`dropdown-wrapper ${showMenu ? "show-menu" : "hide-menu"}`}
        >
          <div className="dropdown">
            <ul className="dropdown-content">
              {dd_links.map((link) => (
                <li key={link.name}>{link.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Links;
