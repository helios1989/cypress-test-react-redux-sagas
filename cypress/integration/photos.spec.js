context('Photos', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/photos')
    //   cy.intercept("https://jsonplaceholder.typicode.com/Photos", {statusCode: 400});
      cy.intercept('DELETE', "https://jsonplaceholder.typicode.com/Photo/1", {"DELETED": "VERGEL"});
      cy.intercept("https://jsonplaceholder.typicode.com/Photos", {fixture: "photos.json"});
    })

    it("when addNewPhoto button is click addNewPhoto is visible", () => {
        cy.get("#addNewPhoto").click().then((d) => {
            cy.get("#addNewPhoto").should("be.visible");
        });
    });
    it("card should be greater than one if load", () => {
        cy.get(".card")
        .its('length')
        .should('be.gt', 1)
    });
    it("delete item should be visible", () => {
        cy.get(".deleteItemPhoto").should("be.visible");
        cy.get("#deleteItemPhoto1").click();
    });
    it("should move to second page when pagination is click", () => {
        cy.get(`[aria-label="Go to page 2"]`).should("be.visible");
        cy.get(`[aria-label="Go to page 2"]`).click();
    });
    it("should have displayed error", () => {
        cy.intercept("https://jsonplaceholder.typicode.com/Photos", {statusCode: 400});
    });

});