/// <reference types="cypress" />

describe('log-in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:19001')
    cy.get('Button').contains('Create Account').click();
  })

  it('accepts collect username, name, email, and password', () => {
    cy.get('[data-testid="authenticator__text-field__input-username"]').should('exist');
    cy.get('[data-testid="authenticator__text-field__input-email"]').should('exist');
    cy.get('[data-testid="authenticator__text-field__input-password"]').should('exist');
    cy.get('[data-testid="authenticator__text-field__input-confirm_password"]').should('exist');
    //cy.get('[data-testid="authenticator__text-field__input-name"]').should('exist');
  })
})
