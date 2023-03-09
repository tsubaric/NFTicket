import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./Events.css";
//import EventsCategorySlider from "../components/EventsCategorySlider";
import { ethers } from "ethers";
import ContractData from "../NFTicket.json";


const Events = () => {

  // TODO: get this logic working from interface
  const getLastEventId = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const NFTicketAbi = ContractData.abi;
    const NFTicketAddress = ContractData.address;
    const NFTicketContract = new ethers.Contract(NFTicketAddress, NFTicketAbi, signer)

    const eventId = Number(await NFTicketContract.getLastEventId())
    console.log(eventId)
    return eventId
  }

  getLastEventId()


  return (
    <div className="events">
      <Box sx={{ width: "100%", typography: "body1"}}>
        <div className="nftGrid">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 4, md: 6 }}
              columns={{ xs: 4, sm: 8, md: 10 }}
              alignItems="center"
              justifyContent="center"
            >


            </Grid>
          </Box>
        </div>
      </Box>
    </div>
  );
};
export default Events;
