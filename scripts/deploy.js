// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

    // deploy Ticket contract
    const NFTicket = await hre.ethers.getContractFactory("NFTicket");
    const nfticket = await NFTicket.deploy();
    //console.log(nfticket)
    await nfticket.deployed();
    console.log(
    `NFTicket contract deployed to ${nfticket.address}`
    );

    const network = hre.network.name;
    console.log(`network: ${network}`);
        // write contract address to front end
    const fs = require('fs');
    const contractInfo = {
        address: nfticket.address,
        abi: nfticket.interface.format('json')
    }
    fs.writeFile("./front_end/src/NFTicket.json", JSON.stringify(contractInfo) , function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });



}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
