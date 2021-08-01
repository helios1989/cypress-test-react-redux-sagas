context('TODOS', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/todos')
    //   cy.intercept("https://jsonplaceholder.typicode.com/Photos", {statusCode: 400});
      cy.intercept('DELETE', "https://jsonplaceholder.typicode.com/Todos/1", {"DELETED": "VERGEL"});
      cy.intercept("https://jsonplaceholder.typicode.com/Todos", {fixture: "todos.json"});
    })

    it("when addNewTodos button is click addNewTodos is visible", () => {
        cy.get("#addNewTodos").click().then((d) => {
            cy.get("#addNewTodos").should("be.visible");
        });
    });
    it("card should be greater than one if load", () => {
        cy.get(".card")
        .its('length')
        .should('be.gt', 1)
    });
    it("delete item should be visible", () => {
        cy.get("#itemDeleteTodos1").should("be.visible");
        cy.get("#itemDeleteTodos1").click();
    });
    it("should move to second page when pagination is click", () => {
        cy.get(`[aria-label="Go to page 2"]`).should("be.visible");
        cy.get(`[aria-label="Go to page 2"]`).click();
    });
});