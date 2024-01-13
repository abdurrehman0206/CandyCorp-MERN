import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import profile from "../../assets/profile.jpg";
import { useLogout } from "../../hooks/useLogout";

function UserProfile() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const nav = useNavigate();
  return (
    <div className="user-profile-wrapper">
      <div className="user-profile">
        <header className="user-profile-header">
          <div className="user-details">
            <img
              className="profile-pic border-ac1"
              src={user ? user.image : profile}
              alt="user-profile"
            />
            <div>
              <h2>{user ? user.fullname : null}</h2>
              <span
                className="c-ac1"
                style={{
                  fontWeight: "600",
                }}
              >
                {user ? `@ ${user.username}` : null}
              </span>
            </div>
          </div>
          <div className="user-profile-signout-btn">
            <button
              className="btn-box-primary"
              onClick={() => (user ? logout() : nav("/login"))}
            >
              {user ? "Signout" : "Login"}
            </button>
          </div>
        </header>
        <section className="user-profile-content">
          {/* side bar menu */}
          {user && (
            <>
              {" "}
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
                      to={user ? "addresses" : null}
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
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
