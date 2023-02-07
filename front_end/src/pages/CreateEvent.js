import * as React from "react";
import CreateEventForm from "../components/CreateEventForm"

export default function CreateEvent () {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <h2>Create Event</h2>
      <CreateEventForm />
    </div>
  );
};
