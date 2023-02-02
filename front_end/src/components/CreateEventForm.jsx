import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'

export function CreateEventForm () {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField 
          required 
          id="event-name-input" 
          label="Event Name" 
          variant="filled" 
        />
        <TextField 
          required 
          multiline 
          minRows={3} 
          maxRows={10}
          id="event-description-input" 
          label="Description" 
          variant="filled" 
        />
      </div>
      <Button variant="contained">Create Event</Button>
    </Box>
  );
}
