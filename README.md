## NFTicket 
NFT Ticket platform for easy event creation, transfer, redemption, and ownership

### Test Report
The test report can be found [here](docs/TestReport.md)

## Running this on your own Computer 
## Setting up Metamask
First go here --> https://metamask.io/download/ and download METAMASK for your browser.
Once you have the Metamask extension:
1) "Select a network"
2) Click on "Add network" which navigate you to a METAMASK web tab.
3) Networks > Add a network > Add a network manually
   Enter the following:
   + Network name: localhost
   + New RPC URL: http://127.0.0.1:8545/
   + Chain ID: 31337
   + Currency symbol: ETH

*** If you run npm ... and it says "bash npm: command not found" you can navigate to 'https://nodejs.org/en' and download the right version of Node.js for your computer. 
After successfully downloading npm (Node.js) you can run --> $ npm audit fix --force

-- How to get Infura ID
-- How to get DEV ID
-- What to enter to get localhost as Metamask thing. 

Step 1: Remove package-lock.json and node_modules in the front_end folder --> $ cd front_end
    1. $ rm -f package-lock.json
    2. $ rm -rf node_modules
    3. $ npm install --force

*** To check that you correctly downloaded everything you can run $ npm start
This should send you to a React App on localhost:3000 in your browser. 
*** If it is giving you an error about "babel-loader" run this command with the correct versions you need $ npm install --save-exact @cypress/code-coverage@3.12.19 @cypress/webpack-preprocessor@6.0.1 babel-loader@9.1.2 react-scripts@5.0.1

Step 2: Create a new file called .env in the back_end folder then:
    1. Add INFURA_API_KEY=...
    2. Add DEV_PRIVATE_KEY=...

Step 3 cd back_end --> npm install --save-dev hardhat ... then ... npx hardhat node

Step 4 cd back_end --> npx hardhat test --network localhost

Step 5 cd front_end --> firebase emulators:start 
if the port is taken go into the front_end folder and find the /firebase.json folder and change the "hosting": "port" to 5001 or whatever is available 

firebase command not found ? sudo npm install -g firebase-tools
Make sure you have the correct version of Java installed JDK 11+

"emulators": {
    "database": {
      "port": 9000
    },
    "hosting": {
      "port": 5000 --> 5001
    },
}
