describe('Bug Tracker E2E Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/bugs', { fixture: 'bugs.json' }).as('getBugs');
    cy.visit('/');
    cy.wait('@getBugs');
  });

  it('displays the list of bugs', () => {
    cy.contains('Bug 1').should('exist');
    cy.contains('Bug 2').should('exist');
  });

  it('navigates to report form and submits a new bug', () => {
    cy.intercept('POST', '/api/bugs', {
      statusCode: 201,
      body: {
        _id: '3',
        title: 'New Bug',
        description: 'New Description',
        status: 'open',
        priority: 'medium'
      }
    }).as('createBug');

    cy.contains('Report Bug').click();
    cy.get('input[name="title"]').type('New Bug');
    cy.get('textarea[name="description"]').type('New Description');
    cy.get('button[type="submit"]').click();

    cy.wait('@createBug');
    cy.contains('New Bug').should('exist');
  });

  it('updates bug status', () => {
    cy.intercept('PUT', '/api/bugs/1', {
      statusCode: 200,
      body: {
        _id: '1',
        title: 'Bug 1',
        description: 'Desc 1',
        status: 'in-progress',
        priority: 'medium'
      }
    }).as('updateBug');

    cy.get('select').first().select('in-progress');
    cy.wait('@updateBug');
    cy.get('select').first().should('have.value', 'in-progress');
  });
});