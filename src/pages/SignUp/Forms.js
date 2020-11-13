import React, { useState, useEffect, useContext } from "react";
import Input from "../../Components/Input";
import { LoginsContext } from "../../App";
import Checkbox from "../../Components/Checkbox";
import { RegisterBtn, LogInBtn, OR } from "../../Components/Button";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import "./style.css";
const initState = {
  email: "",
  userName: "",
  password: "",
  rePassword: "",
  checked: "",
  error: "",
};
const schema = yup.object().shape({
  email: yup.string().email().required(),
  userName: yup.string().required(),
  password: yup.string().required().min(9),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
  checked: yup.string().required(),
});

function Forms() {
  const { dispatch } = useContext(LoginsContext);
  const history = useHistory();
  const [state, setState] = useState(initState);
  const [errors, setErrors] = useState(initState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { email, userName, password, rePassword, error, checked } = state;

  useEffect(() => {
    let mount = true;
    if (isSubmitted) {
      console.log("object");
      schema
        .validate(state, { abortEarly: false })
        .then(() => {
          if (mount) {
            setErrors({
              email: "",
              userName: "",
              password: "",
              rePassword: "",
              checked: "",
            });
          }
        })
        .catch((err) => {
          const newErrors = {};
          err.inner.forEach(({ path, message }) => {
            newErrors[path] = message;
          });

          if (mount) {
            setErrors({ ...initState, ...newErrors });
          }
        });
    }
    return () => {
      mount = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted, email, userName, password, rePassword, checked]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    let _value = value;
    if (id === "checked") {
      _value = checked;
    }
    setState({ ...state, [id]: _value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("submit the form ");
    if (!error) {
      console.log("if is ok");
      axios
        .post("https://fake-api-ahmed.herokuapp.com/v1/auth/signup", {
          email,
          password,
        })
        .then((res) => {
          console.log("then");
          const user = res.data;
          console.log(user);
          let { value } = e.target;
          value = state.userName;
          dispatch({ type: "signup", payload: value });
          history.push("/LogIn");

          console.log("submit the form ");
        })
        .catch((err) => {
          console.log(err.response.data.error);
          let error = err.response.data.error;
          if (error.includes("duplicate")) {
            error = "Email already exists";
          }
          setState({ error: error });
        });
    }
  };

  return (
    <form className="contanier-form" onSubmit={handleSubmit}>
      <Input
        handleChange={handleChange}
        id="email"
        name="email"
        type="email"
        placeholder="Enter Your Email"
        value={email}
        label="Email address"
        error={errors.email}
      />
      <Input
        handleChange={handleChange}
        name="userName"
        type="text"
        placeholder="Enter Your Name"
        value={userName}
        label="User Name"
        id="userName"
        error={errors.userName}
      />
      <Input
        handleChange={handleChange}
        name="password"
        type="password"
        placeholder="Enter Your password"
        value={password}
        label="Create password"
        id="password"
        error={errors.password}
      />
      <Input
        handleChange={handleChange}
        name="rePassword"
        type="password"
        placeholder="Repeat password"
        value={rePassword}
        label="Repeat password"
        id="rePassword"
        error={errors.rePassword}
      />
      <Checkbox
        handleChange={handleChange}
        name="checked"
        id="checked"
        type="checkbox"
        Text="I agree to terms & conditions"
        error={errors.checked}
        checked={checked}
      />
      <RegisterBtn type=" submit" className="register-btn-signup">
        Register
      </RegisterBtn>

      <OR className="or" />
      <Link to="/LogIn" className="link-page">
        <LogInBtn className="login-btn-signup"> Log In</LogInBtn>
      </Link>
    </form>
  );
}

export default Forms;
