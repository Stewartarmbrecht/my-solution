/// <reference types="cypress" />

describe('posts', () => {
  beforeEach(() => {
    cy.login('stewbbb', 'QcI814u2');
    cy.visit('http://localhost:19001/')
  })

  it('can add new todo items', () => {
    // We'll store our item text in a variable so we can reuse it
    const newPost = 'This is a test'

    cy.get('[data-testid=new-post-name]').type(`${newPost}{enter}`)

    cy.get('[data-testid=post-item]')
      .should('have.length.above', 0)
      .first()
      .should('contain.text', newPost)
  })
})
