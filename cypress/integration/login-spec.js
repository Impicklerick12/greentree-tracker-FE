describe('Testing the login functionality', () => {
    beforeEach(() => {
        cy.visit('/')
        // No logged in user
    })

    it('should log us in with a username name and password', () => {
        // Login span link is present in the Header
        cy.get('button[id="login"]').click()
        // Once login is clicked, the new URL should contain 'auth/login'
        cy.url().should('contain', 'auth/login')

        // Enter in dummy user data to sign in
        const username = "CypressTesting"
        const password = "Password123"

        cy.get('input[name="username"]').type(username)
        cy.get('input[type="password"]').type(password)
        cy.get('button[type="submit"]').click()

        // Should be logged in, and expect to see username on page
        cy.contains(username)
        // Expect to see the account link
        cy.get('button[id="account"]')
        // Expect to see the log out link
        cy.get('button[id="logout"]')

    })

    it('should not log us in with wrong credentials', () => {
        // Login span link is present in the Header
        cy.get('button[id="login"]').click()
        // Once login is clicked, the new URL should contain 'auth/login'
        cy.url().should('contain', 'auth/login')

        // Enter in dummy user data to sign in
        const username = "FakeUsername"
        const password = "fakepassword"

        cy.get('input[name="username"]').type(username)
        cy.get('input[type="password"]').type(password)
        cy.get('button[type="submit"]').click()

        // error message is shown and we remain on the login page
        cy.contains('div', 'Authentication failed. Please check your username and password.')
        cy.url().should('contain', '/login')
        // Expect to see the Login link
        cy.get('button[id="login"]')
        // Expect to see the Register link
        cy.get('button[id="register"]')
    })
})