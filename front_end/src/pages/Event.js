import * as React from "react";
import EventCard from "../components/EventCard"

export default function Event () {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h2>Event Card</h2>
      <EventCard />
    </div>
  );
};

