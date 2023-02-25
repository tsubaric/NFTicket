const { expect } = require("chai");
const hre = require("hardhat");
const { where } = require("sequelize");

describe("NFTicket", async function () {
    it("should create an event", async function() {

        // deploy ticket contract
        const NFTicket = await hre.ethers.getContractFactory("NFTicket");
        const nfticket = await NFTicket.deploy();

        // create events
        await nfticket.createEvent(10, 1000) // price, amount
        await nfticket.createEvent(10, 1000) // price, amount

        // get last event id
        const lastEventId = await nfticket.getLastEventId();
        expect(lastEventId.toNumber()).to.equal(2)
    });

});
