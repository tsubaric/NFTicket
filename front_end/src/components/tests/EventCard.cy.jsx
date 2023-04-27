import React from 'react'
import EventCard from '../EventCard'

describe('<EventCard />', () => {
  it('renders event information', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<EventCard
        eventId={0}
        name={"test event"}
        description={"test description"}
    />)

    // event name should be displayed
    cy.get('.MuiTypography-h3 > div').contains('test event')

    // event description should be displayed
    cy.get('.MuiTypography-h4 > div').contains('test description')

    // event image should be displayed
    cy.get('.MuiCardMedia-root').should('be.visible')
  })
})
