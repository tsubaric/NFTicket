import ContractData from "../NFTicket.json"
import { Contract, BrowserProvider } from "ethers";

const provider = new BrowserProvider(window.ethereum);

const NFTicketAbi = ContractData.abi;

const NFTicketAddress = ContractData.address;

const getContractRef = async () => {
  const signer = await provider.getSigner();
  return new Contract(NFTicketAddress, NFTicketAbi, signer);
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

export const mintTickets = async (eventId, amount, priceETH) => {
    const contractRef = await getContractRef()
    const transaction = await contractRef.mintTickets(eventId, amount, {value: priceETH});
    console.log("waiting for transaction to be confirmed...");
    const receipt = await transaction.wait();
    console.log("transaction confirmed");
    return receipt;
}

export const getAllOwnedTickets = async () => {
    const contractRef = await getContractRef()
    return await contractRef.getAllOwnedTickets()
}

export const getAllOwnedEvents = async () => {
    const contractRef = await getContractRef()
    return await contractRef.getAllOwnedEvents()
}

export const getTicketInfo = async (ticketId) => {
    const contractRef = await getContractRef()
    const ticket = await contractRef.getTicketInfo(ticketId)
    return {
        eventId: Number(ticket[0]),
        ticketId: Number(ticket[1]),
        redeemed: ticket[2],
        owner: ticket[3],
    }
}

export const transferTicket = async (ticketId, to) => {
  const contractRef = await getContractRef();
  const from = await provider.getSigner();
  console.log(from.address);
  const transaction = await contractRef.transferTicket(ticketId, to);
  console.log("waiting for transaction to be confirmed...");
  await transaction.wait();
  console.log("transaction confirmed");
};

export const getTicketUri = async (ticketId) => {
    const contractRef = await getContractRef()
    return await contractRef.uri(ticketId)
}

export const getRemAvailTickets = async (eventId) => {
    const contractRef = await getContractRef()
    return Number(await contractRef.getRemainingAvailTickets(eventId));
}

export const getTicketPriceUSD = async (eventId) => {
    const contractRef = await getContractRef()
    return Number(await contractRef.getTicketPriceUSD(eventId));
}

export const getTicketPriceETH = async (eventId) => {
    const contractRef = await getContractRef()
    const gweiPrice = Number(await contractRef.getTicketPriceETH(eventId));
    //console.log(gweiPrice / 1000000000);
    return gweiPrice /// 1000000000;
}
