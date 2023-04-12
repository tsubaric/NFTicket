import * as React from "react";
import "../styles/MyTicketsPage.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TicketCard from "../components/TicketCard";
import { useState, useEffect } from "react";
import {
  getLastEventId,
  getTicketBalance,
} from "../interfaces/NFTicket_interface";
import { getEventInfo } from "../interfaces/firebase_interface";
import TabContext from "@mui/lab/TabContext";
import PersonIcon from "@mui/icons-material/Person";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";

export default function MyTicketsPage() {
  const [ticketBalance, setTicketBalance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [displayList, setDisplayList] = useState([]);

  const loadOwnedTickets = async () => {
    // get address of connected wallet
    let address = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    address = address[0];
    setAddress(address);

    // grab balance of each event id
    // NOTE: this is not scalable, but for now it works
    //
    const lastEventId = await getLastEventId();
    const balances = [];
    for (let i = 0; i <= lastEventId; i++) {
      const balance = await getTicketBalance(address, i);
      if (balance > 0) {
        const info = await getEventInfo(i);
        balances.push({ eventId: i, balance: balance, eventInfo: info[0] });
        setTicketBalance(balances);
        setDisplayList(balances);
      }
    }
    setIsLoading(false);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterEvents();
  };

  const filterEvents = () => {
    // apply category filter if category is not "All"
    let filteredEvents = ticketBalance;
    //apply search filter if search term is not empty
    if (searchTerm !== "") {
      filteredEvents = filteredEvents.filter((event) =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setDisplayList(filteredEvents);
  };

  const displayTickets = () => {
    const ticketCards = [];
    displayList.forEach((ticket) => {
      for (let i = 0; i < ticket.balance; i++) {
        ticketCards.push(
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <TicketCard
              key={ticket.eventId + "-" + i} // just so it is unique
              eventId={ticket.eventId}
              eventName={ticket.eventInfo.eventName}
              eventImage={ticket.eventInfo.thumbnail}
              owned={true}
              address={address}
            />
          </Grid>
        );
      }
    });

    return ticketCards;
  };

  useEffect(() => {
    console.log("loading owned tickets...");
    loadOwnedTickets();
    console.log(ticketBalance);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main-container">
      <div className="ownedNFTS">
        <TabContext value="1">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList>
              <Tab id="tab1" icon={<PersonIcon />} label="OWNED" value="1" />
            </TabList>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "50px",
            }}
          >
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search"
              className="searchBar"
              style={{ width: "100vh", fontSize: "40px", margin: "20px" }}
            />
            <Grid container spacing={4}>
              {displayTickets()}
            </Grid>
          </Box>
        </TabContext>
      </div>
    </div>
  );
}
