import React, { useState } from "react";
import profile from "../../assets/profile.jpg";
import { TfiUpload } from "react-icons/tfi";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { useAuthContext } from "../../hooks/useAuthContext";
import Input from "../Common/Input";
function UserSetting() {
  const { user } = useAuthContext();
  const [userDetails, setUserDetails] = useState({
    firstName: "jhon",
    lastName: "Philip",
    email: "abc@gmail.com",
  });
  const [edit, setEdit] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const changeHandle = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="user-setting-wrapper">
      <section className="user-setting">
        <div className="user-setting-details">
          {/* users details container */}
          <ul className="user-details-container">
            <li>
              <span>Full Name</span>
              <Input
                className={!edit ? "user-detail-inp" : ""}
                type="text"
                value={user.fullname}
                onChange={changeHandle}
                name="fullName"
                readOnly={!edit}
              />
            </li>
            <li>
              <span>Username </span>
              <Input
                className={!edit ? "user-detail-inp" : ""}
                type="text"
                value={user.username}
                onChange={changeHandle}
                name="userName"
                readOnly={!edit}
              />
            </li>
            <li>
              <span>Email </span>
              <Input
                className={!edit ? "user-detail-inp" : ""}
                type="text"
                value={user.email}
                onChange={changeHandle}
                name="email"
                readOnly={!edit}
              />
            </li>
            {edit && (
              <li>
                <button
                  className="btn-box-primary"
                  onClick={() => setEdit(false)}
                >
                  Save
                </button>
              </li>
            )}
            <li className="change-upload-btn-container">
              <button
                className="btn-box-primary change-password-btn"
                onClick={() => setChangePassword(!changePassword)}
              >
                Change password
              </button>
              <button className="btn-box-primary upload-img-btn">
                Upload Image
              </button>
            </li>
            <button
              className="user-detail-edit-btn"
              onClick={() => setEdit(!edit)}
            >
              {edit ? <MdOutlineCancel /> : <FiEdit />}
            </button>
          </ul>
        </div>
        <div className="user-setting-profile-pic-section">
          {/* <h4>Profile Image</h4> */}
          <div className="profile-img-container">
            <img
              src={user.image}
              alt="user-profile"
              className="profile-img border-ac3"
            />
            <button className="img-edit-btn">
              <TfiUpload />
            </button>
          </div>
        </div>
        {/* password Change Form */}
        {changePassword && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="pass-change-form-wrapper"
          >
            <div className="pass-change-form">
              <h3>Change Password</h3>
              <div className="pass-change-form-inputs">
                <Input
                  label="Old Password"
                  type="password"
                  name="oldPassword"
                />
                <Input
                  label="New Password"
                  type="password"
                  name="newPassword"
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                />
              </div>
            </div>
            <div>
              <button className="btn-box-primary">Submit</button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default UserSetting;
