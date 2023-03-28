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


const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const updateEvents = async () => {
    const cur_events = [];
    const lastEventId = await getLastEventId();
    console.log("last event id: " + lastEventId);
    for (let i = 0; i < lastEventId; i++) {
      const dbRef = ref(database);
      await get(child(dbRef, `events/${i}`)).then((snapshot) => {
        if (snapshot.exists()) {
          cur_events.push(snapshot.val());
          setEvents(cur_events);
        } else {
          console.log("No data available");
        }
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    updateEvents();
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
