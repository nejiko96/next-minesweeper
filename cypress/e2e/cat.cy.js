describe('Cat View', () => {
  it('loads the cat view and updates the image', () => {
    cy.visit('/en/cat')
    cy.wait(1500)

    cy.contains('button', "Today's Cat").as('loadButton')
    cy.get('img[alt="Cat Image"]').as('catImage')

    cy.get('@loadButton').should('exist')
    cy.get('@catImage').should('be.visible')
    cy.get('@catImage').invoke('attr', 'src').as('initialImageSrc')

    cy.get('@loadButton').click()
    cy.wait(1500)

    cy.get('@catImage').should('be.visible')
    cy.get('@catImage').invoke('attr', 'src').should('not.eq', '@initialImageSrc')
  })
})
