// Descrição do teste: 'Logout'
describe('Logout', () => {
  // Antes de cada teste (it), realiza o login e visita a página inicial
  beforeEach(() => {
    cy.login()  // Função personalizada para realizar o login
    cy.visit('/')  // Visita a URL raiz do aplicativo
  })

  // Teste específico: 'successfully'
  it('successfully', () => {
    cy.logout()  // Função personalizada para realizar o logout

    // Verifica se a URL após o logout é igual à URL de login configurada no Cypress
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
  })
})
