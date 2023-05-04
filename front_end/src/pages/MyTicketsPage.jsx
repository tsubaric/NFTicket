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
import TabPanel from "@mui/lab/TabPanel";

export default function MyTicketsPage() {
  const [ownedTickets, setOwnedTickets] = useState([]);
  const [value, setValue] = React.useState('1');
  const [redeemedTickets, setRedeemedTickets] = useState([]);
  const [activeTickets, setActiveTickets] = useState([]);

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
    let activeTickets = []
    let redeemedTickets = []
    ownedTickets.forEach((ticket) => {
        if (ticket.redeemed) {
            redeemedTickets.push(ticket)
        } else {
            activeTickets.push(ticket)
        }
    })
    console.log("found owned tickets: ", ownedTickets)
    //setOwnedTickets(ownedTickets)
    setActiveTickets(activeTickets)
    setRedeemedTickets(redeemedTickets)
  }

  useEffect(() => {
    loadTickets();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div className="main-container">
      <div className="ownedNFTS">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange}>
              <Tab id="tab1" icon={<PersonIcon />} label="ACTIVE" value="1" />
              <Tab id="tab1" icon={<PersonIcon />} label="REDEEMED" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
              <Box style={{ display: "flex", justifyContent: "center", margin: "50px" }}>
                  { activeTickets[0] === 0 ? <h1>No tickets found</h1> :
                      activeTickets.map((t, i) => {
                          return (
                            <div style={{ padding: "15px"}}>
                            <TicketCard
                              key={i}
                              ticketId={t.ticketId}
                              eventId={t.eventId}
                              eventName={t.eventName}
                              redeemed={t.redeemed}
                            />
                            </div>
                          )
                      })
                  }
              </Box>
          </TabPanel>
          <TabPanel value="2">
              <Box style={{ display: "flex", justifyContent: "center", margin: "50px" }}>
                  { redeemedTickets[0] === 0 ? <h1>No tickets found</h1> :
                      redeemedTickets.map((t, i) => {
                          return (
                            <div style={{ padding: "15px"}}>
                            <TicketCard
                              key={i}
                              ticketId={t.ticketId}
                              eventId={t.eventId}
                              eventName={t.eventName}
                              redeemed={t.redeemed}
                            />
                            </div>
                          )
                      })
                  }
              </Box>
          </TabPanel>
        </TabContext>
      </div>
    </div>
  );
}
