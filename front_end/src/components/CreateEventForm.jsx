import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

export default class CreateEventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          eventName: '',
          eventDescription: '',
          numGATickets: '',
          gaTicketPrice: '',
        };

        this.handleCreate = this.handleCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleCreate(event) {
        alert('Creating Event: ' + this.state.eventName);
        event.preventDefault();

        // TODO: redirect to confirmation page
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name

        this.setState({
          [name]: value
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
              <TextField
                style={{
                  marginTop: '20px',
                  marginBottom: '20px',
                }}
                required
                label="Event Name"
                variant="filled"
                name="eventName"
                onChange={this.handleChange}
              />
              <TextField
                style={{
                  marginTop: '20px',
                  marginBottom: '20px'
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
              <TextField
                style={{
                  marginTop: '20px',
                  marginBottom: '20px'
                }}
                required
                label="Number of GA Tickets"
                variant="filled"
                name='numGATickets'
                onChange={this.handleChange}
              />
              <TextField
                style={{
                  marginTop: '20px',
                  marginBottom: '20px'
                }}
                required
                label="GA Ticket Price"
                variant="filled"
                name='gaTicketPrice'
                onChange={this.handleChange}
              />
              <Button
                style={{
                  marginTop: '20px',
                  marginBottom: '20px'
                }}
                variant="contained"
                onClick={this.handleCreate}
              >
                Create Event
              </Button>
            </div>
          </Box>
        );
      }
}
