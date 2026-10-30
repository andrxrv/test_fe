class CartPage {
  elements = {
    title: () => cy.get('[data-test="title"]'),
    cartItems: () =>
      cy.get('[data-test="cart-list"]').find('[data-test="inventory-item"]'),
    itemNames: () => cy.get('[data-test="inventory-item-name"]'),
    itemQuantities: () => cy.get('[data-test="item-quantity"]'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
  };

  checkout() {
    this.elements.checkoutButton().click();
  }
}

module.exports = new CartPage();
