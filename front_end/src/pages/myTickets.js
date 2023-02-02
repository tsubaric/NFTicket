import * as React from "react";
import "./myTickets.css";
import polygon2 from "../assets/polygon2.svg";
import rectangle43 from "../assets/rectangle43.svg";
import rectangle8 from "../assets/rectangle8.svg";
import polygon1 from "../assets/polygon1.svg";
// import Dashboard from "./components/dashboard.js";
const myTickets = () => {
  const propsData = {
    dashboard: {
      dashboard: {
        events: "Events\n",
        connectWallet: "Connect Wallet",
        myTickets: "My Tickets\n",
        createEvent: "Create Event\n\n",
        search: "search",
      },
    },
  };
  return (
    <div className="my-tickets">
      {/* <page4 className="dashboard-instance-2" {...propsData.dashboard} /> */}
      <div className="rectangle-38">
        <span>Owned</span>
        <span className="created">Created</span>
        <span className="filter-by">Filter by</span>
      </div>
      <img alt="" className="polygon-1" src={polygon1} />
      <div className="flex-container">
        <div className="flex-container-1">
          <img alt="" className="rectangle-43" src={rectangle43} />
          <img alt="" className="rectangle-44" src={rectangle43} />
        </div>
        <div className="flex-container-2">
          <img alt="" className="rectangle-45" src={rectangle43} />
          <img alt="" className="rectangle-46" src={rectangle43} />
        </div>
        <div className="flex-container-3">
          <img alt="" className="rectangle-47" src={rectangle43} />
          <img alt="" className="rectangle-49" src={rectangle43} />
        </div>
        <div className="flex-container-4">
          <img alt="" className="rectangle-48" src={rectangle43} />
          <img alt="" className="rectangle-50" src={rectangle43} />
        </div>
        <div className="flex-container-5">
          <img alt="" className="rectangle-8" src={rectangle8} />
          <img alt="" className="polygon-2" src={polygon2} />
        </div>
      </div>
      <div className="flex-container-6">
        <img alt="" className="rectangle-51" src={rectangle43} />
        <img alt="" className="rectangle-52" src={rectangle43} />
        <img alt="" className="rectangle-53" src={rectangle43} />
        <img alt="" className="rectangle-54" src={rectangle43} />
      </div>
    </div>
  );
};
export default myTickets;
