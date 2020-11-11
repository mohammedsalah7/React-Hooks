import React, { Component } from "react";
import Input from "../../Components/Input";
import Checkbox from "../../Components/Checkbox";
import { RegisterBtn, LogInBtn, OR } from "../../Components/Button";
import { Link } from "react-router-dom";
import contactUsSchema, { fieldSchema } from "./signup_validate";
import axios from "axios";
// import * as yup from "yup"
import "./style.css";
class Forms extends Component {
  state = {
    email: "",
    password: "",
    rePassword: "",
    checked: false,
    errors: {},
    error: "",
  };
  handleChange = (e) => {
    const { value, name, checked } = e.target;
    let _value = value;
    if (name === "checked") {
      _value = checked;
    }

    const validate = () => {
      const { password } = this.state;
      fieldSchema(name, password)
        .validate(_value)
        .then((data) => {
          // console.log(data);
          console.log("valid");
          this.setState((prevState) => {
            const { errors } = prevState;
            return { errors: { ...errors, [name]: "" } };
          });
        })
        .catch((err) => {
          console.log("in valid");
          this.setState((prevState) => {
            const { errors } = prevState;
            return { errors: { ...errors, [name]: err.message } };
          });
        });
    };

    this.setState({ [name]: _value }, validate);
  };

  validateFrom = (data) => {
    contactUsSchema
      .validate(data, { abortEarly: false })
      .then((data) => {
        console.log("valid");
        console.log(data);
        this.setState({ error: "" });
      })
      .catch((err) => {
        console.log("Invalid");
        console.log(err);
        const errors = {};
        err.inner.forEach(({ message, params }) => {
          errors[params.path] = message;
        });
        this.setState({ errors, error: "Check the fields above" });
      });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, rePassword, checked, error } = this.state;
    this.validateFrom({ email, password, rePassword, checked });
    if (!error) {
      axios
        .post("https://fake-api-ahmed.herokuapp.com/v1/auth/signup", {
          email,
          password,
        })
        .then((res) => {
          const user = res.data;
          console.log(user);
          // this.props.handleLogin()
        })
        .catch((err) => {
          console.log(err.response.data.error);
          let error = err.response.data.error;
          if (error.includes("duplicate")) {
            error = "Email already exists";
          }
          this.setState({ error });
        });
    }
  };

  render() {
    const { email, password, rePassword, checked, errors, error } = this.state;
    return (
      <form className="contanier-form" onSubmit={this.handleSubmit}>
        <Input
          handleChange={this.handleChange}
          name="email"
          type="email"
          placeholder="Enter Your Email"
          value={email}
          label="Email address"
          id="Email"
          error={errors.email}
        />
        <Input
          handleChange={this.handleChange}
          name="password"
          type="password"
          placeholder="Enter Your password"
          value={password}
          label="Create password"
          id="password"
          error={errors.password}
        />
        <Input
          handleChange={this.handleChange}
          name="rePassword"
          type="password"
          placeholder="Repeat password"
          value={rePassword}
          label="Repeat password"
          id="rePassword"
          error={errors.rePassword}
        />
        <Checkbox
          handleChange={this.handleChange}
          name="checked"
          type="checkbox"
          Text="I agree to terms & conditions"
          error={errors.checked}
          checked={checked}
        />
        {error && <span>{error}</span>}
        <RegisterBtn className="register-btn-signup">Register</RegisterBtn>

        <OR className="or" />
        <Link to="/" className="link-page">
          <LogInBtn className="login-btn-signup"> Log In</LogInBtn>
        </Link>
      </form>
    );
  }
}

export default Forms;
