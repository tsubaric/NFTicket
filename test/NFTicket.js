const { expect } = require("chai");
const hre = require("hardhat");

describe("NFTicket", async function() {
    let nfticket; // reference to the contract

    beforeEach(async function() {
        // deploy NFTicket contract
        const NFTicket = await hre.ethers.getContractFactory("NFTicket");
        nfticket = await NFTicket.deploy();
        await nfticket.deployed();
    })

    it("should let a user create an event", async function() {

        // create event
        const tx = await nfticket.createEvent(1000, 10) // amount, price
        await tx.wait()

        // get event info from contract
        const lastEventId = await nfticket.getLastEventId();
        const ticketsAvailable = await nfticket.getTicketsAvailable(lastEventId);
        const ticketPrice = await nfticket.getTicketPrice(lastEventId);

        expect(lastEventId).to.equal(1);  // events start at id 1
        expect(ticketsAvailable).to.equal(1000);
        expect(ticketPrice).to.equal(10);

    });

    it("should let a user mint tickets", async function () {
        // create event
        await nfticket.createEvent(1000, 10);
        await nfticket.createEvent(1000, 10); // want to event id to be nonzero

        // mint a ticket
        [user] = await ethers.getSigners();
        let tx = await nfticket.mintTickets(1, 3) // buying 3 from first event
        await tx.wait();
        tx = await nfticket.mintTickets(2, 2); // buying 2 tickets from second event
        await tx.wait();

        // check user balance
        const ownedTickets = await nfticket.getAllOwnedTickets();
        //for (let i = 0; i < ownedTickets.length; i++){
            //console.log(ownedTickets[i].toNumber());
        //}

        // ticket id of form    000 | 00000000
        //                  event id    ticket id
        expect(ownedTickets.length).to.equal(5);
        expect(ownedTickets[0].toNumber()).to.equal(1000000);
        expect(ownedTickets[4].toNumber()).to.equal(2000001);



    })

});
