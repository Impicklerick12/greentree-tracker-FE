describe('Testing the edit plant functionality', () => {
    it('should allow Admin account to edit a plant', () => {
        cy.visit('/')
        // Login span link is present in the Header
        cy.get('button[id="login"]').click()
        // Once login is clicked, the new URL should contain 'auth/login'
        cy.url().should('contain', 'auth/login')
        // sign in
        cy.get('input[name="username"]').type("Admin")
        cy.get('input[type="password"]').type("Password123")
        cy.get('button[type="submit"]').click()
        // admin link should be present
        cy.visit('/admin')
        cy.url().should('contain', 'admin')
    })
})