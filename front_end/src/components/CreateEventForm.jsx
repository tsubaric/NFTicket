import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { ethers } from "ethers";

export default class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      eventDescription: "",
      numGATickets: "",
      gaTicketPrice: "",
      eventId: 0,
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleCreate(event) {
    alert("Creating Event: " + this.state.eventName);
    event.preventDefault();

    // TODO: redirect to confirmation page

    // determine event id and create event
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const NFTicketAbi = require("../NFTicket.json").abi

    const NFTicketContract = new ethers.Contract("0xAe07D479744B6C39d6F3421D1D534B18eDCd44F6", NFTicketAbi, signer)
    const response = await NFTicketContract.createEvent(10, 10000) // price, amount
    console.log(response)
    const eventId = await NFTicketContract.getLastEventId()
    console.log("eventId: ", Number(eventId))
    this.setState({["eventId"]: Number(eventId)}, () => {
        // call server method to upload metadata and generate new URI
        axios.post("http://localhost:4000/create", this.state).then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
    });

  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }


    render() {
        return (
          <Box
            stlye={{justifyContent:'center', alignItems:'center'}}
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems:'center',

              }}
            >
              <TextField id="eventName"
                style={{
                  marginTop: '25px',
                  marginBottom: '25px',
                  width: '50ch',
                }}
                required
                label="Event Name"
                variant="filled"
                name="eventName"
                onChange={this.handleChange}
              />
              <TextField id="eventDescription"
                style={{
                  marginTop: '25px',
                  marginBottom: '25px',
                  width: '50ch'
                }}
                required
                multiline
                minRows={3}
                maxRows={10}
                label="Description"
                variant="filled"
                name='eventDescription'
                onChange={this.handleChange}
              />
              <TextField id="numGATickets"
                style={{
                  marginTop: '25px',
                  marginBottom: '25px',
                  width: '50ch'
                }}
                required
                label="Number of GA Tickets"
                variant="filled"
                name='numGATickets'
                onChange={this.handleChange}
              />
              <TextField id="gaTicketPrice"
                style={{
                  marginTop: '25px',
                  marginBottom: '25px',
                  width: '50ch'
                }}
                required
                label="GA Ticket Price"
                variant="filled"
                name='gaTicketPrice'
                onChange={this.handleChange}
              />
              <Button id="createEventButton"
                style={{
                  marginTop: '25px',
                  marginBottom: '25px',
                  width: '50ch'
                }}
                variant="contained"
                onClick={this.handleCreate}
              >
                Create
              </Button>
            </div>
          </Box>

        )}
}
