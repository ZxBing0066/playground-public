/// <reference types="cypress" />

context('Queue', () => {
    // it('Queue', () => {
    //     cy.visit('http://localhost:3300/Queue-1');
    //     cy.get('[data-test-id="test-btn"]').click();
    //     cy.get('[data-test-id="test-ul"] li').should('have.length', 5);
    // });
    // it('Queue 1', () => {
    //     cy.visit('http://localhost:3300/Queue-1');
    //     let tag = 'start';
    //     cy.get('[data-test-id="test-btn"]')
    //         .then(() => {
    //             tag = 'clicked';
    //         })
    //         .click();
    //     console.log(tag);
    //     cy.get('[data-test-id="test-ul"] li').should('have.length', 5);
    //     tag = 'end';
    //     console.log(tag);
    // });
    it('Queue 2', () => {
        cy.visit('http://localhost:3300/Queue-1');
        cy.get('[data-test-id="test-btn"]').then(() => {
            cy.get('[data-test-id="test-ul"] li').should('not.exist');
            cy.get('[data-test-id="test-btn"]').click();
            cy.get('[data-test-id="test-ul"] li').should('have.length', 5);
            console.log(cy.queue.queueables.length);
        });
        cy.get('[data-test-id="test-ul"] li').should('have.length', 5);
        console.log(cy.queue.queueables.length);
    });
});
