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
import { getAllOwnedTickets } from "../interfaces/NFTicket_interface";
import { getTicketInfo } from "../interfaces/NFTicket_interface";

export default function MyTicketsPage() {
  const [ownedTickets, setOwnedTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const loadOwnedTickets = async () => {
    // load all the tickets that the user owned
    getAllOwnedTickets().then((tickets) => {
        setOwnedTickets(tickets);
        setIsLoading(false);
    });
  };


  useEffect(() => {
    console.log("loading owned tickets...");
    loadOwnedTickets();
    console.log("owned tickets: ", ownedTickets);
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
            <Box style={{ display: "flex", justifyContent: "center", margin: "50px" }}>
              <Grid
                container
                spacing={4}
              >
                {ownedTickets.map((ticket) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                        <TicketCard
                            key={ticket.ticketId}
                            eventName={"event name here"}
                            eventImage={null}
                        />
                        </Grid>
                    );
                })}
              </Grid>
            </Box>
        </TabContext>
      </div>
    </div>
  );
}
