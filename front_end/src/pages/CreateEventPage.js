import * as React from "react";
import "./CreateEvent.css";
import { CreateEventForm } from "../components/CreateEventForm"

const CreateEventPage = () => {
  return (
    <div className="create-event">
      <h2>Create Event</h2>
      <CreateEventForm />
    </div>
  );
};
export default CreateEventPage;