import React, { useEffect } from "react";
import "../styles/MyTicketsPage.css";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { getEventInfo } from "../interfaces/firebase_interface";
import { Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { getEventImageUrl } from "../interfaces/firebase_interface";
import {
    getRemAvailTickets,
} from "../interfaces/NFTicket_interface";
import RedeemTicketScanner from "../components/RedeemTicketScanner";
import "../styles/Event.css"

export default function OwnedEvent() {
  const { eventId } = useParams();
  const [eventInfo, setEventInfo] = React.useState({
    name: "",
    availableTickets: 0,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [remAvailTickets, setRemAvailTickets] = React.useState(true);
  const [imageUrl, setImageUrl] = React.useState("");

  // load image url
  useEffect(() => {
    if (imageUrl === "") {
      getEventImageUrl(eventId).then((url) => {
        setImageUrl(url);
      })
    }
  }, [imageUrl])

  // load available tickets
  useEffect(() => {
    loadAvailableTickets().then(() => {
      updateEventInfo();
    })
  }, [remAvailTickets]);

  // query contract for available tickets
  const loadAvailableTickets = async () => {
    const availableTickets = await getRemAvailTickets(eventId);
    setRemAvailTickets(availableTickets)
    console.log("available tickets: ", availableTickets)
  }

  const updateEventInfo = async () => {
    getEventInfo(eventId).then((eventInfo) => {
      console.log("eventInfo: ", eventInfo);
      setEventInfo({
        name: eventInfo.eventName,
        availableTickets: remAvailTickets
      });
    });
    setIsLoading(false);
  };



  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="main-contain">
      <Box
        sx={{
          width: "90%",
          marginLeft: "5%",
          marginRight: "5%",
          height: 410,
          backgroundColor: blue[100],
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
          marginTop: 5,

        }}
      >
        <div style={{ display: "flex" }}>
          <img
            id="event-image"
            alt=""
            src={imageUrl}
            width={410}
            height={410}
            justifyContent="left"
            style={{ marginTop: 20, marginBottom: 20 }}

          />
          <div>
            <div style={{ marginLeft: 70, marginTop: 45, marginRight: 70 }}>
              <Typography variant="h1" component="div" gutterBottom>
                <div
                    style={{
                        color: "black",
                        fontFamily: "Roboto",
                        fontSize: 50,
                        fontWeight: "bold"
                    }}
                >
                  {eventInfo.name}
                </div>
              </Typography>
              <RedeemTicketScanner />
            </div>
          </div>
        </div>
      </Box>

    </div>
  );
}
