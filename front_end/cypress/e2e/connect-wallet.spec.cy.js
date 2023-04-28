describe("connect wallet spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  afterEach(() => {
    cy.disconnectMetamaskWalletFromAllDapps();
    cy.resetMetamaskAccount();
  });

  it("should connect wallet with success", () => {
    cy.get("#connectWallet").click()
    cy.acceptMetamaskAccess();
    cy.get("#accounts").should(
      "have.text",
      "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
    );
  });

});
