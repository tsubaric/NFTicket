import * as React from "react";
import CreateEventForm from "../components/CreateEventForm"
import { useState } from "react";

export default function CreateEvent () {

  // testing the server connection -- delete this at some point  
  const [data, setData] = useState({})
  
  React.useEffect(() => {
    fetch("http://localhost:4000/create")
    .then(res => res.json())
    .then(data => setData(data))
  }, [])

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
      <p>{data.test}</p>
      <CreateEventForm />
    </div>
  );
};
