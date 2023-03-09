//import * as React from "react";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./Events.css";
import EventsCategorySlider from "../components/EventsCategorySlider";
const Events = () => {


  return (
    <div className="events">
      < EventsCategorySlider />
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
