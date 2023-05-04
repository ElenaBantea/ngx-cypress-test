it("List and Dropowns", () => {

    cy.visit('/')  
    
    //1. Here we will pick a certain value from a list and check it
    /*
    cy.visit('/')  
    cy.get("nav nb-select").click()
    cy.get(".options-list").contains("Dark").click()
    //when we work with colors, we have to choose RGB format color in such test cases.

    cy.get("nb-layout-header nav").should("have.css", "background-color", "rgb(34, 43, 69)")
    cy.get("nav nb-select").should("contain", "Dark")*/

    //2. Now we'll go through the list and verify every value

    
    cy.get("nav nb-select").then ( dropdown =>{
        cy.wrap(dropdown).click()
        cy.get('.options-list nb-option').each( (listItem, index ) =>{  //here we created iteration function each - 
                                                        //it will iterate through list items and set index for each list item

            const itemText =listItem.text().trim()
            //bcause in the Inspect the texts have space before each text " Light" , " Dark" etc, 
            //there is a certain function to remove the space and it is- trim

            const colors ={
                "Light": "rgb(255, 255, 255)",
                "Dark": "rgb(34, 43, 69)",
                "Cosmic": "rgb(50, 50, 89)",
                "Corporate": "rgb(255, 255, 255)"
            }

            cy.get(listItem).click()
            cy.wrap(dropdown).should("contain", itemText)
            cy.get("nb-layout-header nav").should("have.css", "background-color", colors[itemText])

            if (index<3){
                cy.wrap(dropdown).click()   //here we put a condition, if index of listItem is more than 3 
                                            //to stop clicking, to stop the function
            }
            


        })

    })


    



    



    


})