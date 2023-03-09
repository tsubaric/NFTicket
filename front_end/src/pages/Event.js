import React, { useEffect } from "react";
import "./MyTicketsPage.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TicketCard from "../components/TicketCard";
import events from "../assets/festival.json";
import MintButton from "../components/MintButton";
import Lollapng from "../assets/lolla.png";

export default function Event(props) {
  console.log(props);
  return (
    <div className="main-contain">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img alt="" src={Lollapng} width={200} height={200}></img>
        <div>
          <h1 style={{ paddingTop: "20px", fontWeight: "normal" }}>
            Event
          </h1>
          <div>
            <MintButton />
          </div>
        </div>
      </div>

      <br />
      <Box
        sx={{
          width: "100%",
          height: 5,
          backgroundColor: "black",
        }}
      />
      <br />
      <Box sx={{ width: "100%", typography: "body1" }}></Box>
    </div>
  );
}
