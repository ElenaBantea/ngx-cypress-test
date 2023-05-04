export class formLayoutsPage {

submitInlineFormwithNameandEmail(name, email){

    cy.contains('nb-card', 'Inline form').find('form').then(form => {
        cy.wrap(form).find('[placeholder="Jane Doe"]').type(name)
        cy.wrap(form).find('[placeholder="Email"]').type(email)
        cy.wrap(form).find('[type="checkbox"]').check({force:true})
        cy.wrap(form).submit() //we can use this submit() method, or find the button and click it

    })
}

submitBasicForm(email, password){

    cy.contains('nb-card', 'Basic form').find('form').then(form => {
        cy.wrap(form).find('[placeholder="Email"]').type(email)
        cy.wrap(form).find('[placeholder="Password"]').type(password)
        cy.wrap(form).find('[type="checkbox"]').check({force:true})
        cy.wrap(form).submit() //we can use this submit() method, or find the button and click it

    })
}

}

export const onFormLayoutsPage = new formLayoutsPage ()