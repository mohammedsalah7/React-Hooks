import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";
import React from "react";

import "./style.css";
function Back(props) {
  return (
    <div className="back">
      <button className="link-back" onClick={() => props.history.goBack()}>
        <FontAwesomeIcon className="icon" icon={faChevronLeft} />
        <p className="word-back">Back</p>
      </button>
    </div>
  );
}
export default withRouter(Back);
