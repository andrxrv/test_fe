class CheckoutCompletePage {
  elements = {
    title: () => cy.get('[data-test="title"]'),
    completeHeader: () => cy.get('[data-test="complete-header"]'),
  };
}

module.exports = new CheckoutCompletePage();
