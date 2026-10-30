describe('Smoke', () => {
  it('loads the login page', () => {
    cy.visit('/');
    cy.title().should('eq', 'Swag Labs');
  });
});
