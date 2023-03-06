import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function EventCard(props) {
  const theme = useTheme();

  return (
    <Card sx={{ display: 'flex'}}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={require("../assets/lolla.png")}
        alt="NFT name"
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
        {props.data.nameVal}
        <br></br>
        {props.data.description ? (
          <Typography variant="body2" color="text.secondary">
            {props.data.description}
          </Typography>
        ) : (
          "Description Test"
        )}
        </CardContent>
      </Box>
    </Card>
  );
}