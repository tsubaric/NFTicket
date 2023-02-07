const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("Ticket", function () {
    it("should mint tickets", async function() {
        const owner = await ethers.getSigners();

        // deploy ticket contract
        const metadata_uri = "https://bafybeig3yuyqfnpqf4jse4d5beuy2kahe2plmpox47dzmpntkkg5ulv72e.ipfs.w3s.link/ticket_metadata.json"
        const Ticket = await hre.ethers.getContractFactory("Ticket");
        const ticket = await Ticket.deploy(metadata_uri, ethers.utils.parseEther("0.1"));

        // mint a ticket 
        await ticket.mintGeneralAdmission(1, {'value': ethers.utils.parseEther("0.1")});
        expect(ticket.balanceOf(owner, 0)).to.be >= 1;
    });

});
