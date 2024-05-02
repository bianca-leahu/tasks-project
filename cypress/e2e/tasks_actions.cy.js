context('Tasks Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    })
  
    it('check 1st group', () => {
        cy.get('.tasks-container__group').first().click();

        cy.get('.tasks-container__group-tasks').should('exist');
      
        cy.get('.tasks-container__group-tasks').children().should('have.length', 4);

        cy.get('.tasks-container__group-tasks').children().eq(1).click();
        cy.get('.tasks-container__group-tasks').children().eq(2).click();

        cy.get('.tasks-container__progress-bar-text').should('contain', '46%');
    })
  })
  