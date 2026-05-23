describe('Clip', () => {
    it('should play clip', () => {
        cy.visit('/');
        cy.get('app-clips-list > .grid a:first').click();
        cy.get('.vjs-big-play-button').click();
        cy.wait(3000);
        cy.get('.vjs-big-play-button').click({ force: true });
        cy.get('.vjs-play-progress').invoke('width').should('gte', 0);
    })
})