describe('Testing the plant CRUD functionality', () => {
    beforeEach(() => {
        cy.visit('/')
        // No logged in user
    })

    it('should allow Admin account to create a plant', () => {
        // Login span link is present in the Header
        cy.get('button[id="login"]').click()
        // Once login is clicked, the new URL should contain 'auth/login'
        cy.url().should('contain', 'auth/login')
        // sign in
        const username = "Admin"
        const password = "Password123"
        cy.get('input[name="username"]').type(username)
        cy.get('input[type="password"]').type(password)
        cy.get('button[type="submit"]').click()

        // admin link should be present
        cy.get('button[id="admin"]').click()
        cy.url().should('contain', 'admin')

        // new plant information
        const newPlant = {
            common_name: "Cypress",
            botanical_name: "Cypress",
            description: "Cypress",
            quantity: 1,
            price: 1
        }
        const { common_name, botanical_name, description, quantity, price } = newPlant
        // add in new plant information into form fields
        cy.get('input[name="common_name"]').type(common_name)
        cy.get('input[name="botanical_name"]').type(botanical_name)
        cy.get('textarea[name="description"]').type(description)
        cy.get('input[name="quantity"]').type(quantity)
        cy.get('input[name="price"]').type(price)
        cy.get('#category').click()
        cy.contains('li', 'Tree').click()
        cy.get('#pot_size').click()
        cy.contains('li', '140mm').click()
        cy.contains('span', 'Add Plant').click()

        // should be redirected to new plant page
        cy.contains(common_name)
        cy.contains(botanical_name)
        cy.contains(description)
        cy.contains(quantity)
        cy.contains(price)
    })
})