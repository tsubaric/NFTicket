describe("Event Interaction", () => {

    // create events to target
    before(() => {
        cy.visit("/create");

        // connect wallet
        cy.contains("Connect Wallet");
        cy.get('[data-test="connect-wallet"]').click();
        cy.acceptMetamaskAccess();

        // create event
        cy.get('[data-test="event-name-field"]').type("test event");
        cy.get('[data-test="event-description-field"]').type("test event description");
        cy.get('[data-test="num-tickets-field"]').type(100);
        cy.get('[data-test="ticket-price-field"]').type(10);
        cy.get('[data-test="category-dropdown"]').click().get('[data-test="virtual-category"]').click();
        cy.get('[data-test="upload-image-icon"]').click();
        cy.get('input[type="file"]').parent().selectFile('cypress/fixtures/image.jpg')
        cy.get('[data-test="create-event-submit-button"]').click();
        cy.confirmMetamaskTransaction().should("include", { confirmed: true });

          /*
          -{ recipientPublicAddress: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
          -  networkName: 'hardhat',
          -  customNonce: '12',
          -  confirmed: true }
          */

        // TODO: verify event created in DB
        cy.wait(1000); // wait for event to be created

    })

    // disconnect wallet, reset account
    after(() => {
        cy.disconnectMetamaskWalletFromAllDapps();
        cy.resetMetamaskAccount();
    })


    it("should show created events on events page", () => {
        cy.visit("/events");

        // displays created event
        cy.contains("test event");
        cy.contains("test event description");

        // TODO: make sure image is displayed
    })

    it("should let user search events", () => {
        cy.visit("/events");

        // search for created event
        cy.get('[data-test="events-search-bar"]').type("test event");
        cy.contains("test event").should("be.visible");

        // search for non-existent event
        cy.get('[data-test="events-search-bar"]').clear().type("non-existent event");
        cy.contains("Your query did not return any results").should("be.visible");
    })

    it("should let user filter events", () => {
        cy.visit("/events");

        // filter by category
        cy.get('[data-test="events-category-select"]').click().get('[data-test="virtual-category"]').click();
        cy.get('[data-test="events-filter-button"]').click();
        cy.contains("test event").should("be.visible");

        // filter by non-existent category
        cy.get('[data-test="events-category-select"]').click().get('[data-test="festivals-category"]').click();
        cy.get('[data-test="events-filter-button"]').click();
        cy.should('not.contain', "test event");
    })

    it("should go to event page when event is clicked", () => {
        cy.visit("/events");

        // click on event
        cy.contains("test event").should("be.visible");
        //cy.get('[data-test="event-card-1"]').click();
        cy.contains("test event").click();

        cy.location("pathname").should("include", "/event/1");

    })

    it("should display event details on event page", () => {
        // navigate to the events page like a user would
        cy.visit("/events");
        cy.contains("test event").click();

        // wait for event details to load
        cy.wait(1000);

        // displays event details
        cy.contains("test event");
        cy.contains("test event description");
        cy.contains("Available Tickets: 100");
        cy.contains("Ticket Price: 0.00536 ETH");

        // TODO: make sure image is displayed

    })


    it("should let user buy, transfer, and redeem tickets", () => {
        // navigate to the events page like a user would
        cy.visit("/events");
        cy.contains("test event").click();

        // mint 2 tickets
        cy.get('[data-test="mint-button-input"]').type('{backspace}2');
        cy.get('[data-test="mint-button-submit"]').click();
        cy.confirmMetamaskTransaction().should("include", { confirmed: true });

        // verify tickets show up on user's profile
        cy.visit("/tickets");
        cy.wait(3000); // wait for tickets to be loaded

        // should have two tickets for test event
        cy.get('[data-test="ticket-card"]').should("have.length", 2);

        // redeem ticket
        cy.get('[data-test="redeem-ticket-button"]').first().click();
        cy.get('[data-test="redeem-qr-display"]').should("be.visible");

        cy.reload();

        // transfer a ticket
        cy.get('[data-test="transfer-ticket-button"]').first().click();
        cy.get('[data-test="to-address-input"]').type("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
        cy.get('[data-test="transfer-submit-button"]').click();
        cy.confirmMetamaskTransaction().should("include", { confirmed: true });
        cy.wait(3000); // wait for ticket to be transferred

        cy.reload();
        cy.wait(3000); // wait for tickets to be loaded

        // should only have 1 ticket now
        cy.get('[data-test="ticket-card"]').should("have.length", 1);
    })

})
