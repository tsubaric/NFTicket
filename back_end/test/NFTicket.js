const { expect } = require("chai");
const hre = require("hardhat");
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config")

describe("NFTicket", async function() {
    let nfticket; // reference to the contract

    beforeEach(async function() {
        const chainId = hre.network.config.chainId;
        let priceFeedAddress;
        if (developmentChains.includes(hre.network.name)) {
            const DECIMALS = "8"  // expecting 8 decimals for ETH price
            const INITIAL_PRICE = "200000000000" // 2000 USD to 8 decimals

            const mockV3AggregatorFactory = await ethers.getContractFactory("MockV3Aggregator")
            const mockV3Aggregator = await mockV3AggregatorFactory.deploy(DECIMALS, INITIAL_PRICE)

            priceFeedAddress = mockV3Aggregator.address;
        } else {
            priceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
        }

        // deploy NFTicket contract
        const NFTicket = await hre.ethers.getContractFactory("NFTicket");
        nfticket = await NFTicket.deploy(priceFeedAddress);
        await nfticket.deployed();
    })

    it("should let a user create an event", async function() {
        [user] = await ethers.getSigners();

        // create event
        const amount = 1000;
        const price = 10;
        const tx = await nfticket.createEvent(amount, price) // amount, price
        await tx.wait()

        // get event info from contract
        const lastEventId = await nfticket.getLastEventId();
        const eventInfo = await nfticket.getEventInfo(lastEventId);

        // verify event information is correct
        expect(eventInfo.eventId).to.equal(lastEventId);
        expect(eventInfo.ticketAmount).to.equal(amount);
        expect(eventInfo.ticketPriceUSD).to.equal(price);
        expect(eventInfo.ticketsAvailable).to.equal(amount);
        expect(eventInfo.eventOwner).to.equal(user.address);

    });

    it("should convert USD price to ETH", async function() {
        const tx = await nfticket.createEvent(1000, 75); // ticket price $75
        await tx.wait();

        const lastEventId = await nfticket.getLastEventId();

        // with eth price of $2000 / 1 ETH -> expect ticket to be 0.0375 ETH
        const priceETH = await nfticket.getTicketPriceETH(lastEventId);
        console.log(Number(priceETH))
        expect(priceETH).to.equal(3750000)
    });

    it("should let a user mint tickets", async function () {
        // create event
        await nfticket.createEvent(1000, 10);
        await nfticket.createEvent(1000, 10); // want to event id to be nonzero

        // mint a ticket
        [user] = await ethers.getSigners();
        let tx = await nfticket.mintTickets(1, 3, {value: 3750000 * 3}) // buying 3 from first event
        await tx.wait();
        tx = await nfticket.mintTickets(2, 2, {value: 3750000 * 2}); // buying 2 tickets from second event
        await tx.wait();

        // check user balance
        const ownedTickets = await nfticket.getAllOwnedTickets();

        // get event info
        const lastEventId = await nfticket.getLastEventId();
        const firstEventInfo = await nfticket.getEventInfo(lastEventId - 1);
        const secondEventInfo = await nfticket.getEventInfo(lastEventId);

        // get ticket info
        const ticketInfo = await nfticket.getTicketInfo(2000001);

        // ticket id of form    000 | 00000000
        //                  event id    ticket id
        expect(ownedTickets.length).to.equal(5);
        expect(ownedTickets[0].toNumber()).to.equal(1000000);
        expect(ownedTickets[4].toNumber()).to.equal(2000001);
        expect(firstEventInfo.ticketsAvailable).to.equal(997);
        expect(secondEventInfo.ticketsAvailable).to.equal(998);
        expect(ticketInfo.owner).to.equal(user.address);

    })

    it("should let a user redeem tickets", async function () {
        // create event
        await nfticket.createEvent(1000, 10);

        // mint a ticket
        [user, otherUser] = await ethers.getSigners();
        const tx = await nfticket.mintTickets(1, 1, {value: 3750000});
        await tx.wait();

        // git ticket info
        let ticketInfo = await nfticket.getTicketInfo(1000000);
        // should start with redeemed = false
        expect(ticketInfo.redeemed).to.equal(false);

        // another user tries to redeem ticket
        await expect(nfticket.connect(otherUser).redeemTicket(1000000))
            .to.be.revertedWith("Only the ticket owner can redeem a ticket");
        ticketInfo = await nfticket.getTicketInfo(1000000);
        expect(ticketInfo.redeemed).to.equal(false);

        // owner should be able to redeem ticket
        await nfticket.redeemTicket(1000000);
        ticketInfo = await nfticket.getTicketInfo(1000000);
        expect(ticketInfo.redeemed).to.equal(true);

    })

    it("should return owned tickets", async function () {
        await nfticket.createEvent(1000, 10);

        let ownedTickets = await nfticket.getAllOwnedTickets();
        expect(ownedTickets.length).to.equal(0);

        // mint some tickets
        [user, otherUser] = await ethers.getSigners();
        const tx = await nfticket.mintTickets(1, 3, {value: 3750000 * 3});
        await tx.wait();

        // get owned tickets
        ownedTickets = await nfticket.getAllOwnedTickets();
        expect(ownedTickets.length).to.equal(3);
        expect(ownedTickets[0].toNumber()).to.equal(1000000);
        expect(ownedTickets[2].toNumber()).to.equal(1000002);
    })

    it("should return owned events", async function () {
        await nfticket.createEvent(1000, 10);

        let ownedEvents = await nfticket.getAllOwnedEvents();
        expect(ownedEvents.length).to.equal(1);
    })



    it("should transfer tickets", async function () {
        await nfticket.createEvent(1000, 10);

        // mint some tickets
        [user, otherUser] = await ethers.getSigners();
        let tx = await nfticket.mintTickets(1, 3, {value: 3750000 * 3});
        await tx.wait();
        tx = await nfticket.connect(otherUser).mintTickets(1, 2, {value: 3750000 * 2});
        await tx.wait();

        // balance before transfer
        let userBalance = await nfticket.getAllOwnedTickets();
        let otherUserBalance = await nfticket.connect(otherUser).getAllOwnedTickets();

        expect(userBalance.length).to.equal(3);
        expect(otherUserBalance.length).to.equal(2);

        // transfer 1 ticket to other user
        const transferedTicketId = userBalance[0].toNumber();
        tx = await nfticket.transferTicket(transferedTicketId, otherUser.address);
        await tx.wait();

        // balance after transfer
        userBalance = await nfticket.getAllOwnedTickets();
        otherUserBalance = await nfticket.connect(otherUser).getAllOwnedTickets();

        expect(userBalance.length).to.equal(2);
        expect(otherUserBalance.length).to.equal(3);

        // check ticket ownership
        let ticketInfo = await nfticket.getTicketInfo(transferedTicketId);
        expect(ticketInfo.owner).to.equal(otherUser.address);

        // that ticket should not be in user's balance
        expect(userBalance.includes(transferedTicketId)).to.equal(false);

        // ticket was transferred to other user
        expect(await nfticket.balanceOf(otherUser.address, transferedTicketId)).to.equal(1);



    })

    it("should show remaining tickets", async function () {
        await nfticket.createEvent(1000, 10);

        // mint some tickets
        [user] = await ethers.getSigners();
        let tx = await nfticket.mintTickets(1, 3, {value: 3750000});
        await tx.wait();

        // check remaining
        const numTicketsRem = await nfticket.getRemainingAvailTickets(1);
        expect(numTicketsRem).to.equal(997);
    })


});
