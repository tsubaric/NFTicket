//import * as React from "react";
import React, { useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import "./Events.css";
import polygon1 from "../assets/polygon1.svg";
import polygon2 from "../assets/polygon2.svg";
// import Dashboard from "./components/dashboard";
const Events = () => {
  const propsData = {
    dashboard: {
      dashboard: {
        createEvent: "Create Event\n\n",
        search: "search",
        myTickets: "My Tickets\n",
        connectWallet: "Connect Wallet",
        events: "Events\n",
      },
    },
    
  };
  const [imageSrc, setimageSrc] = useState("");

  //event handling for category clicks
  const handleClick = (e) => {
    
    //console.log(e.target.alt);
    if (e.target.alt === "Resturants") {
      console.log("Resturants");
      document.getElementsByClassName("categoryLabel")[0].innerHTML = "Resturants";
      document.getElementsByClassName("nftGrid")[0].style.visibility = "visible";

    }
    if (e.target.alt === "Festivals") {
      console.log("Festivals");
      document.getElementsByClassName("categoryLabel")[0].innerHTML = "Festivals";
    }
    if (e.target.alt === "Sports") {
      console.log("Sports");
      document.getElementsByClassName("categoryLabel")[0].innerHTML = "Sports";
    }
    

  };
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Resturants',
      id:"resturants",
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Festivals',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Sports',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Travel',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Charity',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'virtual',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Health & Wellness',
    },
    
  
  ];
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  return (
    <div className="events">
      {/* <Dashboard className="dashboard-instance-2" {...propsData.dashboard} /> */}
      <span className="view-by-category">Events by Category</span>
      

      <ImageList sx={{ gridAutoFlow: "column", gridAutoColumns: "minmax(400px, 1fr)", width: 1400, height: 320 }}cols={3} >
      <ImageListItem key="Subheader" cols={3}>
      </ImageListItem>
      {itemData.map((item) => (
        <button onClick={(e) => { handleClick(e);}}>
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
        </button>
      ))}
    </ImageList>
      


    <label className="categoryLabel" ></label>

<div className="nftGrid" >
    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={{ xs: 4, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(Array(12)).map((_, index) => (
          <Grid item xs={4} sm={6} md={6} key={index}>
            <Item id="nftItems">NFT</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
    {/*
      <div className="flex-container-1" >
        <span>TOP</span>
        <span>TRENDING</span>
      </div>
      <div className="flex-container-2">
        <input className="rectangle-5" type="text" />
        <input className="rectangle-12" type="text" />
      </div>
      <div className="flex-container-3">
        <input className="rectangle-6" type="text" />
        <input className="rectangle-11" type="text" />
      </div>
      <div className="flex-container-4">
        <input className="rectangle-7" type="text" />
        <input className="rectangle-10" type="text" />
      </div>
      <div className="flex-container-5">
        <input className="rectangle-8" type="text" />
        <input className="rectangle-9" type="text" />
      </div>
        */}
    </div>
  );
};
export default Events;
