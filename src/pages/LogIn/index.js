import React from "react";

import FormLogIn from "./FormLogIn";
import Logo from "../../Components/Logo-LogIn";
import { QuoteLogIn } from "../../Components/Quote/index";
import Social from "../../Components/social/index";
import image from "../../images/joystic.png";

import "./style.css";
function LogIn() {
  return (
    <div className="contanier">
      <aside className="left-side">
        <Logo size="small" className="log-in" />
        <QuoteLogIn type="fill" />
        <img className="img" src={image} alt="joystic" />
      </aside>
      <section className="right-side">
        <div className="text-form">
          <h2 className="h2">Join the game!</h2>
          <p className="information">
            Go inside the best gamers social network!
          </p>
          <Social />
          <FormLogIn />
        </div>
      </section>
    </div>
  );
}

export default LogIn;
