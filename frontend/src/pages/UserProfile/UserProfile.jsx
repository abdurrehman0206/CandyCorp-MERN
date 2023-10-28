import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function UserProfile() {
  return (
    <div className="user-profile-wrapper">
      <div className="user-profile">
        <header className="user-profile-header">
          <div>
            <h2>John Philip</h2>
            <span>New York, USA</span>
          </div>
          <div className="user-profile-signout-btn">
            <button className="btn-box-primary">Signout</button>
          </div>
        </header>
        <section className="user-profile-content">
          {/* side bar menu */}
          <div className="user-profile-sidebar-nav">
            <ul>
              <li>
                <NavLink
                  to="myorders"
                  className={({ isActive }) =>
                    isActive ? "user-profile-navlink-active" : ""
                  }
                >
                  My Orders
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="addresses"
                  className={({ isActive }) =>
                    isActive ? "user-profile-navlink-active" : ""
                  }
                >
                  Addresses
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="setting"
                  className={({ isActive }) =>
                    isActive ? "user-profile-navlink-active" : ""
                  }
                >
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="user-profile-nav-content">{<Outlet />}</div>
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
