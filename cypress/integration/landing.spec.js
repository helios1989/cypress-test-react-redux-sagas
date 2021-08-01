const navigationTest = [
    { 
        element: 'home',
        contains: 'TestRedux',
        path: '/'
    },
    { 
        element: 'albums',
        contains: 'Albums',
        path: '/albums'
    },
    { 
        element: 'comments',
        contains: 'Comments',
        path: '/comments'
    },
    { 
        element: 'photos',
        contains: 'Photos',
        path: '/photos'
    },
    { 
        element: 'posts',
        contains: 'Posts',
        path: '/posts'
    },
    { 
        element: 'todos',
        contains: 'Todos',
        path: '/todos'
    },
    { 
        element: 'users',
        contains: 'Users',
        path: '/users'
    }
];
const landingSelectionBox = [
    { element: "#landingAlbums",text: "Check Memories made" },
    { element: "#landingComments",  text: "What do you think?" },
    { element: "#landingPhotos", text: "Let's take more" },
    { element: "#landingPosts",  text: "Writing clears the mind" },
    { element: "#landingTodos", text: "Check your checklist" },
    { element: "#landingUsers",  text: "Who's on the platform" },
];
context('Landing', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
    it('should have learnReact', () => {
        cy.get('.learnReact').contains("LEARN");
        cy.get(".MuiGrid-item") // calls the 'length' property yielding that value
            .its('length')
            .should('be.gt', 2)
    });
    navigationTest.forEach((data) => {
        it(`it should have ${data.contains}`, () => {
            cy.get(`#${data.element}`).should("be.visible");
            cy.get(`#${data.element}`).contains(data.contains);
        });
    });

    navigationTest.forEach((data) => {
        it(`should have ${data.element} and redirect to ${data.element} when click`, () => {
            cy.get(`#${data.element}`)
            .should('have.attr', 'href').and('include', `${data.path}`)
        });
    });
    landingSelectionBox.forEach((data)=> {
        it(`should have ${data.element} and have a text of ${data.text}`, ()=>{
            cy.get(data.element).should("be.visible");
            cy.get(`${data.element} p`).contains(data.text);
        });
    });
    it("should have TestRedux as app header", () => {
        cy.get("#app-header").contains("TestRedux");
        cy.get("#app-header").should("be.visible");
    });
});