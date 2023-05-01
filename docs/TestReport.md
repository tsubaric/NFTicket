<div align="center">

### NFTicket
##### Team 3: Thomas Butler, Jordyn Iannuzzelli, Tommy Subaric, Mark Brom 

##### ECE:4890, ECE Senior Design 

##### Final Project Documentation and Test Report


</div>

<br>
<br>

#### Introduction

Digital Ticketing is an industry that is rife with problems. Scalpers billions from 
event goers, souvenir tickets are gone, and replaced with a email printout with some 
qr code on it. Transferring tickets you bought can be a nightmare, and there is no way 
to prevent scams from taking place when digital tickets are resold. NFTicket looks to solve
these problems by leveraging smart contract on Ethereum, to represent digital tickets as NFTs. 
NFTs, or Non-Fungible Tokens, are unique digital identifiers that are used to certify ownership
and authenticity. By representing digital tickets in this way, NFTickets allows users to very 
easily create ticket-gated events, purchase tickets for those event, and transfer tickets to 
any Ethereum compatible wallet. Furthermore, because of the way NFTs work, mechanisms can be 
put into place to prevent resellers from selling fake or already redeemed tickets, as well 
as pay royalties back to the original creator on each resell. 

#### Project Outcome 

Overall, the outcome of the project was a success. The core design constraints were met, 
users can create events, purchase tickets, redeem tickets, and transfer tickets on our 
website. The event information is stored in a Firebase database, with the smart contract 
acting as the source of truth, storing low level event information, handling ticket ids, mint, 
transfer, and redemption. We did change from ERC-721 to ERC-1155 token standards to allow for 
easier batch transfers of tickets, and we ended up using a NoSQL database instead of an SQL 
database because it made more sense once we started building. Unfortunately, we did fall short 
of our goal to provide a local wallet for the user, instead opting for MetaMask as our 
wallet provider. This means that users will need to have a MetaMask wallet already in order
to interact with our website. It should be noted, however, that the concept of providing 
wallets for users with something as simple as a username and password is a new concept 
in Ethereum, and not very many solutions yet exist for it. Even as we were working on this 
project, Ethereum ERC-4337 was introduced, providing account abstraction, 
which aims to solve the same problem that we were trying to solve. 

Because of the lack of Ethereum development experience across the team, Thomas worked on the smart 
contract and overall design of the project, including back-end hosting and database, as well as front 
end components. Mark, Tommy, and Jordyn contributed to building the front-end, as well as writing 
documentation and reports. 

Throughout this process, the team utilized various project management skills and process to 
ensure the completion of the project. 
1. Planning: we created a detailed project plan, and tracked progress and tasks using Jira. This 
helped us learn how to manage multiple different tasks, and deadlines in a team environment. 
2. Communication: we communicated regularly, and made sure to help each other out. There was  
a learning curve for everyone, so working together was important to make sure everyone stayed 
on the same page. 
3. Risk Management: the team identified potential risks and roadblocks that could affect 
the projects success, and took decisive actions to mitigate those risks and keep the project on track. 
4. Time Management: the team learned how to schedule and prioritize tasks, it was important 
to prioritize tasks so that nobody was holding anyone else back. If a task needed to be completed
before another task could be worked on, we made sure that it was done first. 

Overall, the project management skills and process that we developed were extremely helpful in 
ensuring the success of the project. These skills helps use to stay organized, focused, and on 
track throughout the project, and I think will be invaluable going forward in our careers as 
engineers. 

The Github contribution history can be seen below. It should be noted that not everyone 
was initially able to contribute as much due to different levels of experience with the technologies
used. Thomas has the most experience with Ethereum development, as well as software engineering in 
general, as the other team members have not taken higher level software engineering courses. The rest of the 
team struggled to understand the tools and technologies being used, which led to a significantly lower contribution 
history. 

 - trbutler4: Thomas Butler 
 - jiannuzzelli: Jordyn Iannuzzelli 
 - mjbrom: Mark Brom 
 - tsubaric, tjsubaric: Tommy Subaric 

![GitHub Contribution History](images/github-contribution-final.png)
<div align="center"><b> Figure 1: Github Contribution History </b></div>

#### Design Documentation 

**Design Concept**

The initial design concept was actually much more complex than what we ended up doing. At first, 
it was expected that we would have an overarching embedded user wallet. This was eventually 
axed in favor of users using a MetaMask wallet, as user owned wallets are the current standard 
for Ethereum applications, and MetaMask is the most common one. This allowed for a much simpler
user interface, and gave us more time to focus on more essential features. Our final design came 
about through trial and error, as we learned more and built more, we had to be decisive about was 
was working and what was not. Through this decisiveness we were able to focus on the essential aspects
and deliver a simpler, more user friendly design. While it does not have all of the features 
initially planned, and does solve the problem and meets the specification.

**Analysis of Possible Solutions and Trade Offs**

Initially, we had planned to represent tickets using the ERC-721 standard. After further 
review, we decided to switch to the ERC-1155 token standard. This is a relatively small change, 
but it allowed us to mint and transfer multiple tickets at a time, and also allows for more 
flexibility in the ticket design going forward. This is because ERC-1155 tokens can be either 
fungible, or non-fungible, while ERC-721 tokens are strictly non-fungible. Also, the question of 
how to store event information was not so simple. In smart contracts, there is a trade off between 
how much data your contract uses, and how much that contract actually costs to deploy. The same 
thing goes with transactions. The more data and logic that a smart contract method must process, 
the more expensive that transaction becomes. However, if no data is stored in the contract, 
than some of the benefits of its immutability are lost. The trade off we landed on was to store 
essential information in the smart contract, such as event and ticket ids, as well as ticket and 
event owners and ticket redemption status in the contract. The rest of the data, such as the event 
data, name, description, and other information can be stored in the database. This way, event 
creators can easily update this information at no cost, while the core event functionality is 
kept decentralized and immutable with the smart contract. 

**Constraints**

The constraints we set out to satisfy in our project proposal were as follows:

1. The system shall run on any web browser.
2. The system shall ensure that transactions complete in under 1 minute, at little  
or no cost to the user. 
3. The system shall be compatible with any EVM compatible network. 

In order to accomplish the first constraint, we created a React app using Material UI, with 
Firebase hosting and database. These tools are considered to be some of the best, and 
easily work on any browser. Constraints 2 and 3 were met by writing our smart contract in 
Solidity, and deploying to Polygon. This ensures that transactions are quick and cheap. Also, we 
followed ERC standards for tokens, which ensures EVM compatibility. 


**Standards** 

We followed ERC-1155 token standard for our digital tickets. This is different than our original 
plan to use ERC-721 token standard, and the reason for switching is discussed above. QR code for 
redemption is ISO 27001 compliant. User wallets are Ethereum accounts, and a user can import any 
wallet into MetaMask to use with our site.

**Architecture**

![Architecture](images/architecture.png)
<div align="center"><b> Figure 2: Project Architecture </b></div>
<br>

**UI/UX**

![](images/homepage.png)
<div align="center"><b> Figure 3: Home Page </b></div>
<br>

The homepage is where users land. From here, they can connect their wallet, and begin interacting with events.

![](images/createEventPage.png)
<div align="center"><b> Figure 4: Create Event Page </b></div>
<br>

This is the page users see when they want to create a new event. They can enter the event name, description, number 
of tickets, ticket price, and event category.

![](images/eventsPage.png)
<div align="center"><b> Figure 5: Events Page </b></div>
<br>

This Page shows all created events. From here, a user can search for different events, and filter them based on 
their category. Clicking on an event will bring the user to the event page, where they can purchase a ticket. 

![](images/eventPage.png)
<div align="center"><b> Figure 6: Event Page </b></div>
<br>

Each event will have an associated event page, where the user can see the event information, and purchase a 
ticket by entering the amount, and clicking the mint button. This will give the user a Metamask popup asking them 
to confirm the transaction, and once they do the smart contract will create the ticket and send it to their wallet.

![](images/myTicketsPage.png)
<div align="center"><b> Figure 7: My Tickets Page </b></div>
<br>

This page is where the user can see all their owned tickets. From here, users can transfer or redeem the tickets they own.

![](images/transferDialog.png)
<div align="center"><b> Figure 8: Transferring Ticket Dialgue </b></div>
<br>

When a user clicks the transfer button on a ticket they own, they will be presented with this dialogue. The transfer 
only requires a valid Ethereum address. This means that the tickets can be sent to anyone with an Ethereum wallet, 
regardless of whether they have ever used the NFTicket platform. No signup required!

![](images/ticket-redemption.png)
<div align="center"><b> Figure 9: Ticket Redemption </b></div>
<br>

When a user clicks the redeem button on an owned ticket, they will be presented with a QR code. This QR code can then 
be scanned, transacting with the smart contract to mark that ticket as redeemed.  

**Maintenance** 

Currently, the smart contract supports up to 999 events, and each event can have up to 99999999 tickets. 
In order to increase this number, the contract will need to be modified, but this should be enough for 
now. The contract can be redeployed if need be to reset the events and tickets, and the previous
will still exist, however the database will overwrite old event information. The site needs to be hosted,
and there is a data limit with Firebase. Other than that, there is no maintenance needed once the 
contract is deployed on chain.

#### Test Report 

For testing, we employed two different tools. For testing our smart contract, we used Hardhat, which is 
an Ethereum development environment which includes a locally hosted node. Hardhat lets use write tests 
in JavaScript, and test on the local Ethereum network. For testing our front end, we used Cypress.
In order to test the Metamask integration, we used a tool called synpress, which is a cypress plugin.
This allows us to set up a wallet with metamask, and sign transactions with it in our tests. Hardhat 
tests are unit tests, and cypress tests are end to end integration tests.

| Requirement                                           |Test Type  | Test Tool | Test Result |
| ------------                                          |-----------|---------- | ----------- |
| Contract can create events                            | Unit      | Hardhat   | Pass        |
| Contract can mint tickets                             | Unit      | Hardhat   | Pass        |
| Contract can redeem tickets                           | Unit      | Hardhat   | Pass        |
| Contract returns tickets owned by user                | Unit      | Hardhat   | Pass        | 
| Contract can transfer tickets                         | Unit      | Hardhat   | Pass        | 
| Users can create an event                             | end-to-end| Cypress   | Manual Testing Required |
| Created events should be displayed on events page     | end-to-end| Cypress   | Pass        | 
| Users can search events                               | end-to-end| Cypress   | Pass        | 
| Users can filter events                               | end-to-end| Cypress   | Pass        | 
| Event page should display event details               | end-to-end| Cypress   | Pass        | 
| User can buy tickets                                  | end-to-end| Cypress   | Pass        | 
| User can transfer tickets                             | end-to-end| Cypress   | Pass        | 
| User can redeem tickets                               | end-to-end| Cypress   | Pass        | 

<div align="center"> <b>Figure 10: Requirement Traceability Matrix </b></div>
<br>


The majority of the end to end testing with cypress worked. However, there is an issue with cypress connecting 
to our firebase real time database. This is noted in the traceability matrix, with manual testing required, and we 
verified that this functionality works by creating the event manually. In the test coverage below, it can be seen that 
the CreateEventForm component has very low test coverage. This is because of the issue with cypress and firebase, 
which unfortunately was not able to be resolved before this report was due. 
Thankfully, the realtime database is only used to store event information like the event description images, and 
most of our data comes from the smart contract itself. Because of this, even though the cypress tests were unable 
to store the event information, all the smart contract logic with Metamask was still fully testable simply by 
seeding the database with the correct event information before the tests were run.

![](images/hardhat-coverage.png)
<div align="center"><b> Figure 11: Hardhat Test Coverage </b></div>
<br>

![](images/cypress-coverage.png)
<div align="center"><b> FIgure 12: Cypress Test Coverage </b></div>
<br>


#### Appendices 

[Source Code](https://github.com/trbutler4/NFTicket)




