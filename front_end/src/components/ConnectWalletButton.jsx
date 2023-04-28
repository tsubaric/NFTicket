import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';

const ConnectWalletButton = () => {

    const [account, setAccount] = useState("");
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState("Connect Wallet");

    window.onload = () => {
        isConnected();
    }

    const connectedMessage = (accts) => {
        return accts[0].substring(2,6) + "..."
    }

    const isConnected = async () => {
        const accounts = await window.ethereum.request({method: 'eth_accounts'});
        if (accounts.length) {
            setConnected(true);
            setMessage(connectedMessage(accounts));
        }
    }


    const connectWallet = async () => {
        if (!connected) {
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            setAccount(accounts[0]);
            setConnected(true);
            setMessage(connectedMessage(accounts));
            console.log("account: " + account);
        }
    }


    return (
        <Button id="connectWallet" variant="contained" onClick={connectWallet} >
            {message}
        </Button>
    )
}


export default ConnectWalletButton;
