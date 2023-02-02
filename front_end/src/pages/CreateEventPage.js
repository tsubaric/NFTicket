import * as React from "react";
import "./CreateEvent.css";
import { CreateEventForm } from "../components/CreateEventForm"

const CreateEventPage = () => {
  return (
    <div className="create-event">
      <h1>Create Event</h1>
      <CreateEventForm />
    </div>
  );
};
export default CreateEventPage;