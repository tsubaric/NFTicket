import * as React from "react";
import "./Event.css";
import rectangle561 from "../assets/rectangle561.svg";
import rectangle56 from "../assets/rectangle56.svg";
// import Dashboard from "./components/dashboard.js";
const Event = () => {
  const propsData = {
    dashboard: {
      dashboard: {
        myTickets: "My Tickets\n",
        createEvent: "Create Event\n\n",
        search: "search",
        events: "Events\n",
        connectWallet: "Connect Wallet",
      },
    },
  };
  return (
    <div className="event">
      {/* <Dashboard className="dashboard-instance-1" {...propsData.dashboard} /> */}
      <div className="flex-container">
        <div className="rectangle-57">
          <span className="event-image">Event Image</span>
        </div>
        <span className="lolla-pallooza-2026">LollaPallooza 2026</span>
      </div>
      <img alt="" className="rectangle-56" src={rectangle56} />
      <div className="flex-container-1">
        <img alt="" className="rectangle-56-1" src={rectangle561} />
        <img alt="" className="rectangle-62" src={rectangle561} />
        <img alt="" className="rectangle-58" src={rectangle561} />
        <img alt="" className="rectangle-57-1" src={rectangle561} />
      </div>
      <div className="flex-container-2">
        <img alt="" className="rectangle-63" src={rectangle561} />
        <img alt="" className="rectangle-59" src={rectangle561} />
        <img alt="" className="rectangle-61" src={rectangle561} />
        <img alt="" className="rectangle-60" src={rectangle561} />
      </div>
    </div>
  );
};
export default Event;
