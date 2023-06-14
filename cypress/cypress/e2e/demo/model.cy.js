/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3300/Modal');
    });

    it('Override', () => {
        cy.get('.mantine-Button-root').click();
        cy.get('.mantine-Modal-root').should('exist');
        cy.get('.mantine-Modal-overlay').click();
    });

    // it('Override', () => {
    //     cy.get('.mantine-Button-root').click();
    //     cy.get('.mantine-Modal-root').should('exist');
    //     cy.get('.mantine-Modal-overlay').click(5, 5);
    // });
});
