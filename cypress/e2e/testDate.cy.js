it("Select date - Web DatePickers(Date Assert)", () => {

    cy.visit('/')  
    cy.contains("Forms").click() 
    cy.contains("Datepicker").click()

    let date = new Date()   //Date() object gets current system date and time

    //here we want to get certain number of days to the current date

    date.setDate(date.getDate() + 2) //getDate() method returns current day of the month and then we add 2 days

    let futureDay = date.getDay()  ///here we pick up the day we want to select

    //let futureMonth = date.getMonth()  -- here we pick up the month of the day we we want to select. 
    //getMonth() method returns the number of the month, not the string. But we want a short name of the month. Thus: 

    let futureMonth = date.toLocaleString('default', {month: 'short'}) - //He googled for this, so just remember that :)

   

    
    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {

        cy.wrap(input).click()
        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {

            if(!dateAttribute.includes(futureMonth)) {
                cy.get('[data-name="chevron-right"]').click()

            }
            
            else {

                cy.get('nb-calendar-day-picker').contains(futureDay).click()
            }


        })
        

        cy.get('nb-calendar-day-picker').contains('20').click()
        cy.wrap(input).invoke('prop', 'value').should('contain', 'Apr 20, 2023') 

    })
})
    
