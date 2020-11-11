import React from "react";

import Forms from "./Forms";
import Logo from "../../Components/Logo/index";
import Back from "../../Components/Back/index";
import { QuoteSignUp } from "../../Components/Quote/index";

import "./style.css";
function SingUp() {
  return (
    <div className="contanier">
      <aside className="left-sid">
        <Logo size="small" className="signup" />
        <QuoteSignUp type="fill" />
      </aside>
      <section className="right-sid">
        <Back />
        <div className="text-form">
          <h2>Register Individual Account!</h2>
          <p className="infromation">
            For the purpose of gamers regulation, your details are required.
          </p>

          <Forms />
        </div>
      </section>
    </div>
  );
}

export default SingUp;
