import * as React from "react";
import "./MyTicketsPage.css";
import Box from "@mui/material/Box";
import { ButtonGroup } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PersonIcon from "@mui/icons-material/Person";
import BrushIcon from "@mui/icons-material/Brush";
import Button from "@mui/material/Button";
import TicketCard from "../components/TicketCard";
import events from "../assets/festival.json";

export default function Page(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  console.log(props);
  return (
    <div clasName="main-container">
      <Button>Mint Ticket</Button>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <div className="subTicket">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 4, md: 6 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {events &&
                events.map(
                  ({
                    parentEvent,
                    category,
                    user,
                    nameVal,
                    date,
                    ticketID,
                    stockPrice,
                    description,
                    numTickets,
                  }) => {
                    if (parentEvent === props.location.state?.nameVal) {
                      return (
                        <Grid item xs={4} sm={6} md={3} key={ticketID}>
                          <TicketCard
                            data={{
                              category,
                              user,
                              nameVal,
                              date,
                              ticketID,
                              stockPrice,
                              description,
                              numTickets,
                            }}
                          />
                        </Grid>
                      );
                    }
                  }
                )}
            </Grid>
          </Box>
        </div>
      </Box>
    </div>
  );
}
