import * as React from "react";
import "../styles/dashboard.css";
import ConnectWalletButton from "./ConnectWalletButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Dashboard = (props) => {
  return (
    <nav data-test="nav-bar" className={`dashboard-1 ${props.className || ""}`}>
      <p>NFTicket</p>

      <Button variant="text" href="/">
        <Typography variant="h6"  sx={{ flexGrow: 1, color: "white"}}>
            Home
        </Typography>
      </Button>

      <Button variant="text" href="/events">
        <Typography variant="h6"  sx={{ flexGrow: 1, color: "white"}}>
            Events
        </Typography>
      </Button>

      <Button variant="text" href="/tickets">
        <Typography variant="h6"  sx={{ flexGrow: 1, color: "white"}}>
            My Tickets
        </Typography>
      </Button>

      <Button variant="text" href="/owned-events">
        <Typography variant="h6"  sx={{ flexGrow: 1, color: "white"}}>
            My Events
        </Typography>
      </Button>

      <Button variant="text" href="/create">
        <Typography variant="h6"  sx={{ flexGrow: 1, color: "white"}}>
            Create
        </Typography>
      </Button>

      <ConnectWalletButton />
    </nav>
  );
};
export default Dashboard;
