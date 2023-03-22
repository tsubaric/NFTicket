import React, { useEffect } from "react";
import "../styles/MyTicketsPage.css";
import Box from "@mui/material/Box";
import MintButton from "../components/MintButton";
import Lollapng from "../assets/lolla.png";
import { useParams } from "react-router-dom";

export default function Event(props) {
  console.log(props);

  const { eventId } = useParams();
  console.log("eventId: ", eventId);
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
