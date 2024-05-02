context('Tasks Rendering', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });
    
    it('should render loading message while fetching data', () => {
        cy.contains('Loading...').should('exist');
    });
    
    it('should display task groups after data is fetched', () => {
        cy.get('.tasks-container__content').should('exist');
        cy.get('.tasks-container__groups').children().should('have.length.above', 0);
    });
    
    it('should display progress bar', () => {
        cy.get('.tasks-container__progress-bar').should('exist');
    });
})
  