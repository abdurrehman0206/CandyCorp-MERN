import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import profile from "../../assets/profile.jpg";
import { useAuthContext } from "../../hooks/useAuthContext";
function UserProfile() {
  const { user } = useAuthContext();
  return (
    <div className="user-profile-wrapper">
      <div className="user-profile">
        <header className="user-profile-header">
          <div className="user-details">
            <img
              className="profile-pic border-ac1"
              src={user.image}
              alt="user-profile"
            />
            <div>
              <h2>{user.fullname}</h2>
              <span
                className="c-ac1"
                style={{
                  fontWeight: "600",
                }}
              >
                @{user.username}
              </span>
            </div>
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
                    isActive
                      ? "user-profile-navlink-active"
                      : "user-profile-navlink"
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
