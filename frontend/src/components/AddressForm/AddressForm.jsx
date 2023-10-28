import React, { useState, useMemo } from "react";
import Input from "../Common/Input";
// import Select from "react-select";
import countryList from "react-select-country-list";
function AddressForm({ title = "" }) {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };
  console.log(options);
  return (
    <div className="address-form-container">
      <div>
        <h3>{title}</h3>
        <div className="address-form">
          <Input label="First name" type="text" />
          <Input label="Last name" type="text" />
          <Input label="Company" type="text" />
          <Input label="Address1" type="text" />
          <Input label="Address2" type="text" />
          <Input label="Country" type="text" />
          <Input label="Postal/Zip Code" type="text" />
          <Input label="Phone" type="text" />
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
