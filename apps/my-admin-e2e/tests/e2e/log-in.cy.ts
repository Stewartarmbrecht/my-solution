/// <reference types="cypress" />

describe('log-in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:19001')
  })

  it('accepts user name and password', () => {
    cy.get('[data-testid="authenticator__text-field__input-username"]').should('exist');
    cy.get('[data-testid="authenticator__text-field__input-password"]').should('exist');
  })
  it('includes a link for forgotten password', () => {
    cy.get('Button').contains('Forgot Password?').should('exist');
  })
  it('doe not include a link to create a new account', () => {
    cy.get('Button').contains('Create Account').should('exist');
  })
  it('includes a button to sign in', () => {
    cy.get('Button').contains('Sign in').should('exist');
  })
  it('successfully logs in the user', () => {
    cy.get('[data-testid="authenticator__text-field__input-username"]').type(process.env.USERNAME);
    cy.get('[data-testid="authenticator__text-field__input-password"]').type(process.env.PASSWORD);
    cy.get('Button').contains('Sign in').click();
    //cy.wait(5000);
    cy.get('h1').contains('Posts').should('exist');
  })
})
