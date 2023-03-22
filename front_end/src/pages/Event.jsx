import React, { useEffect } from "react";
import "../styles/MyTicketsPage.css";
import Box from "@mui/material/Box";
import MintButton from "../components/MintButton";
import Lollapng from "../assets/lolla.png";
import { useParams } from "react-router-dom";
import { getEventInfo } from "../interfaces/firebase_interface";

export default function Event() {
  const { eventId } = useParams();
  const [eventInfo, setEventInfo] = React.useState({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = React.useState(true);

  const updateEventInfo = async () => {
    getEventInfo(eventId).then((eventInfo) => {
      console.log("eventInfo: ", eventInfo);
      setEventInfo({
        name: eventInfo.eventName,
        description: eventInfo.eventDescription,
      });
    });
  };

  useEffect(() => {
    updateEventInfo();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main-contain">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img alt="" src={Lollapng} width={200} height={200}></img>
        <div>
          {
            <div>
              <h1>{eventInfo.name}</h1>
            </div>
          }
          <h1 style={{ paddingTop: "20px", fontWeight: "normal" }}>
            {eventInfo.eventName}
          </h1>
          <div>
            <MintButton eventId={eventId} />
          </div>
        </div>
      </div>

      <br />
      <Box
        sx={{
          width: "100%",
          height: 5,
          backgroundColor: "black",
        }}
      />
    </div>
  );
}
