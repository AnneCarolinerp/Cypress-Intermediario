Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {},
) => {
    const login = () => {
        cy.visit('/users/sign_in')

        cy.get("[data-qa-selector='login_field']").type(user)
        cy.get("[data-qa-selector='password_field']").type(password, { log: false })
        cy.get("[data-qa-selector='sign_in_button']").click()
    }

    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
            .should('not.eq', '/users/sign_in')
    }

    const options = {
        cacheAcrossSpecs: true,
        validate,
    }

    if (cacheSession) {
        cy.session(user, login, options)
    } else {
        login()
    }
})
// Adiciona um novo comando personalizado chamado 'logout' ao Cypress
Cypress.Commands.add('logout', () => {
    // Clica no avatar do usuário
    cy.get('.qa-user-avatar').click()

    // Clica no botão 'Sign out' para realizar o logout
    cy.contains('Sign out').click()
})

// Adiciona um novo comando personalizado chamado 'gui_createProject' ao Cypress
Cypress.Commands.add('gui_createProject', project => {
    // Visita a página para criar um novo projeto
    cy.visit('/projects/new')

    // Preenche o campo de nome do projeto com o nome fornecido no objeto 'project'
    cy.get('#project_name').type(project.name)

    // Preenche o campo de descrição do projeto com a descrição fornecida no objeto 'project'
    cy.get('#project_description').type(project.description)

    // Marca a caixa de seleção 'Initialize with README' usando a classe CSS específica
    cy.get('.qa-initialize-with-readme-checkbox').check()

    // Clica no botão 'Create project' para criar o projeto
    cy.contains('Create project').click()
})

Cypress.Commands.add('gui_createIssue', issue => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

    cy.get('.qa-issuable-form-title').type(issue.title)
    cy.get('.qa-issuable-form-description').type(issue.description)
    cy.contains('Submit issue').click()
})

Cypress.Commands.add('gui_setLabelOnIssue', label => {
    cy.get('.qa-edit-link-labels').click()
    cy.contains(label.name).click()
    cy.get('body').click()
})

Cypress.Commands.add('gui_setMilestoneOnIssue', milestone => {
    cy.get('.block.milestone .edit-link').click()
    cy.contains(milestone.title).click()
})