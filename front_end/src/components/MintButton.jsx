import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { mintTickets } from "../interfaces/NFTicket_interface";
import { setRemAvailTickets } from "../interfaces/firebase_interface";

export default function MintButton(props) {
  const [amount, setAmount] = React.useState(0);

  const eventId = props.eventId;
  //const remAvailTickets = props.remAvailTickets;
  //const setRemAvailTickets = props.setRemAvailTickets;

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  const handleMint = async () => {
    await mintTickets(eventId, amount, props.price * amount);
    //setRemAvailTickets(remainingAvailTicketsAfter);
    //console.log("newRemAvailTickets:", remainingAvailTicketsAfter);
    //props.onSuccess(remainingAvailTicketsAfter);
  }

  return (
    <div style={{ display: "flex" }}>
      <TextField
        id="outlined-number"
        label="Amount"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={amount}
        onChange={handleChange}
        data-test="mint-button-input"
      />
      <Button
        style={{ marginLeft: "10px" }}
        variant="contained"
        onClick={handleMint}
        data-test="mint-button-submit"
      >
        Mint
      </Button>
    </div>
  );
}
