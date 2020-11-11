import React from "react";
import "./style.css";

export const H1 = (props) => {
  const { children, className } = props;
  return <h1 className={className}> {children} </h1>;
};
