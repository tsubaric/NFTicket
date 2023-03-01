import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { database } from "../firebase.js";
import { ref, set, get } from "firebase/database";
import { ethers } from "ethers";
import ContractData from "../NFTicket.json"
import { Web3Storage } from 'web3.storage'

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
    const NFTicketAbi = ContractData.abi;
    const NFTicketAddress = ContractData.address;
    const NFTicketContract = new ethers.Contract(NFTicketAddress, NFTicketAbi, signer)
    var response = await NFTicketContract.createEvent(this.state.gaTicketPrice, this.state.numGATickets) // price, amount
    console.log(response)
    const eventId = Number(await NFTicketContract.getLastEventId())
    console.log("eventId: ", eventId)  // verifying correct event id
    console.log("numGATickets: ", Number(await NFTicketContract.getGATicketsAvailable(eventId))) // verifying correct number of tickets
    console.log("gaTicketPrice: ", Number(await NFTicketContract.getGATicketsPrice(eventId))) // verifying correct ticket price

    // write metadata to ipfs and set ipfs uri in contract
    const metadata = {
        "name": this.state.eventName,
        "description": this.state.eventDescription,
        "image": null, // TODO: upload image to ipfs put link here,
        "properties": {
            "ticketType": "GA",
        }
    }
    console.log(metadata)
    const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' })
    const metadata_file = new File([blob], `${eventId}.json`)

    const accessToken = process.env.REACT_APP_WEB3STORAGE_TOKEN
    const client = new Web3Storage({ token: accessToken })

    // get current uris
    const current_cid = (await get(ref(database, "metadata/live_cid"))).val().cid
    console.log(`current cid: ${current_cid}`)
    response = await client.get(current_cid)
    console.log(`Got a response! [${response.status}] ${response.statusText}`)
    if (!response.ok) {
        throw new Error(`failed to get ${cid} - [${response.status}] ${response.statusText}`)
    }
    const files = await response.files()


    // add new file and upload
    files.push(metadata_file)
    const cid = await client.put(files)
    console.log(cid)


    // TODO: set ipfs uri in contract
    response = await NFTicketContract.setEventUri(`https://${cid}.ipfs.w3s.link/{id}.json`)


    // write to database
    this.setState({["eventId"]: eventId}, () => {
        // update events
        console.log(`adding to events/${eventId} wtih state: ${JSON.stringify(this.state)}`);
        set(ref(database, "events/" + this.state.eventId), this.state);

        // update metadata cid
        console.log(`updating metadata/live_cid with ${cid}`);
        set(ref(database, "metadata/live_cid"), {cid: cid});
    });

    alert("Event Created" + this.state.eventName);
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
                name="numGATickets"
                type="number"
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
                name="gaTicketPrice"
                type="number"
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
