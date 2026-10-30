class CheckoutInfoPage {
  elements = {
    title: () => cy.get('[data-test="title"]'),
    firstNameInput: () => cy.get('#first-name'),
    lastNameInput: () => cy.get('#last-name'),
    postalCodeInput: () => cy.get('#postal-code'),
    continueButton: () => cy.get('#continue'),
  };

  fillInformation({ firstName, lastName, postalCode }) {
    this.elements.firstNameInput().type(firstName);
    this.elements.lastNameInput().type(lastName);
    this.elements.postalCodeInput().type(postalCode);
  }

  continue() {
    this.elements.continueButton().click();
  }
}

module.exports = new CheckoutInfoPage();
