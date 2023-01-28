import * as React from "react";
import "./CreateEvent.css";
//import rectangle9 from "./assets/rectangle9.svg";
import rectangle12 from "./assets/rectangle12.svg";
//import rectangle11 from "./assets/rectangle11.svg";
//import Dashboard from "./components/Dashboard";
import page3 from "./components/page3";
const CreateEvent = () => {
  const propsData = {
    dashboard: {
      dashboard: {
        connectWallet: "Connect Wallet",
        search: "search",
        myTickets: "My Tickets\n",
        createEvent: "Create Event\n\n",
        events: "Events\n",
      },
    },
  };
  return (
    <div className="create-event">
      <page3 className="dashboard-instance-1" {...propsData.dashboard} />
      <span className="upload-file">Upload File</span>
      <input className="rectangle-6" type="text" />
      <span>Event Name</span>
      <img className="rectangle-12" src={rectangle12} />
      <span>Description</span>
      <input className="rectangle-10" type="text" />
      <span>Properties</span>
      <div className="flex-container">
        <img className="rectangle-9" src={rectangle9} />
        <img className="rectangle-11" src={rectangle11} />
      </div>
      <button className="rectangle-7">Create</button>
    </div>
  );
};
export default CreateEvent;