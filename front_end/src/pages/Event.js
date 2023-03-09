import React, { useEffect } from "react";
import "./MyTicketsPage.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TicketCard from "../components/TicketCard";
import events from "../assets/festival.json";
import MintButton from "../components/MintButton";
import { getDatabase, ref, onValue } from "firebase/database";
import Lollapng from "../assets/lolla.png"

export default function Page(props) {
  useEffect(() => {
    const db = getDatabase();
    const dbEventsRef = ref(db, 'events/');
    onValue(dbEventsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
    });
  }, [])

  console.log(props);
  return (
    <div className="main-contain"  >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img alt="" src={Lollapng} width={200} height={200}></img>
        <div>
          <h1 style={{ paddingTop: "20px", fontWeight: "normal" }}>{props.location.state.nameVal}</h1>
          <div >
            <MintButton />
          </div>
        </div>
      </div>

      <br />
      <Box
        sx={{
          width: "100%",
          height: 5,
          backgroundColor: 'black',
        }}
      />
      <br />
      <Box sx={{ width: "100%", typography: "body1" }}>
        <div className="subTicket">
          <Box sx={{ flexGrow: 1 }} style={{ overflow: 'auto', height: "50ch" }}>
            <Grid
              container
              spacing={{ xs: 4, md: 6 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {events &&
                events.map(
                  ({
                    parentEvent,
                    category,
                    user,
                    nameVal,
                    date,
                    ticketID,
                    stockPrice,
                    description,
                    numTickets,
                  }) => {
                    if (parentEvent === props.location.state?.nameVal) {
                      return (
                        <Grid item xs={4} sm={6} md={3} key={ticketID}>
                          <TicketCard
                            data={{
                              category,
                              user,
                              nameVal,
                              date,
                              ticketID,
                              stockPrice,
                              description,
                              numTickets,
                            }}
                          />
                        </Grid>
                      );
                    }
                  }
                )}
            </Grid>
          </Box>
        </div>
      </Box>
    </div>
  );
}
