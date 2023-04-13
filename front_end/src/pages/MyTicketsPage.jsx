import * as React from "react";
import "../styles/MyTicketsPage.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TicketCard from "../components/TicketCard";
import { useState, useEffect } from "react";
import TabContext from "@mui/lab/TabContext";
import PersonIcon from "@mui/icons-material/Person";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import { getAllOwnedTickets, getTicketInfo } from "../interfaces/NFTicket_interface";

export default function MyTicketsPage() {
  const [ownedTickets, setOwnedTickets] = useState([]);


  async function loadTickets() {
    // get ticket ids of owned tickets
    const tickets = await getAllOwnedTickets();
    const promises = tickets.map((ticket) => {
        {
            return getTicketInfo(Number(ticket))
        }
    })
    const ownedTickets = await Promise.all(promises)
    console.log("found owned tickets: ", ownedTickets)
    setOwnedTickets(ownedTickets)
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
            <Box style={{ display: "flex", justifyContent: "center", margin: "50px" }}>
                { ownedTickets[0] === 0 ? <h1>No tickets found</h1> :
                    ownedTickets.map((t, i) => {
                        return (
                            <>
                          <TicketCard
                            key={i}
                            eventName={t.ticketId}
                            eventId={0}
                            owned={true}
                          />
                            </>
                        )
                    })
                }
            </Box>
        </TabContext>
      </div>
    </div>
  );
}
