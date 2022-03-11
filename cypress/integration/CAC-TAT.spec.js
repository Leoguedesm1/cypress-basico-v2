/// <reference types="Cypress" />

describe('Central de Atendimento ao CLiente TAT', function() {
    beforeEach(function() {
        cy.visit('./src/index.html');
    });

    it('verifica o título da aplicação', function() { 
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it('preencha os campos obrigatórios e envia o formulário', function() {
        const longText = "Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste";
        
        cy.clock();

        cy.get('#firstName').type('Leonardo');
        cy.get('#lastName').type('Moreira');
        cy.get('#email').type('leoguedesm1@gmail.com');
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.contains('button', 'Enviar').click();

        cy.get('.success').should('be.visible');
        cy.tick(3000);
        cy.get('.success').should('not.be.visible');
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        const longText = "Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste";
        
        cy.clock();

        cy.get('#firstName').type('Leonardo');
        cy.get('#lastName').type('Moreira');
        cy.get('#email').type('leoguedesm1gmail.com');
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
        cy.tick(3000);
        cy.get('.error').should('not.be.visible');
    });

    it('campo de telefone continua vazio quando preenchido com valor não numérico', function() {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        const longText = "Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste";
        
        cy.get('#firstName').type('Leonardo');
        cy.get('#lastName').type('Moreira');
        cy.get('#email').type('leoguedesm1@gmail.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
    });

    it('preencha e limpa os campos nome, sobrenome, email e telefone', function() {
        
        cy.get('#firstName')
            .type('Leonardo')
            .should('have.value', 'Leonardo')
            .clear()
            .should('have.value', '');
        
        cy.get('#lastName')
            .type('Moreira')
            .should('have.value', 'Moreira')
            .clear()
            .should('have.value', '');

        cy.get('#email')
            .type('leoguedesm1@gmail.com')
            .should('have.value', 'leoguedesm1@gmail.com')
            .clear()
            .should('have.value', '');

        cy.get('#phone')
            .type('19991334887')
            .should('have.value', '19991334887')
            .clear()
            .should('have.value', '');
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.clock();
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
        cy.tick(3000);
        cy.get('.error').should('not.be.visible');
    });

    it('envia o formulario com sucesso usando um comando customizado', function() {
        cy.clock();
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');
        cy.tick(3000);
        cy.get('.success').should('not.be.visible');
    });

    it('seleciona um produto (YouTube) por seu text', function() {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor', function() {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    });

    it('marca o tipo de atendimento Feedback', function() {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked', 'feedback');
    });

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    });

    it('marca ambos checkboxes e depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
            .check()    
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    });

    it('seleciona um arquivo da pasta fixtures', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            });
    });

    it('seleciona um arquivo simulando um drag-and-drop', function() {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            });
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
        cy.fixture('example.json').as('sampleFile');
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            });
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
        cy.get('#privacy a').should('have.attr', 'target', '_blank');
    });

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        
        cy.contains('Talking About Testing').should('be.visible');
    });

    it('exibe e esconde as mensages de sucesso e erro usando o .invoke', function() {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    });

    it('preenche a area de texto usando comando invoke', function() {
        const longText = Cypress._.repeat('0123456789', 20);
        
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    });

    it('faz uma requisicao HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should(function(response) {
                const { status, statusText, body } = response;
                expect(status).to.equal(200);
                expect(statusText).to.equal('OK');
                expect(body).contains('CAC TAT')
            })
    });

    it.only('encontra o gato escondido', function() {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
    })
});