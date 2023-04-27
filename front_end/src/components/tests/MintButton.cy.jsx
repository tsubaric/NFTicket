import React from 'react';
import MintButton from '../MintButton';

describe('<MintButton />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(<MintButton />);
    });
});
