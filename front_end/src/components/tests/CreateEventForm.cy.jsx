import React from 'react'
import CreateEventForm from '../CreateEventForm'

describe('<CreateEventForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CreateEventForm />)
  })

  it('lets me input an event name', () => {
      cy.mount(<CreateEventForm />)
      cy.get('#eventName').type('Test Event Name')
      .should('have.value', 'Test Event Name')
  })

  it('lets me input an event description', () => {
      cy.mount(<CreateEventForm />)
      cy.get('#eventDescription').type('Test Event Description')
      .should('have.value', 'Test Event Description')
      // TODO: this is erroring out, why?
  })

  it('lets me input the number of tickets', () => {
      cy.mount(<CreateEventForm />)
      cy.get('input[name="numGATickets"]').type(10)
      .should('have.value', 10)
  })

  it('lets me set the ticket price', () => {
      cy.mount(<CreateEventForm />)
      cy.get('input[name="gaTicketPrice"]').type(100)
      .should('have.value', 100)
  })

  it('lets me set the event category', () => {
      cy.mount(<CreateEventForm />)

      // make sure drop down contains all options
      cy.get('#eventCategory').click()
      cy.get('.MuiList-root > [tabindex="0"]').should('contain', 'Restaurants')
      cy.get('[data-value="Festivals"]').should('contain', 'Festivals')
      cy.get('[data-value="Sports"]').should('contain', 'Sports')
      cy.get('[data-value="Travel"]').should('contain', 'Travel')
      cy.get('[data-value="Charity"]').should('contain', 'Charity')
      cy.get('[data-value="Virtual"]').should('contain', 'Virtual')
      cy.get('[data-value="Health"]').should('contain', 'Health')

      // select a category
      cy.get('[data-value="Virtual"]').click()
      cy.get('#eventCategory').should('contain', 'Virtual')
  })

  it('lets me set the event image', () => {
      cy.mount(<CreateEventForm />)

      cy.get('input[type="file"]').parent()
      .selectFile('cypress/fixtures/testImage.png')
  })
})
