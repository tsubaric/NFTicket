describe("connect wallet", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  afterEach(() => {
    cy.disconnectMetamaskWalletFromAllDapps();
    cy.resetMetamaskAccount();
  });

  it("should connect wallet with success", () => {
    cy.contains("Connect Wallet");
    cy.get('[data-test="connect-wallet"]').click();
    cy.acceptMetamaskAccess();
    cy.reload();  // reload so account is updated on button
    cy.get('[data-test="connect-wallet"]').should("have.text", "f39f...");
  });

});
