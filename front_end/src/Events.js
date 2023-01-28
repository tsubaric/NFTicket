import * as React from "react";
import "./Events.css";
import polygon1 from "./assets/polygon1.svg";
import polygon2 from "./assets/polygon2.svg";
// import Dashboard from "./components/Dashboard";
import page2 from "./components/page2";
const Events = () => {
  const propsData = {
    dashboard: {
      dashboard: {
        search: "search",
        createEvent: "Create Event\n\n",
        connectWallet: "Connect Wallet",
        myTickets: "My Tickets\n",
        events: "Events\n",
      },
    },
  };
  return (
    <div className="events">
      <page2 className="dashboard-instance-2" {...propsData.dashboard} />
      <span className="view-by-category">View by Category</span>
      <div className="flex-container">
        <img className="polygon-1" src={polygon1} />
        <div className="rectangle-44">Restaurants</div>
        <div className="rectangle-45">Festivals</div>
        <div className="rectangle-47">Sports</div>
        <div className="rectangle-46">Travel</div>
        <img className="polygon-2" src={polygon2} />
      </div>
      <div className="flex-container-1">
        <span>TOP</span>
        <span>TRENDING</span>
      </div>
      <div className="flex-container-2">
        <input className="rectangle-5" type="text" />
        <input className="rectangle-12" type="text" />
      </div>
      <div className="flex-container-3">
        <input className="rectangle-6" type="text" />
        <input className="rectangle-11" type="text" />
      </div>
      <div className="flex-container-4">
        <input className="rectangle-7" type="text" />
        <input className="rectangle-10" type="text" />
      </div>
      <div className="flex-container-5">
        <input className="rectangle-8" type="text" />
        <input className="rectangle-9" type="text" />
      </div>
    </div>
  );
};
export default Events;