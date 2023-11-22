import React, { useState, useLayoutEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useAuthContext } from "../../hooks/useAuthContext";
import Input from "../Common/Input";
function Addresses() {
  const { user, dispatch } = useAuthContext();
  const [updateId, setUpdateId] = useState("");

  // const [addressEdit, setAddressEdit] = useState(false);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    company: "",
    address1: "",
    address2: "",
    country: "",
    postalCode: "",
    phone: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleAddressUpdate = async () => {
    console.log("handleAddressUpdate invoked");
    if (!user) {
      console.log("User is not logged in");
      return;
    }
    if (user) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/update-address/${updateId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          method: "PATCH",
          body: JSON.stringify({ ...values }),
        }
      );
      const json = await response.json();
      if (json.success) {
        dispatch({ type: "UPDATE_ADDRESS", payload: json.data });
      } else {
        console.log(json.error);
      }
    }
  };
  const handleAddressAdd = async () => {
    console.log("handleAddressAdd invoked");
    if (!user) {
      console.log("User is not logged in");
      return;
    }
    if (user) {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/users/add-address`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          method: "POST",
          body: JSON.stringify({ ...values }),
        }
      );
      const json = await response.json();
      if (json.success) {
        dispatch({ type: "ADD_ADDRESS", payload: json.data });
      } else {
        console.log(json.error);
      }
    }
  };

  return (
    <div className="adresses-wrapper">
      <div className="addresses">
        {user.addresses.length === 0 ? (
          <div className="no-orders">
            <p>
              Sweeten your day with CandyCorp's treats, but it looks like our
              delivery sleigh needs a map to find your address. Add one and let
              the sweetness flow!
            </p>
          </div>
        ) : (
          <>
            {user.addresses.map((address, index) => (
              <div key={address.id} className="address-content">
                <h3>Address # {index + 1}</h3>

                <div className="address">
                  <p>
                    {address.address1}, {address.address2} {address.country}
                  </p>
                </div>
                <div className="address-edit">
                  <button
                    className="address-btn-edit"
                    onClick={() => {
                      setUpdate(true);
                      setShowForm(true);
                      setUpdateId(address._id);
                      setValues({
                        firstname: address.firstname,
                        lastname: address.lastname,
                        company: address.company,
                        address1: address.address1,
                        address2: address.address2,
                        country: address.country,
                        postalCode: address.postalCode,
                        phone: address.phone,
                      });
                    }}
                  >
                    <AiOutlineEdit />
                  </button>
                  <button className="address-btn-delete">
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        {
          <button
            className="add-address-btn btn-box-primary"
            onClick={() => {
              if (showForm) {
                setShowForm(false);
                setUpdate(false);
              } else {
                setValues({
                  firstname: "",
                  lastname: "",
                  company: "",
                  address1: "",
                  address2: "",
                  country: "",
                  postalCode: "",
                  phone: "",
                });
                setShowForm(true);
              }
            }}
          >
            {showForm ? "Cancel" : "Add Address"}
          </button>
        }
        {/* Address form */}
        {showForm && (
          <div className="address-form-container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("submitted");
              }}
            >
              <div className="form-wrapper-div">
                <h3>
                  {update ? "Update existing address" : "Add a new address"}{" "}
                </h3>
                <div className="address-form form-grid-container">
                  <Input
                    label="First name"
                    type="text"
                    value={values.firstname}
                    name="firstname"
                    onChange={handleChange}
                  />
                  <Input
                    label="Last name"
                    type="text"
                    value={values.lastname}
                    name="lastname"
                    onChange={handleChange}
                  />
                  <Input
                    label="Company"
                    type="text"
                    value={values.company}
                    name="company"
                    onChange={handleChange}
                  />
                  <Input
                    label="Address1"
                    type="text"
                    value={values.address1}
                    name="address1"
                    onChange={handleChange}
                  />
                  <Input
                    label="Address2"
                    type="text"
                    value={values.address2}
                    name="address2"
                    onChange={handleChange}
                  />
                  <Input
                    label="Country"
                    type="text"
                    value={values.country}
                    name="country"
                    onChange={handleChange}
                  />
                  <Input
                    label="Postal/Zip Code"
                    type="text"
                    value={values.postalCode}
                    name="postalCode"
                    onChange={handleChange}
                  />
                  <Input
                    label="Phone"
                    type="text"
                    value={values.phone}
                    name="phone"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="submit-btn">
                <button
                  className="btn-box-primary"
                  onClick={() => {
                    if (update) {
                      handleAddressUpdate();
                    } else {
                      handleAddressAdd();
                    }
                  }}
                >
                  {update ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Addresses;
