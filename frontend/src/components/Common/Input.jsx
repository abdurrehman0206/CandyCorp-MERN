import React, { useId } from "react";

function Input({ label, type = "text", className = "", ...props }) {
  const id = useId();
  return (
    <div className="input-container">
      {label && (
        <label className="input-label" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        type={type}
        className={`input-field ${className}`}
        {...props}
        id={id}
      />
    </div>
  );
}

export default Input;
