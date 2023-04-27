import React from 'react'
import TicketCard from './TicketCard'

describe('<TicketCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<TicketCard />)
  })
})