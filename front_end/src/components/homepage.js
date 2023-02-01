import * as React from "react";
import "./homepage.css";
import logo from "../assets/logo.svg";
import Dashboard from "./dashboard";
const homepage = (props) => {
  return (
    <div className={`dashboard ${props.className || ""}`}>
      <img className="logo" {...props.logo} src={logo} alt="" />
      <Dashboard className="dashboard-instance-3" {...props.dashboard} />
    </div>
  );
};
export default homepage;
