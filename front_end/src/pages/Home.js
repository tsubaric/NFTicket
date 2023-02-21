import React, { useState, useEffect } from "react";
import "./Home.css";
import Box from "@mui/material/Box";

const Home = () => {
  const [data, setData] = useState("");
  // const propsData = {
  //   dashboard: {
  //     dashboard: {
  //       search: "search",
  //       events: "Events\n",
  //       myTickets: "My Tickets\n",
  //       connectWallet: "Connect Wallet",
  //       createEvent: "Create Event\n\n",
  //     },
  //   },
  // };

  useEffect(() => {
    console.log("test");
    async function getResponses() {
      const items = await fetch("/users");
      console.log(items);
      const data = await items.json();
      console.log("first");
      setData(data);
      console.log(":test");
      console.log(data);
    }
    getResponses();
  }, []);

  return (
    <div className="home">
      <Box>
        <form
          method="POST"
          action="/addItem"
          // onSubmit={() => {
          //   alert("Item Created!");
          // }}
        >
          {/* add on submit*/}
          {/* <div className="input-container">
                <label>Item Name</label>
                <input
                  name="itemName"
                  type="text"
                  value={this.state.itemName}
                  onChange={(e) => {
                    this.setState({ itemName: e.target.value });
                  }}
                  required
                />
              </div> */}
          <div className="button-container">
            <input type="submit" />
          </div>
          <br />
        </form>
      </Box>
      <br />
      <br />

      <span className="nf-ticket">NFTicket</span>
      <span className="create-events-view-a">
        Create Events, View and Transfer tickets{" "}
      </span>
      <div className="rectangle-4">
        <span className="website-description">website description</span>
      </div>
    </div>
  );
};
export default Home;
