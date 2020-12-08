describe('The Home Page', () => {
    it('Visits Greentree Tracker', () => {
      cy.visit('/')
      // If not signed in, expect Guest to be shown
      cy.contains('Guest')
      // Expect to show the Home/Landing H1 element
      cy.contains("Home/Landing")
    })
  })