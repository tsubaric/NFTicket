## NFTicket 

NFT Ticket platform for easy event creation, transfer, redemption, and ownership


### Test Report

The test report can be found [here](docs/TestReport.md)

Step 1 cd front_end --> npm install --force

Step 2 create a new file called .env in the back_end folder then:
    1. Add INFURA_API_KEY
    2. Add DEV_PRIVATE_KEY

Step 3 cd back_end --> npx hardhat node

Step 4 cd back_end --> npx hardhat test --network localhost

Step 5 cd front_end --> firebase emulators:start 
if the port is taken go into the front_end folder and find the /firebase.json folder and change the "hosting": "port" to 5001 or whatever is available 

"emulators": {
    "database": {
      "port": 9000
    },
    "hosting": {
      "port": 5000 --> 5001
    },
}


