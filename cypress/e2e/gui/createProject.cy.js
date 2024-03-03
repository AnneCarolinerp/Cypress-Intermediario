// Importa a biblioteca de geração de dados fictícios 'faker' do pacote '@faker-js/faker'
import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }

// Descrição do teste: 'Create Project'
describe('Create Project', options, () => {
  // Antes de cada teste, realiza o login
  beforeEach(() => {
    cy.api_deleteProjects()
    cy.login()
  })

  // Teste específico: 'successfully'
  it('successfully', () => {
    // Cria um objeto 'project' com um nome único gerado aleatoriamente e uma descrição fictícia
    const project = {
      name: `project-${faker.datatype.uuid()}`,  // Nome do projeto com UUID único
      description: faker.random.words(5)  // Descrição do projeto com 5 palavras aleatórias
    }

    // Chama o comando personalizado 'gui_createProject' para criar o projeto
    cy.gui_createProject(project)

    // Verifica se a URL após a criação do projeto é a esperada
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
    
    // Verifica se o nome do projeto é visível na interface
    cy.contains(project.name).should('be.visible')
    
    // Verifica se a descrição do projeto é visível na interface
    cy.contains(project.description).should('be.visible')
  })
})
