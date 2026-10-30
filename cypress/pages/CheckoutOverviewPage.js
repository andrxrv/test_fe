class CheckoutOverviewPage {
  elements = {
    title: () => cy.get('[data-test="title"]'),
    itemNames: () => cy.get('[data-test="inventory-item-name"]'),
    finishButton: () => cy.get('#finish'),
  };

  finish() {
    this.elements.finishButton().click();
  }
}

module.exports = new CheckoutOverviewPage();
