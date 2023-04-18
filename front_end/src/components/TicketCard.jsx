import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { transferTicket } from "../interfaces/NFTicket_interface";
import Button from "@mui/material/Button";
import { getEventImageUrl, getEventInfo } from "../interfaces/firebase_interface";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TicketCard(props) {
  const [transferOpen, setTransferOpen] = useState(false);
  const [toAddress, setToAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventInfo, setEventInfo] = useState({});


  useEffect(() => {
      if (imageUrl === "") {
          getEventImageUrl(props.eventId).then((url) => {
              setImageUrl(url);
            })
      }
  }, [imageUrl])

  useEffect(() => {
      const loadEventInfo = async () => {
          const info = await getEventInfo(props.eventId);
          console.log(info);
          setEventInfo(info);
      }
      loadEventInfo();
  }, [])


  const onSubmit = async () => {
    console.log("Transfering ticket");
    console.log(props.ticketId);
    console.log(toAddress);
    await transferTicket(props.ticketId, toAddress);
    setTransferOpen(false);
  };

    return (
      <div>
        <Card sx={{ width: 200 }}>
          <CardHeader title={eventInfo.eventName} />
          <CardMedia
            component="img"
            height="150"
            title="NFT Ticket Card"
            alt="Event Image"
            image={imageUrl}
          />
          <CardContent>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label="Transfer Ticket"
              onClick={() => setTransferOpen(true)}
            >
              <CompareArrowsIcon />
            </IconButton>
          </CardActions>
        </Card>
        <Modal
          open={transferOpen}
          onClose={() => {
            setTransferOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="form" sx={style}>
            <TextField
              id="To"
              required
              label="To"
              name="To"
              type="text"
              onChange={(e) => {
                setToAddress(e.target.value);
              }}
            />
            <Button
              id="createEventButton"
              style={{
                marginTop: "25px",
                marginBottom: "25px",
                width: "50ch",
              }}
              variant="contained"
              onClick={onSubmit}
            >
              Transfer
            </Button>
            <br />
          </Box>
        </Modal>
      </div>
    );
}
/*
return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title="NFT Event Name"
        subheader="Date"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="NFT name"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          NFT Description
        </Typography>
        <Typography>
          <b>Ticket ID:</b>
        </Typography>
        <Typography>
          <b>Stock Price:</b>
        </Typography>
        <Typography>
          <b>Ticket Avaliable:</b>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to cart">
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
*/
