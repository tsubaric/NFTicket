import * as React from "react";
import "../styles/MyTicketsPage.css";
import Box from "@mui/material/Box";
import TicketCard from "../components/TicketCard.jsx";
import { useState, useEffect } from "react";
import TabContext from "@mui/lab/TabContext";
import PersonIcon from "@mui/icons-material/Person";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import { getAllOwnedTickets, getTicketInfo, getTicketUri } from "../interfaces/NFTicket_interface";

export default function MyTicketsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [displayList, setDisplayList] = useState([]);
  const [ownedTickets, setOwnedTickets] = useState([]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    filterEvents();
  };

  const filterEvents = () => {
    // apply category filter if category is not "All"
    let filteredEvents = ownedTickets;
    //apply search filter if search term is not empty
    if (searchTerm !== "") {
      filteredEvents = filteredEvents.filter((event) =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setDisplayList(filteredEvents);
  };

  async function loadTickets() {
    // get ticket ids of owned tickets
    const tickets = await getAllOwnedTickets();
    const promises = tickets.map((ticket) => {
      {
        console.log("ticket URI ", getTicketUri(Number(ticket)))
        return getTicketInfo(Number(ticket))
      }
    })
    const ownedTickets = await Promise.all(promises)
    console.log("found owned tickets: ", ownedTickets)
    setOwnedTickets(ownedTickets)
    setDisplayList(displayList)
  }

  useEffect(() => {
    loadTickets();
  }, []);


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
          </Box>
          <Box style={{ display: "flex", justifyContent: "center", margin: "50px" }}>
              { ownedTickets[0] === 0 ? <h1>No tickets found</h1> :
                  ownedTickets.map((t, i) => {
                      return (
                        <div style={{ padding: "15px"}}>
                        <TicketCard
                          key={i}
                          ticketId={t.ticketId}
                          eventId={t.eventId}
                        />
                        </div>
                      )
                  })
              }
          </Box>
        </TabContext>
      </div>
    </div>
  );
}