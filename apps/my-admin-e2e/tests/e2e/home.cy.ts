describe('template spec', () => {
  beforeEach(() => {
  })
  it('presents an error if the user is not an Admin', () => {
    cy.login(process.env.USERNAME, process.env.PASSWORD);
    cy.visit('http://localhost:19001/')
    cy.get('h1').contains('Access Denied').should('exist');
  })
})