import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

export default class CreateEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      eventDescription: ''
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCreate(event) {
    alert('Creating Event: ' + this.state.eventName);
    event.preventDefault();
  }
  
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name

    this.setState({
      [name]: value
    });

    console.log(this.state.eventName);
    console.log(this.state.eventDescription);
  }


  render() {
    return (
      <Box
        stlye={{justifyContent:'center', alignItems:'center'}}
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div 
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems:'center'
          }}
        >
          <TextField 
            style={{
              marginTop: '20px',
              marginBottom: '20px'
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
          <Button 
            style={{
              marginTop: '20px',
              marginBottom: '20px'
            }}
            variant="contained"
          >
            Create Event
          </Button>
        </div>
      </Box>
    );
  }
}

