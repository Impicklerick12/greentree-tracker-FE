// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("loginUser", (user = Cypress.env('user')) => {
    cy.visit('/')
    // Login span link is present in the Header
    cy.get('button[id="login"]').click()
    // Once login is clicked, the new URL should contain 'auth/login'
    cy.url().should('contain', 'auth/login')
    // sign in
    cy.get('input[name="username"]').type(user.username)
    cy.get('input[type="password"]').type(user.password)
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add("loginAdmin", (admin = Cypress.env('admin')) => {
    cy.visit('/')
    // Login span link is present in the Header
    cy.get('button[id="login"]').click()
    // Once login is clicked, the new URL should contain 'auth/login'
    cy.url().should('contain', 'auth/login')
    // sign in
    cy.get('input[name="username"]').type(admin.username)
    cy.get('input[type="password"]').type(admin.password)
    cy.get('button[type="submit"]').click()

    // cy.request({
    //     method: 'POST',
    //     url: '/auth/login', // baseUrl is prepended to url
    //     form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
    //     body: {
    //       username: admin.username,
    //       password: admin.password
    //     }
    //   })
})

Cypress.Commands.add("logoutUser", () => {
    // Logout span link is present in the Header
    cy.get('button[id="logout"]').click()
})
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
