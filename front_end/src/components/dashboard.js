import * as React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import ConnectWalletButton from './ConnectWalletButton'

const Dashboard = (props) => {
  return (
    <nav className={`dashboard-1 ${props.className || ""}`}>
      {/*<div className="rectangle-3">{props.search || "Search"}</div>  */}
      
      <p >NFTicket</p>
      {/*<button className="rectangle-3">  </button> */}
      <input type="text" placeholder="Search" className="rectangle-3" />
{/*
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/tickets">My Tickets</Link>
      <Link to="/create">Create Event</Link>
*/}
      <a href="/" class="button">Home</a>
      <a href="/events" class="button">Events</a>
      <a href="/tickets" class="button">My Tickets</a>
      <a href="/create" class="button">Create</a>

      
       

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
