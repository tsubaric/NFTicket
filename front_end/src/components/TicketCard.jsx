import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TicketCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(props);
  return (
    <Card sx={{ maxWidth: 345 }}>
      {console.log("here")}
      <CardHeader
        // avatar={
        //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
        //     R
        //   </Avatar>
        // }
        title={props.data.nameVal}
        subheader={props.data.date}
      />
      <CardMedia
        component="img"
        height="194"
        image={require("../assets/lolla.png")}
        alt="NFT name"
      />
      <CardContent>
        {props.data.description ? (
          <Typography variant="body2" color="text.secondary">
            {props.data.description}
          </Typography>
        ) : (
          ""
        )}
        {props.data.ticketID ? (
          <Typography variant="body2" color="text.secondary">
            <b>Ticket ID: {props.data.ticketID}</b>
          </Typography>
        ) : (
          ""
        )}
        {props.data.stockPrice ? (
          <Typography variant="body2" color="text.secondary">
            <b>Ticket ID: {props.data.stockPrice}</b>
          </Typography>
        ) : (
          ""
        )}
        {props.data.numTickets ? (
          <Typography variant="body2" color="text.secondary">
            <b>Ticket ID: {props.data.numTickets}</b>
          </Typography>
        ) : (
          ""
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to cart">
          <ShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
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