/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3300/Network');
    });

    it('Override', () => {
        cy.intercept('/api/test').as('testAPI');
        cy.get('[data-test-id="test-btn"]').click();
        cy.wait(50);
        cy.get('[data-test-id="test-btn"]').click();
        cy.wait(50);
        cy.get('[data-test-id="test-btn"]').click();
        cy.wait(50);
        cy.get('[data-test-id="test-btn"]').click();
        cy.wait(50);
        cy.wait('@testAPI').then((interception) => {
            console.log(interception);
            cy.get('@testAPI').its('response.body.index').should('eq', 3);
        })
    });
});
