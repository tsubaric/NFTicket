import * as React from "react";
import Button from "@mui/material/Button";
import { redeemTicket } from "../interfaces/NFTicket_interface";

export default function Redeem(props) {
    const [redeemed, setRedeemed] = React.useState(false);

    const ticketId = props.match.params.ticketId;

    const eventId = props.match.params.eventId;

    if(!redeemed) {
        redeemTicket(ticketId).then((res) => {
            console.log(`redeemed ticket: ${ticketId}`);
            setRedeemed(true);
            window.location.href = `/owned-event/${eventId}`;
        })
    }

    return (<></>);
}
