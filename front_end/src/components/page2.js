import * as React from "react";
import "./page2.css";
import logo from "../assets/logo.svg";
//import eventsHome from "./eventsHome";
const page2 = (props) => {
  return (
    <div className={`dashboard-1 ${props.className || ""}`}>
      <img className="logo" {...props.logo} src={logo} />
      <eventsHome className="dashboard-instance-3" {...props.dashboard} />
    </div>
  );
};
export default page2;
