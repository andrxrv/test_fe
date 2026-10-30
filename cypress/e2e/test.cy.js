const loginPage = require('../pages/LoginPage');
const inventoryPage = require('../pages/InventoryPage');
const cartPage = require('../pages/CartPage');
const checkoutInfoPage = require('../pages/CheckoutInfoPage');
const checkoutOverviewPage = require('../pages/CheckoutOverviewPage');
const checkoutCompletePage = require('../pages/CheckoutCompletePage');

describe('test', () => {
  beforeEach(() => {
    cy.fixture('users').then(({ standard }) => {
      loginPage.login(standard.username, standard.password);
    });

    cy.location('pathname').should('eq', '/inventory.html');
    inventoryPage.elements.title().should('have.text', 'Products');
  });

  it('test', () => {
    // Step 2: Add the first 2 items to the cart
    inventoryPage.addFirstItemsToCart(2);

    inventoryPage.elements.cartBadge().should('have.text', '2');

    // Step 3: Go to the cart and validate items and quantities
    inventoryPage.goToCart();

    cy.location('pathname').should('eq', '/cart.html');
    cartPage.elements.title().should('have.text', 'Your Cart');
    cartPage.elements.cartItems().should('have.length', 2);
    cartPage.elements.itemQuantities().each(($qty) => {
      expect($qty.text().trim()).to.eq('1');
    });
    cy.get('@addedItems').then((addedItems) => {
      cartPage.elements.itemNames().should(($names) => {
        const names = [...$names].map((el) => el.innerText.trim());
        expect(names).to.deep.eq(addedItems);
      });
    });

    // Step 4: Fill in the checkout information
    cartPage.checkout();

    cy.location('pathname').should('eq', '/checkout-step-one.html');
    checkoutInfoPage.elements
      .title()
      .should('have.text', 'Checkout: Your Information');
    checkoutInfoPage.fillInformation({
      firstName: 'Andres',
      lastName: 'Reyes',
      postalCode: '12345',
    });
    checkoutInfoPage.continue();

    // Step 5: Review the order and finish
    cy.location('pathname').should('eq', '/checkout-step-two.html');
    checkoutOverviewPage.elements.title().should('have.text', 'Checkout: Overview');
    cy.get('@addedItems').then((addedItems) => {
      checkoutOverviewPage.elements.itemNames().should(($names) => {
        const names = [...$names].map((el) => el.innerText.trim());
        expect(names).to.deep.eq(addedItems);
      });
    });
    checkoutOverviewPage.finish();

    // Step 6: Validate the order was completed
    cy.location('pathname').should('eq', '/checkout-complete.html');
    checkoutCompletePage.elements.title().should('have.text', 'Checkout: Complete!');
    checkoutCompletePage.elements
      .completeHeader()
      .should('have.text', 'Thank you for your order!');
  });
});
