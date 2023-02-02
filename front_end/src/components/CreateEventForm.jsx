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
        <TextField id="standard-basic" label="Event Name" variant="standard" />
      </div>
      <Button variant="contained">Create Event</Button>
    </Box>
  );
}
