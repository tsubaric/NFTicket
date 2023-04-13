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
import { getAllOwnedTickets } from "../interfaces/NFTicket_interface";

export default function MyTicketsPage() {
  const [ownedTickets, setOwnedTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedTickets, setDisplayedTickets] = useState([]);


  async function loadTickets() {
    const tickets = await getAllOwnedTickets()
    console.log("tickets: ", tickets);
    setOwnedTickets([...ownedTickets, tickets]);

    setIsLoading(false);
  }

  useEffect(() => {
    loadTickets();
  }, []);

  if (isLoading) return <div>Loading...</div>;
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
                {ownedTickets.map((ticket) => {
                    console.log(ticket.ticketId);
                    return (
                        <TicketCard
                            key={ticket.ticketId}
                            eventName={"event name here"}
                            eventImage={null}
                        />
                    );
                })}
            </Box>
        </TabContext>
      </div>
    </div>
  );
}
