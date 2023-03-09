import React, { useState } from "react";
import Box from "@mui/material/Box";
import EventCard from "../components/EventCard";
import "./Events.css";
//import EventsCategorySlider from "../components/EventsCategorySlider";
import { ethers } from "ethers";
import ContractData from "../NFTicket.json";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

const Events = () => {
  const [events, setEvents] = useState([]);

  // TODO: get this logic working from interface
  const getLastEventId = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const NFTicketAbi = ContractData.abi;
    const NFTicketAddress = ContractData.address;
    console.log("using contract: " + NFTicketAddress)
    const NFTicketContract = new ethers.Contract(NFTicketAddress, NFTicketAbi, signer)

    const eventId = Number(await NFTicketContract.getLastEventId())
    return eventId
  }

  const getEvents = async () => {
    const cur_events = []
    const lastEventId = await getLastEventId()
    console.log("last event id: " + lastEventId)
    for(let i = 0; i < lastEventId; i++) {
      const eventRef = ref(database, "events/" + i);
      onValue(eventRef, (snapshot) => {
        const data = snapshot.val();
        cur_events.push(data)
      });
    }
    setEvents(cur_events)
  }

  window.onload = async () => {
      await getEvents()
      console.log(events)
  }

  return (
    <div className="events">
      <Box sx={{ width: "100%", typography: "body1"}}>

        {events.map((event) => (
            <EventCard
                key={event.eventId}
                name={event.eventName}
                description={event.eventDescription}
            />
        ))}


      </Box>
    </div>
  );
};
export default Events;
