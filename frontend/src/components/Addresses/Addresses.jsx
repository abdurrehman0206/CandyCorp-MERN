import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import Input from "../Common/Input";
function Addresses() {
  // const [addressEdit, setAddressEdit] = useState(false);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    company: "",
    address1: "",
    address2: "",
    country: "",
    postalCode: "",
    phone: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [update, setUpdate] = useState(false);
  // useEffect(() => {
  //   console.log(values);
  // }, [values]);
  // onChange Handler
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // addresses data
  const adresses = [
    {
      id: 1,
      address: "123 Main St",
      city: "Canada",
      state: "Cn",
      zip: "10011",
    },
    {
      id: 2,
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    {
      id: 3,
      address: "123 Main St",
      city: "Pakistan",
      state: "PK",
      zip: "10021",
    },
  ];

  return (
    <div className="adresses-wrapper">
      <div className="addresses">
        {adresses.map((address, index) => (
          <div key={address.id} className="address-content">
            <h3>Address # {index + 1}</h3>
            <div className="address">
              <p>
                {address.address}, {address.city} {address.state}
              </p>
            </div>
            <div className="address-edit">
              <button
                className="address-btn-edit"
                onClick={() => {
                  setUpdate(true);
                  setShowForm(true);
                  setValues({
                    firstName: "",
                    lastName: "",
                    company: "",
                    address1: address.name,
                    address2: "",
                    country: address.city,
                    postalCode: address.zip,
                    phone: "",
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
        {
          <button
            className="add-address-btn btn-box-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "cancel" : "Add Address"}
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
              <div>
                <h3>{update?"Update exciting address":"Add a mew address"} </h3>
                <div className="address-form form-grid-container">
                  <Input
                    label="First name"
                    type="text"
                    value={values.firstName}
                    name="firstName"
                    onChange={handleChange}
                  />
                  <Input
                    label="Last name"
                    type="text"
                    value={values.lastName}
                    name="lastName"
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
                <button className="btn-box-primary">
                  {update ? "update" : "Add"}
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
