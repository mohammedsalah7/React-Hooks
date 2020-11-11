import React, { useState, useContext } from "react";
import Input from "../../Components/Input";
import { LogInBtn } from "../../Components/Button";
import * as T from "../../Components/Typography";
// import image from "../../images/eye.png";
// import * as yup from "yup";
import { Link } from "react-router-dom";
import "./style.css";
import { LoginsContext } from "../../App";
import { useHistory } from "react-router-dom";

export default function FormLogIn() {
  const history = useHistory();
  const { dispatch } = useContext(LoginsContext);
  const [values, setUsername] = useState({
    email: "",
    password: "",
    username: "",
  });
  // const [usepassword, setPassword] = useState("");

  // useEffect(() => {
  //   setTimeout(() => {
  //     const isLoggedIn = window.localStorage.getItem("isLoggedIn");
  //     const name = window.localStorage.getItem("name");

  //     if (isLoggedIn) {
  //       dispatch({ type: "login", payload: name });
  //     } else {
  //       dispatch({ type: "logout" });
  //     }
  //   }, 200);
  // }, [dispatch]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsername({ ...values, [name]: value });
  };
  // const handleClick = () => {
  //   history.push("/signup");
  //   dispatch({ type: "login", payload: "ahmed" });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/");
    let { value } = e.target;
    value = values.username;
    dispatch({ type: "login", payload: value });
  };
  const { email, password, username } = values;
  return (
    <form className="contanier-form" onSubmit={handleSubmit}>
      <Input
        handleChange={handleChange}
        name="email"
        type="email"
        placeholder="write Your Email"
        value={email}
        label="Your Email"
        id="Email"

        // error={state.errors.email}
      />
      {/* <button className="img-eye">
        <img src={image} alt="eye" />
      </button> */}

      <Input
        handleChange={handleChange}
        name="password"
        type="password"
        placeholder="Enter Your password"
        value={password}
        label=" Enter Your Password"
        id="password"
        // error={state.errors.password}
      />
      <Input
        handleChange={handleChange}
        name="username"
        type="text"
        placeholder="Enter Your password"
        value={username}
        label=" Enter Your Password"
        id="password"
        // error={state.errors.password}
      />

      <LogInBtn className="google-btn" type="submit">
        Login
      </LogInBtn>
      <T.H1 className="new-accout">
        {[
          "Don’t have an account? ",
          <Link to="/SignUp" className="link" name="SignUp">
            Register
          </Link>,
        ]}
      </T.H1>
    </form>
  );
}
