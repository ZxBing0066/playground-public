/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3300/Covered-1');
    });

    it('Override', () => {
        cy.get('[data-test-id="mask"]').click();
    });
});
