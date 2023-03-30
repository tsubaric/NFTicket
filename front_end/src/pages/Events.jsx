import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import EventCard from "../components/EventCard";
import "../styles/Events.css";
import EventsCategorySlider from "../components/EventsCategorySlider";
import { getLastEventId } from "../interfaces/NFTicket_interface";
import { ref, get, child } from "firebase/database";
import { database } from "../firebase";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import EventsCategoryCar from "../components/EventsCategoryCar";
import { updateEvents } from "../interfaces/firebase_interface";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getEvents() {
      let eventData = await updateEvents();
      setEvents(eventData);
      setIsLoading(false);
    }
    getEvents();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="events">
      <EventsCategoryCar />

      {/* <EventsCategorySlider /> */}
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
            {events.length > 0 &&
              events.map((event) => (
                <div
                  style={{
                    display: "flex",
                    margin: "20px",
                  }}
                  key={event.eventId}
                >
                  <EventCard
                    key={event.eventId}
                    eventId={event.eventId}
                    name={event.eventName}
                    description={event.eventDescription}
                    thumbnail={event.thumbnail}
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
