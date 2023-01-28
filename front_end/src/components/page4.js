import * as React from "react";
import "./page4_myTix.css";
import logo from "../assets/logo.svg";
//import Dashboard from "./Dashboard";
const page4 = (props) => {
  return (
    <div className={`dashboard-1 ${props.className || ""}`}>
      <img className="logo" {...props.logo} src={logo} />
      <Dashboard className="dashboard-instance-3" {...props.dashboard} />
    </div>
  );
};
export default page4;
