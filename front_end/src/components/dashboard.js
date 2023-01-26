import * as React from "react";
import "./dashboard.css";
const Dashboard = (props) => {
  return (
    <div className={`dashboard-1 ${props.className || ""}`}>
      <div className="rectangle-3">{props.search || "search"}</div>
      <span className="events">{props.events || "Events\n"}</span>
      <span className="my-tickets">{props.myTickets || "My Tickets\n"}</span>
      <span className="create-event">
        {props.createEvent || "Create Event\n\n"}
      </span>
      <button className="rectangle-2">
        <span className="connect-wallet">
          {props.connectWallet || "Connect Wallet"}
        </span>
      </button>
    </div>
  );
};
export default Dashboard;
