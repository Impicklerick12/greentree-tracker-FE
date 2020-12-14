describe('Testing the login functionality', () => {
    it('should log us in with a username name and password', () => {
        cy.visit('/')
        // If not signed in, expect Guest to be shown
        cy.contains('Guest')
        // Login span link is present in the Header
        cy.contains('span', 'Login').click()
        // Once login is clicked, the new URL should contain 'auth/login'
        cy.url().should('contain', 'auth/login')

        // Enter in dummy user data to sign in
        cy.get('input[type="text"]').type('RandomUsername')
        cy.get('input[type="password"]').type('Password123')
        cy.get('input[type="submit"]').click()

        // Redirect us back to the home page
        cy.location('pathname').should('equal', '/')
        // Should be logged in, and expect to see username on page
        cy.contains('RandomUsername')
    })
})