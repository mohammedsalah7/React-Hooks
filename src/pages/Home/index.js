import { useContext } from "react";
import { useHistory } from "react-router-dom";

import { LoginsContext } from "../../App";
import "./style.css";

export default function Header() {
  const history = useHistory();
  const { state, dispatch } = useContext(LoginsContext);
  const handleClick = () => {
    dispatch({ type: "logout" });
    history.push("/login");
    window.localStorage.setItem("isLoggedIn", false);
  };
  return (
    <div className="container-home">
      <h1 className="name"> Welcome {state.name} 😉</h1>

      <h4 className="title-home">
        This is the home for Gamers site , We hpoe to engoy with us ✌{" "}
      </h4>

      <button className="btn-logout" onClick={handleClick}>
        logout
      </button>
    </div>
  );
}
