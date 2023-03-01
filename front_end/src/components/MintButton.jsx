import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { ethers } from 'ethers';
import ContractData from '../NFTicket.json';

export default function MintButton(props) {

    const [amount, setAmount] = React.useState(0);

    const handleChange = (event) => {
        setAmount(event.target.value);
    };

    const mintTicket = async (eventId, amount) => {
        // TODO: find a way to localize this
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const NFTicketAbi = ContractData.abi;
        const NFTicketAddress = ContractData.address;

        const NFTicketContract = new ethers.Contract(NFTicketAddress, NFTicketAbi, signer)

        // mint the ticket
        // TODO: get ticket price from Contract -- right now tickets are just free
        // TODO: mint transaction

        const response = await NFTicketContract.mintGATickets(eventId, amount)
        console.log(response)
    }

    return (
        <div>
        <TextField
            id="outlined-number"
            label="Amount"
            type="number"
            InputLabelProps={{
            shrink: true,
            }}
            variant="outlined"
            value={amount}
            onChange={handleChange}
        />
        <Button variant="contained" onClick={() => mintTicket(4, amount)}>
            Mint
        </Button>
        </div>
    );

}
