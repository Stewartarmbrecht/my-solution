// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

export {};

// cypress/support/index.ts
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in.  Will reuse the user session if already logged in.
       * @example cy.login('stewbbb', 'password');
       */
      login(user: string, password: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (user, password) => {
  cy.session([user, password], () => {
    cy.visit('http://localhost:19001/')
    cy.get('[data-testid="authenticator__text-field__input-username"]').type('stewbbb');
    cy.get('[data-testid="authenticator__text-field__input-password"]').type('QcI814u2');
    cy.get('Button').contains('Sign in').click();
    cy.get('h1').contains('Posts').should('exist');
  })
})