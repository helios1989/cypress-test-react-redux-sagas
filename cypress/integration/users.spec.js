context('USERS', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/users')
    //   cy.intercept("https://jsonplaceholder.typicode.com/Photos", {statusCode: 400});
      cy.intercept('DELETE', "https://jsonplaceholder.typicode.com/Users/1", {"DELETED": "VERGEL"});
      cy.intercept("https://jsonplaceholder.typicode.com/Users", {fixture: "users.json"});
    })

    it("when addNewTodos button is click addNewUsers is visible", () => {
        cy.get("#addNewUsers").click().then((d) => {
            cy.get("#addNewUsers").should("be.visible");
        });
    });
    it("card should be greater than one if load", () => {
        cy.get(".card")
        .its('length')
        .should('be.gt', 1)
    });
    it("delete item should be visible", () => {
        cy.get("#itemDeleteUsers1").should("be.visible");
        cy.get("#itemDeleteUsers1").click();
    });
    it("should move to second page when pagination is click", () => {
        cy.get(`[aria-label="page 1"]`).should("be.visible");
        cy.get(`[aria-label="page 1"]`).click();
    });
});