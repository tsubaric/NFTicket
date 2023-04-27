import React from 'react'
import ConnectWalletButton from '../ConnectWalletButton'

describe('<ConnectWalletButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ConnectWalletButton />)
  })
})
