describe('template spec', () => {
  beforeEach(() => {
  })
  it('presents an error if the user is not an Admin', () => {
    cy.login(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
    cy.visit('http://localhost:19001/')
    cy.get('h1').contains('Access Denied').should('exist');
  })
})