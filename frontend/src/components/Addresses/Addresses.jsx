import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import AddressForm from "../AddressForm/AddressForm";
function Addresses() {
  // const [addressEdit, setAddressEdit] = useState(false);
  const [values,setValues] = useState({})
  const adresses = [
    {
      id: 1,
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
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
      city: "New York",
      state: "NY",
      zip: "10001",
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
              <button className="address-btn-edit">
                <AiOutlineEdit />
              </button>
              <button className="address-btn-delete">
                <AiOutlineDelete />
              </button>
            </div>
          </div>
        ))}

        <button className="add-address-btn btn-box-primary">Add Address</button>
        <AddressForm title="Add a new address"/>
      </div>
    </div>
  );
}

export default Addresses;
