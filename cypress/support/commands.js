Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    const longText = "Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste";
        
    cy.get('#firstName').type('Leonardo');
    cy.get('#lastName').type('Moreira');
    cy.get('#email').type('leoguedesm1@gmail.com');
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.contains('button', 'Enviar').click();
});