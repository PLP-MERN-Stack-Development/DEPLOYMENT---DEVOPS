// cypress/e2e/bugs.cy.js
describe('Bug Tracker E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
    cy.intercept('GET', '**/api/bugs').as('getBugs')
    cy.intercept('POST', '**/api/bugs').as('createBug')
    cy.intercept('PUT', '**/api/bugs/*').as('updateBug')
    cy.intercept('DELETE', '**/api/bugs/*').as('deleteBug')
  })

  it('loads the bug list', () => {
    cy.wait('@getBugs')
    cy.contains('Bug Tracker').should('be.visible')
  })

  it('creates a new bug', () => {
    cy.get('button').contains('Report Bug').click()
    
    cy.get('#title').type('New Test Bug')
    cy.get('#description').type('This is a test bug created by Cypress')
    cy.contains('button', 'High').click()
    cy.contains('button', 'Create Bug').click()
    
    cy.wait('@createBug').its('response.statusCode').should('eq', 201)
    cy.contains('New Test Bug').should('be.visible')
  })

  it('edits an existing bug', () => {
    cy.contains('New Test Bug').click()
    cy.contains('button', 'Edit Bug').click()
    
    cy.get('#title').clear().type('Updated Test Bug')
    cy.contains('button', 'Resolved').click()
    cy.contains('button', 'Update Bug').click()
    
    cy.wait('@updateBug').its('response.statusCode').should('eq', 200)
    cy.contains('Updated Test Bug').should('be.visible')
    cy.contains('Resolved').should('be.visible')
  })

  it('deletes a bug', () => {
    cy.contains('Updated Test Bug').click()
    cy.contains('button', 'Edit Bug').click()
    
    cy.get('button[aria-label="Delete"]').click()
    cy.on('window:confirm', () => true)
    
    cy.wait('@deleteBug').its('response.statusCode').should('eq', 200)
    cy.contains('No Bugs Found').should('be.visible')
  })
})