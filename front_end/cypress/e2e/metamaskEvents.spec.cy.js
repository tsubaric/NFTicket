describe("connect wallet", () => {

  it("should connect wallet with success", () => {
    cy.visit("/");

    // connect wallet
    cy.contains("Connect Wallet");
    cy.get('[data-test="connect-wallet"]').click();
    cy.acceptMetamaskAccess();

    cy.reload();  // reload so account is updated on button
    cy.get('[data-test="connect-wallet"]').should("have.text", "f39f...");

    // disconnect wallet, reset account
    cy.disconnectMetamaskWalletFromAllDapps();
    cy.resetMetamaskAccount();
  });

  it("should let metamask user create an event", () => {
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

    // disconnect wallet, reset account
    cy.disconnectMetamaskWalletFromAllDapps();
    cy.resetMetamaskAccount();
  });



});
