import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import OwnedEventCard from "../components/OwnedEventCard";
import "../styles/Events.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { getEventImageUrl, getEventInfo } from "../interfaces/firebase_interface";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { getAllOwnedEvents } from "../interfaces/NFTicket_interface";

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getOwnedEvents() {

      // get owned event ids
      const ownedEvents = await getAllOwnedEvents();

      let ownedEventData = [];
      for (let i = 0; i < ownedEvents.length; i++) {
        //const eventInfo = await getEventInfo(ownedEvents[i]);
        const eventId = Number(ownedEvents[i]);
        let eventInfo = await getEventInfo(eventId);
        const eventImageUrl = await getEventImageUrl(eventId);
        eventInfo["eventImageUrl"] = eventImageUrl;
        console.log(eventInfo);
        ownedEventData.push(eventInfo);
      }


      setEvents(ownedEventData);
      setIsLoading(false);
    }
    getOwnedEvents();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="events">
      <FormControl
        sx={{
          minWidth: 120,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
      </FormControl>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <div className="eventsDisplay" key="eventsDisplay">
          <Box
            style={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
            }}
            key="eventsBox"
          >
            {!events?.length
              ? "Your query did not return any results"
              : events.map((event) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        margin: "20px",
                      }}
                      key={event.eventId}
                    >
                      <OwnedEventCard
                        key={event.eventId}
                        eventId={event.eventId}
                        name={event.eventName}
                        description={event.eventDescription}
                        category={event.category}
                        data-test={`event-card-${event.eventId}`}
                      />
                    </div>
                  );
                })}
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default MyEvents;
