context('Posts', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/posts')
    //   cy.intercept("https://jsonplaceholder.typicode.com/Photos", {statusCode: 400});
      cy.intercept('DELETE', "https://jsonplaceholder.typicode.com/Posts/1", {"DELETED": "VERGEL"});
      cy.intercept("https://jsonplaceholder.typicode.com/Posts", {fixture: "posts.json"});
    })

    it("when addNewPosts button is click addNewPosts is visible", () => {
        cy.get("#addNewPosts").click().then((d) => {
            cy.get("#addNewPosts").should("be.visible");
        });
    });
    it("card should be greater than one if load", () => {
        cy.get(".card")
        .its('length')
        .should('be.gt', 1)
    });
    it("delete item should be visible", () => {
        cy.get("#itemDeletePosts1").should("be.visible");
        cy.get("#itemDeletePosts1").click();
    });
    it("should move to second page when pagination is click", () => {
        cy.get(`[aria-label="Go to page 2"]`).should("be.visible");
        cy.get(`[aria-label="Go to page 2"]`).click();
    });
});