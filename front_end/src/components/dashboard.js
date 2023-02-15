import * as React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import ConnectWalletButton from './ConnectWalletButton'

const Dashboard = (props) => {
  return (
    <nav className={`dashboard-1 ${props.className || ""}`}>
      <div className="rectangle-3">{props.search || "Search"}</div>
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/tickets">My Tickets</Link>
      <Link to="/create">Create Event</Link>
      {/* <span className="events">{props.events || "Events\n"}</span>
      <span className="my-tickets">{props.myTickets || "My Tickets\n"}</span>
      <span className="create-event">
        {props.createEvent || "Create Event\n\n"}
      </span> */}
      <ConnectWalletButton />
    </nav>
  );
};
export default Dashboard;
