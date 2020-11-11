import React from "react";
import "./style.css";
function Input(props) {
  const { handleChange, name, type, value, label, placeholder, error } = props;
  return (
    <div className="contanier-input">
      <label className="title-label" htmlFor={name}>
        {label}
      </label>
      <input
        className={error ? "error input" : "input"}
        name={name}
        type={type}
        id={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {error && (
        <div htmlFor={name} className="lable-error">
          {error}
        </div>
      )}
    </div>
  );
}

export default Input;
