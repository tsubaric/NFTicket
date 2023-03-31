import * as React from "react";
import "../styles/MyTicketsPage.css";
import Box from "@mui/material/Box";
import { ButtonGroup } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PersonIcon from "@mui/icons-material/Person";
import BrushIcon from "@mui/icons-material/Brush";
import TicketCard from "../components/TicketCard";
import events from "../assets/festival.json";
import { useState, useEffect } from "react";
import {
  getLastEventId,
  getTicketBalance,
} from "../interfaces/NFTicket_interface";
import { getEventInfo } from "../interfaces/firebase_interface";

export default function MyTicketsPage() {
  const [value, setValue] = React.useState("1");
  const [ticketBalance, setTicketBalance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loadOwnedTickets = async () => {
    // get address of connected wallet
    let address = await window.ethereum.request({ method: "eth_requestAccounts" });
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
        balances.push({ eventId: i, balance: balance, eventInfo: info[0]});
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
                <TicketCard
                  key={ticket.eventId}
                  data={{
                      nameVal: ticket.eventInfo.eventName
                  }}
                />
            );
        }
    });

    return <Grid container>{ticketCards}</Grid>;
  }

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
      <div className="tabs">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab id="tab1" icon={<PersonIcon />} label="OWNED" value="1" />
                <Tab id="tab2" icon={<BrushIcon />} label="CREATED" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="ownedNFTS">
                <Box sx={{ flexGrow: 1 }}>
                    {displayTickets()}
                </Box>
              </div>
            </TabPanel>

            <TabPanel value="2">
              <div className="createdNFTS"></div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}
