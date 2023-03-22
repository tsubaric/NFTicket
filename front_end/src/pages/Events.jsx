import React, { useState } from "react";
import Box from "@mui/material/Box";
import EventCard from "../components/EventCard";
import "../styles/Events.css";
import EventsCategorySlider from "../components/EventsCategorySlider";
import { ethers } from "ethers";
import ContractData from "../NFTicket.json";
import { ref, child, get } from "firebase/database";
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

  // TODO: get this logic working from interface
  const getEvents = async () => {
    const cur_events = []
    const lastEventId = await getLastEventId()
    console.log("last event id: " + lastEventId)
    for(let i = 0; i < lastEventId; i++) {
        const dbRef = ref(database);
        get(child(dbRef, `events/${i}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                cur_events.push(snapshot.val())
                setEvents(cur_events)
            } else {
                console.log("No data available");
            }
        })
    }
  }

  window.onload = async () => {
      await getEvents()
  }

  return (
    <div className="events">
      <EventsCategorySlider />
      <Box sx={{ width: "100%", typography: "body1"}}>
        <div className="eventsDisplay">
          <Box style={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
          }}>
            {events.map((event) => (
                <div
                    key={event.eventId}
                    style={{
                        display: "flex",
                        margin: "20px",

                    }}
                >
                    <EventCard
                        key={event.eventId}
                        name={event.eventName}
                        description={event.eventDescription}
                    />
                </div>
            ))}
          </Box>
        </div>



      </Box>
    </div>
  );
};
export default Events;
