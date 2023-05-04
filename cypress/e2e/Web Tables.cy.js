it("Web Tables", () => {

    cy.visit('/')  
    cy.contains("Tables & Data").click() 
    cy.contains("Smart Table").click() 

    //1

    // cy.get("tbody").contains("tr", "Larry").then(OurRaw =>{

    //     cy.wrap(OurRaw).find(".nb-edit").click()
    //     cy.wrap(OurRaw).find('[placeholder="Age"]').clear().type('25')
    //     cy.wrap(OurRaw).find(".nb-checkmark").click()
    //     cy.wrap(OurRaw).find('td').eq(6).should ("contain", "25")
             
        

    // })

    //2

    // cy.get("thead").find(".nb-plus").click()
    // cy.get("tr").eq(2).then(NewRaw => {
    //     cy.wrap(NewRaw).find('[placeholder="First Name"]').type("Elena")
    //     cy.wrap(NewRaw).find('[placeholder="Last Name"]').type("Bantea")
    //     cy.wrap(NewRaw).find('.nb-checkmark').click()
        
    // })

    // cy.get("tr").eq(2).find ('td'). then(TableColumns => {

    //     cy.wrap(TableColumns).eq(2).should("contain", "Elena")
    //     cy.wrap(TableColumns).eq(3).should("contain", "Bantea")


    // })

    //3 - test search of the table

    /*cy.get('thead [placeholder = "Age"]').type("20")

    cy.wait(500) //we have to add a delay, because cypress doesn't wait between steps and this can cause errors.
    cy.get("tbody tr").each (tableRaw =>{

        cy.wrap(tableRaw).find("td").eq(6).should("contain", "20")



    })*/

    //4 - if we want to test search with a few values typed in

    const age = [20, 30, 40, 200]
    cy.wrap(age).each(age => {
        cy.get('thead [placeholder = "Age"]').clear().type(age)

        cy.wait(500) //we have to add a delay, because cypress doesn't wait between steps and this can cause errors.
        cy.get("tbody tr").each (tableRaw =>{

            if (age ==200) {
                cy.wrap(tableRaw).should("contain", "No data found")

            }
            else {
            cy.wrap(tableRaw).find("td").eq(6).should("contain", age)}
            
    
        })

    })



})