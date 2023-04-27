import React from 'react'
import TicketCard from '../TicketCard'

describe('<TicketCard />', () => {
  it('renders event info', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TicketCard
        eventId={0}
        ticketId={0}
        eventName={"test event"}
    />)
  })

  it('has a transfer button', () => {
    cy.mount(<TicketCard
        eventId={0}
        ticketId={0}
        eventName={"test event"}
    />)
    cy.get('[aria-label="Transfer Ticket"]').should('be.visible')
  })

  it('has a redeem button', () => {
    cy.mount(<TicketCard
        eventId={0}
        ticketId={0}
        eventName={"test event"}
    />)
    cy.get('[aria-label="Redeem Ticket"]').should('be.visible')
  })

})
