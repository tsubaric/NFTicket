// import * as React from "react";
// import "./App.css";
// import polygon1 from "./assets/polygon1.svg";
// import polygon2 from "./assets/polygon2.svg";
// // import Dashboard from "./components/Dashboard";
// import page2 from "./components/page2";
// const App = () => {
//   const propsData = {
//     dashboard: {
//       dashboard: {
//         search: "search",
//         createEvent: "Create Event\n\n",
//         connectWallet: "Connect Wallet",
//         myTickets: "My Tickets\n",
//         events: "Events\n",
//       },
//     },
//   };
//   return (
//     <div className="events">
//       <page2 className="dashboard-instance-2" {...propsData.dashboard} />
//       <span className="view-by-category">View by Category</span>
//       <div className="flex-container">
//         <img className="polygon-1" src={polygon1} />
//         <div className="rectangle-44">Restaurants</div>
//         <div className="rectangle-45">Festivals</div>
//         <div className="rectangle-47">Sports</div>
//         <div className="rectangle-46">Travel</div>
//         <img className="polygon-2" src={polygon2} />
//       </div>
//       <div className="flex-container-1">
//         <span>TOP</span>
//         <span>TRENDING</span>
//       </div>
//       <div className="flex-container-2">
//         <input className="rectangle-5" type="text" />
//         <input className="rectangle-12" type="text" />
//       </div>
//       <div className="flex-container-3">
//         <input className="rectangle-6" type="text" />
//         <input className="rectangle-11" type="text" />
//       </div>
//       <div className="flex-container-4">
//         <input className="rectangle-7" type="text" />
//         <input className="rectangle-10" type="text" />
//       </div>
//       <div className="flex-container-5">
//         <input className="rectangle-8" type="text" />
//         <input className="rectangle-9" type="text" />
//       </div>
//     </div>
//   );
// };
// export default App;

import * as React from "react";
import "./App.css";
import polygon2 from "./assets/polygon2.svg";
import rectangle43 from "./assets/rectangle43.svg";
import rectangle8 from "./assets/rectangle8.svg";
import polygon1 from "./assets/polygon1.svg";
//import Dashboard from "./components/Dashboard";
import page3 from "./components/page2";
const App = () => {
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
      <page3 className="dashboard-instance-2" {...propsData.dashboard} />
      <div className="rectangle-38">
        <span>Owned</span>
        <span className="created">Created</span>
        <span className="filter-by">Filter by</span>
      </div>
      <img className="polygon-1" src={polygon1} />
      <div className="flex-container">
        <div className="flex-container-1">
          <img className="rectangle-43" src={rectangle43} />
          <img className="rectangle-44" src={rectangle43} />
        </div>
        <div className="flex-container-2">
          <img className="rectangle-45" src={rectangle43} />
          <img className="rectangle-46" src={rectangle43} />
        </div>
        <div className="flex-container-3">
          <img className="rectangle-47" src={rectangle43} />
          <img className="rectangle-49" src={rectangle43} />
        </div>
        <div className="flex-container-4">
          <img className="rectangle-48" src={rectangle43} />
          <img className="rectangle-50" src={rectangle43} />
        </div>
        <div className="flex-container-5">
          <img className="rectangle-8" src={rectangle8} />
          <img className="polygon-2" src={polygon2} />
        </div>
      </div>
      <div className="flex-container-6">
        <img className="rectangle-51" src={rectangle43} />
        <img className="rectangle-52" src={rectangle43} />
        <img className="rectangle-53" src={rectangle43} />
        <img className="rectangle-54" src={rectangle43} />
      </div>
    </div>
  );
};
export default App;