context('Comments', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/comments')
      cy.intercept("https://jsonplaceholder.typicode.com/comments", {fixture: "comments.json"});
      cy.intercept('DELETE', "https://jsonplaceholder.typicode.com/Comments/1", {"DELETED": "VERGEL"});
    })
    it('should have Comments as header text', () => {
        cy.get('#commentsPage').contains("Comments");
    });

    it("when additem button is click addItemModal is visible", () => {
        cy.get("#addItemComments").click().then((d) => {
            cy.get("#addItemCommentsModal").should("be.visible");
        });
    });
    it("card should be greater than one if load", () => {
        cy.get(".card")
        .its('length')
        .should('be.gt', 1)
    });
    it("delete item should be visible", () => {
        cy.get(".deleteItem").should("be.visible");
        cy.get("#itemDelete1").click();
    });
    it("should move to second page when pagination is click", () => {
        cy.get(`[aria-label="Go to page 2"]`).should("be.visible");
        cy.get(`[aria-label="Go to page 2"]`).click();
    });
});