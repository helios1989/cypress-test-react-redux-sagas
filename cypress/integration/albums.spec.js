context('Albums', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/albums')
    //   cy.intercept("https://jsonplaceholder.typicode.com/Photos", {statusCode: 400});
      cy.intercept('DELETE', "https://jsonplaceholder.typicode.com/Albums/1", {"DELETED": "VERGEL"});
      cy.intercept("https://jsonplaceholder.typicode.com/Albums", {fixture: "albums.json"});
    })

    it("when addNewAlbums button is click addNewAlbums is visible", () => {
        cy.get("#addNewAlbums").click().then((d) => {
            cy.get("#addNewAlbums").should("be.visible");
        });
    });
    it("card should be greater than one if load", () => {
        cy.get(".card")
        .its('length')
        .should('be.gt', 1)
    });
    it("delete item should be visible", () => {
        cy.get("#itemDeleteAlbum1").should("be.visible");
        cy.get("#itemDeleteAlbum1").click();
    });
    it("should move to second page when pagination is click", () => {
        cy.get(`[aria-label="Go to page 2"]`).should("be.visible");
        cy.get(`[aria-label="Go to page 2"]`).click();
    });
});