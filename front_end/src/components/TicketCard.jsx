import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { transferTicket } from "../interfaces/NFTicket_interface";
import Button from "@mui/material/Button";

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
  const [amount, setAmount] = useState(0);
  const onSubmit = async () => {
    await transferTicket(props.eventId, amount, props.address, toAddress);
    setTransferOpen(false);
  };

  if (props.owned === true) {
    return (
      <div>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader title={props.eventName} />
          <CardMedia
            component="img"
            height="194"
            image={props.eventImage}
            alt="NFT name"
          />
          <CardActions disableSpacing>
            <IconButton aria-label="add to cart">
              <ShoppingCartIcon />
            </IconButton>
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
              id="From"
              required
              label="From"
              name="From"
              type="text"
              value={props.address}
              disabled={true}
            />
            <br />
            <TextField
              id="eventId"
              required
              label="Event ID"
              name="eventId"
              type="text"
              value={props.eventId}
              disabled={true}
            />
            <br />
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
            <br />
            <TextField
              id="Amount"
              required
              label="Amount"
              name="Amount"
              type="number"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <br />
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
  } else {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={props.eventName} />
        <CardMedia
          component="img"
          height="194"
          image={props.eventImage}
          alt="NFT name"
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to cart">
            <ShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
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
