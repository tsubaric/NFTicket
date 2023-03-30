import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import EventCard from "../components/EventCard";
import "../styles/Events.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import EventsCategoryCar from "../components/EventsCategoryCar";
import { updateEvents } from "../interfaces/firebase_interface";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState({
    query: "",
    displayList: [],
  });
  const handleChange = (e) => {
    const results = events.filter((post) => {
      if (e.target.value === "") return events;
      return post.eventName
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setState({
      query: e.target.value,
      displayList: results,
    });
  };
  useEffect(() => {
    async function getEvents() {
      let eventData = await updateEvents();
      setEvents(eventData);
      setState({
        query: "",
        displayList: eventData,
      });
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
      <input
        type="search"
        value={state.query}
        onChange={handleChange}
        placeholder="Search"
        className="searchBar"
      />
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
            {!state.displayList?.length
              ? "Your query did not return any results"
              : state.displayList.map((event) => {
                  return (
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
                  );
                })}
            {/* {events.length > 0 &&
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
              ))} */}
          </Box>
        </div>
      </Box>
    </div>
  );
};
export default Events;
