class InventoryPage {
  elements = {
    title: () => cy.get('[data-test="title"]'),
    inventoryContainer: () => cy.get('#inventory_container'),
    inventoryItems: () =>
      this.elements.inventoryContainer().find('[data-test="inventory-item"]'),
    cartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
    cartLink: () => cy.get('[data-test="shopping-cart-link"]'),
  };

  // Adds the first `count` items and saves their names as the '@addedItems' alias
  addFirstItemsToCart(count) {
    const addedItems = [];

    this.elements
      .inventoryItems()
      .should('have.length.at.least', count)
      .each(($item, index) => {
        if (index >= count) return false;
        addedItems.push(
          $item.find('[data-test="inventory-item-name"]').text().trim()
        );
        cy.wrap($item).find('button').contains('Add to cart').click();
      });

    cy.wrap(addedItems).as('addedItems');
  }

  goToCart() {
    this.elements.cartLink().click();
  }
}

module.exports = new InventoryPage();
