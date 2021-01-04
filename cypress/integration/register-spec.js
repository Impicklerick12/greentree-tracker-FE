describe('Testing the Register functionality', () => {
        beforeEach(() => {
            cy.visit('/')
            // No logged in user
        })

        it('should register a new user', () => {
            // If not signed in, expect Guest to be shown
            cy.contains('Guest')
            // Login span link is present in the Header
            cy.contains('span', 'Register').click()
            // Once login is clicked, the new URL should contain 'auth/login'
            cy.url().should('contain', 'auth/register')

            // Enter in dummy user data to sign in
            const username = "CypressTesting"
            const email = "cypress@testing.com"
            const password = "Password123"

            cy.get('input[name="username"]').type(username)
            cy.get('input[name="email"]').type(email)
            cy.get('input[type="password"]').type(password)
            cy.get('button[type="submit"]').click()

            // Redirect us back to the home page
            cy.location('pathname').should('equal', '/')
            // Should be logged in, and expect to see username on page
            cy.contains(username)
        })
})