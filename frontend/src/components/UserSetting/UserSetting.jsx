import React, { useState } from "react";
import profile from "../../assets/profile.jpg";
import { TfiUpload } from "react-icons/tfi";
import Input from "../Common/Input";
function UserSetting() {
  const [userDetails, setUserDetails] = useState({
    firstName: {
      value: "jhon",
      edit: true,
    },
    lastName: {
      value: "",
      edit: false,
    },
    email: {
      value: "",
      edit: false,
    },
  });
  const changeHandle = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: { ...e.target.name, value: e.target.value },
    });
  };
  return (
    <div className="user-setting-wrapper">
      <section className="user-setting">
        <div className="user-setting-details">
          {/* users details container */}
          <ul className="user-details-container">
            <li>
              <span>First Name</span>
              <Input
                className="user-detail"
                type="text"
                value={userDetails.firstName.value}
                onChange={changeHandle}
                name="firstName"
                readOnly={!userDetails.firstName.edit}
              />
            </li>
            <li>
              <span>Last Name </span>
              <p>Philip</p>
            </li>
            <li>
              <span>Email </span>
              <p>abc@xyz.com</p>
            </li>
            <li>
              <button className="btn-box-outline change-password-btn">
                Change password
              </button>
            </li>
          </ul>
        </div>
        <div className="user-setting-profile-pic-section">
          {/* <h4>Profile Image</h4> */}
          <div className="profile-img-container">
            <img
              src={profile}
              alt="user-profile"
              className="profile-img border-ac3"
            />
            <button className="img-edit-btn">
              <TfiUpload />
            </button>
          </div>

          {/* <button className="btn-box-outline">Upload New</button> */}
        </div>
      </section>
    </div>
  );
}

export default UserSetting;
