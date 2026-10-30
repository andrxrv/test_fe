class LoginPage {
  elements = {
    usernameInput: () => cy.get('#user-name'),
    passwordInput: () => cy.get('#password'),
    loginButton: () => cy.get('#login-button'),
    errorMessage: () => cy.get('[data-test="error"]'),
  };

  visit() {
    cy.visit('/');
  }

  typeUsername(username) {
    this.elements.usernameInput().type(username);
  }

  typePassword(password) {
    this.elements.passwordInput().type(password, { log: false });
  }

  clickLogin() {
    this.elements.loginButton().click();
  }

  login(username, password) {
    this.visit();
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
  }
}

module.exports = new LoginPage();
