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

export default function MyTicketsPage() {
  const [ticketBalance, setTicketBalance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const loadOwnedTickets = async () => {
    // get address of connected wallet
    let address = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    address = address[0];

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
      }
    }
    setIsLoading(false);
  };

  const displayTickets = () => {
    const ticketCards = [];
    ticketBalance.forEach((ticket) => {
      for (let i = 0; i < ticket.balance; i++) {
        ticketCards.push(
            <Grid item xs={2} sm={2} md={2} lg={2}>
                <TicketCard
                  key={ticket.eventId + "-" + i} // just so it is unique
                  data={{
                    nameVal: ticket.eventInfo.eventName,
                  }}
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
        <Box style={{ display: "flex", justifyContent: "center", margin: "50px" }}>
          <Grid
            container
            spacing={4}
          >
            {displayTickets()}
          </Grid>
        </Box>
      </div>
    </div>
  );
}
