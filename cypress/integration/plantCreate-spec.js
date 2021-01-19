describe('Testing the create plant functionality', () => {
    beforeEach(() => {
        // log in admin
        cy.loginAdmin()
    })

    it('should allow Admin account to create a plant', () => {
        // admin link should be present
        cy.visit('/admin')
        cy.wait(5000)
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
        cy.contains(price)

        // delete test plant
        cy.get('button[id="delete"]').click()
        cy.url().should('contain', '/plants')
    })

    it('should not allow Admin to create a plant with missing information', () => {
        // new plant information
        const newPlant = {
            common_name: "Cypress",
            description: "Cypress",
            quantity: 1,
        }
        const { common_name, description, quantity } = newPlant
        // add in new plant information into form fields
        cy.get('input[name="common_name"]').type(common_name)
        cy.get('textarea[name="description"]').type(description)
        cy.get('input[name="quantity"]').type(quantity)
        cy.get('#category').click()
        cy.contains('li', 'Ground Cover').click()
        cy.get('#pot_size').click()
        cy.contains('li', '250mm').click()
        cy.contains('span', 'Add Plant').click()

        // should not be redirected away from /admin
        cy.url().should('contain', '/admin')
    })
})


describe("Testing that the user cannot perform CRUD functions", () => { 
    beforeEach(() => {
        // log in user
        cy.loginUser()
    })

    it('should not allow a regular account to create a plant', () => {
        // admin link should be not present
        cy.visit('/admin').then((res) => {
            expect(res.status).to.eq(403)
        })
    })
})