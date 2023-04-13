import ContractData from "../NFTicket.json"
import { ethers, wait } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);

const NFTicketAbi = ContractData.abi;

const NFTicketAddress = ContractData.address;

const getContractRef = async () => {
  const signer = await provider.getSigner();
  return new ethers.Contract(NFTicketAddress, NFTicketAbi, signer);
};

export const createEvent = async (ticketAmount, ticketPrice) => {
    const contractRef = await getContractRef()
    const transaction = await contractRef.createEvent(ticketAmount, ticketPrice);
    console.log("waiting for event to be created...");
    const receipt = await transaction.wait();
    console.log("event created");
    return receipt;
}

export const getLastEventId = async () => {
  const contractRef = await getContractRef();
  return Number(await contractRef.getLastEventId());
};

export const getTicketBalance = async (address, eventId) => {
    const contractRef = await getContractRef()
    const balance = await contractRef.balanceOf(address, eventId)
    return Number(balance)
}

export const mintTickets = async (eventId, amount) => {
    const contractRef = await getContractRef()
    const transaction = await contractRef.mintTickets(eventId, amount);
    console.log("waiting for transaction to be confirmed...");
    const receipt = await transaction.wait();
    console.log("transaction confirmed");
    return receipt;
}

export const getAllOwnedTickets = async () => {
    const contractRef = await getContractRef()
    const response = await contractRef.getAllOwnedTickets()
    const tickets_with_info = [];
    response.map(async ticket => {
        tickets_with_info.push(await getTicketInfo(ticket))
    })
    return tickets_with_info;
}

export const getTicketInfo = async (ticketId) => {
    const contractRef = await getContractRef()
    const ticket = await contractRef.getTicketInfo(ticketId)
    return {
        ticketId: Number(ticket[0]),
        redeemed: ticket[1],
        owner: ticket[2],
    }
}

export const transferTicket = async (eventId, amount, from, to) => {
  const contractRef = await getContractRef();
  return contractRef.safeTransferFrom(from, to, eventId, amount, "0x00");
};
