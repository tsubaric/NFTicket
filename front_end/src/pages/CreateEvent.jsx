import * as React from "react";
import CreateEventForm from "../components/CreateEventForm"
import "../styles/CreateEvent.css";


export default function CreateEvent () {

  // testing the server connection -- delete this at some point
  /*
  const [data, setData] = useState({})

  React.useEffect(() => {
    fetch("http://localhost:4000/create")
    .then(res => res.json())
    .then(data => setData(data))
  }, [])
  */

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
