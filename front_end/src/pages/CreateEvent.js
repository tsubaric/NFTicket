import * as React from "react";
import CreateEventForm from "../components/CreateEventForm"
import "./CreateEvent.css";


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
      <div className="createeventLabel">Create Event</div>
      <CreateEventForm />
    </div>
  );
};
