import * as React from "react";
import "./Dashboard.css";
import logo from "../assets/logo.svg";
import Dashboard from "./Dashboard";
const Dashboard = (props) => {
  return (
    <div className={`dashboard ${props.className || ""}`}>
      <img className="logo" {...props.logo} src={logo} />
      <Dashboard className="dashboard-instance-3" {...props.dashboard} />
    </div>
  );
};
export default Dashboard;