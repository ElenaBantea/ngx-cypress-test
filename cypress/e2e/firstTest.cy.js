//Test Structure

/*describe ('Our first suite', () => {

    beforeEach('Code for every test', () => {
        //here we'll type a repetatie code fo r exan=mple, login function, which will  be executed before every test
    })

    it('Our first test', () => {

    })
    it('Our second test', () => {
ș
    })
    it('Our third test', () => {

    })
})*/


/* Types of Locators

add cpress types reference: - why do we need it? Visual studio wil support and identify cypress methods:*/

/// <reference types="cypress"/> 

describe ('Our first suite', () => {
    
    it('Our first test', () => {

        //To open our app in Cypress we should run cy.vitis('') and provide it with a path to our app. 
        //As we already have link in cypress.json, we just write "/"

        cy.visit('/')  //this will only open our app, but we have to open some folders on that app or a certain tab in app:

        cy.contains("Forms").click() //this function shows Cypress where to click. Find this name in the inspect and write exactly like in html code 
        //In this case to the section called "Forms" in the side bar of the app. 
        
        //Then we have to open another folder, which is in the Forms folder:
        cy.contains("Form Layouts").click()

    
        
        //search element by Tag Name (inside the cy.get(here we will indicate locator by Tag name))
        cy.get('input')

        //find web element by ID - to show Cypress  that it is an ID 
        //and not a Tag name we put sign # before the ID name:
        
        cy.get('#inputEmail1')

        //find by Class and to show Cypress that it is a Class 
        //name we put a dot before the name of the class- just 1 value
        cy.get('.input-full-width')
       
        //find element by Attribute name- to show Cypress it is an attribute we put is in square brackets []:

        cy.get ('[placeholder]')

        //find by attribute name and value - the same, but value of he attribute we indicate in "":
        cy.get('[placeholder="Email"]')

        //find by class value- should provide the entire string of values:

        cy.get('[class="input-full-width size-medium shape-rectangle"]')

        //find a few elements, or example, by tag name and Attribute with value:
        cy.get('input[placeholder="Email"]')

        //by 2 different attributes:
        cy.get('[placeholder="Email"][fullwidth]')

        //by Tag name, Attribute with Value, ID and Class name:

        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')

        //The most recommended way by Cypress is to create your owen attribtes??? - to Ask Vasea:
        cy.get('[data-cy="imputEmail1"]')

    })

    it("Second test", () => {

        //it.only() - we type "only" to run only this test from the file

        cy.visit('/')  
        cy.contains("Forms").click() 
        
        cy.contains("Form Layouts").click()
        cy.get('[data-cy="signInButton"]')  //this is one way to find the element- by attribute
        cy.contains('Sign in')  //this is the second way to find the web-element - by text
        cy.contains('[status="warning"]', 'Sign in') //we can search by a few elements separated by COMA, if there are buttons with the same name on the page, 
        //using a second parameter as the distinction. 

        //use FIND function to find a child element in a parent element:
        //PARENTS - is to locate parent element in which the key element is in
        cy.get('#inputEmail3')
        .parents('form')
        .find('button') 
        .should('contain', 'Sign in')  //in should function the first word in "" says that this element should contain the text - Sign in)
        .parents('form')
        .find('nb-checkbox').click()

        //find email field using .contains
        cy.contains('nb-card', 'Horizontal form').find('#inputEmail3')

       
    })

    it("Methods then and wrap", () => {
        
        cy.visit('/')  
        cy.contains("Forms").click() 
        
        cy.contains("Form Layouts").click()
        /*cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')*/

        //when we have DUPLICATION like in the example above, for example cy.contains('nb-card', 'Using the Grid'),
        //in order not to write it every time we can create a function for that:

        cy.contains('nb-card', 'Using the Grid').then (firstForm => //we've created a function firstForm here
        {
            const emailLabelFirst = firstForm.find ('[for="inputEmail1"]').text()
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect (emailLabelFirst).to.equal ('Email')
            expect (passwordLabelFirst).to.equal('Password')

            //Now we will write a function to COMPARE LABELS - the label Password in one card to be equal to the label Password 
            //in another card. Pay attention that the secon cy.contains is in the first cy.contains! Otherwise it won't recognize each other

            cy.contains('nb-card', 'Basic form').then(secondForm =>{

                const passwordLabelsecond =secondForm.find('[for="exampleInputPassword1"]').text()
                expect (passwordLabelsecond).to.equal(passwordLabelFirst)

                //Pay attentipn that method "then" converts cy format into jquiery format. 
                //If we want to move it back to cy format we use "wrap" function:

                cy.wrap(secondForm).find('[for="exampleInputEmail1"]').should('contain', 'Email address')
            })

        })

    

        


        



    })

    //Here is an example how you can get a text from the page using INVOKE COMMAND: 
    //1. Invoke is used to get an attribute value an make some assertion with it or anything you need to do with this values

    it("Invoke command", () => {

        cy.visit('/')  
        cy.contains("Forms").click() 
        cy.contains("Form Layouts").click()



        //1st example
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

        //2nd example

        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal("Email address")

            //3rd example - is to use Invoke Command:

            cy.get('[for="exampleInputEmail1"]').invoke ("text").then(text=>{
                expect(text).to.equal("Email address")
            })

            cy.contains('nb-card', 'Basic form')
              .find('nb-checkbox')
              .click()
              .find('.custom-checkbox')
              .invoke('attr', 'class')
              //.should('contain', 'checked')
              .then(classValue=>{
                expect (classValue).to.contain("checked")
              })

            


        })



    })

    //Assert property - for example, to check the picking date on the page

    it.only("assert property", () =>{

        

        //example with Function

        function selectDateFromCurrentDay(day){
            let date =new Date()
            date.setDate(date.getDate() + day)
            let futureDay=date.getDate()
            let futureMonth = date.toLocaleString('default', {month: "short"})
            let dateAssert = futureMonth +' '+futureDay+', '+date.getFullYear()

            сy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute =>{
                if(!dateAttribute.includes(futureMonth)){
                    cy.get('[data-name="chevron-right"]').click()
                    selectDateFromCurrentDay(day)
                } else{

                 cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
                    
                }


            })
            return dateAssert


        }

        cy.visit('/')  
        cy.contains("Forms").click() 
        cy.contains("Datepicker").click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then( input=>{

            cy.wrap(input).click()
            let dateAssert = selectDateFromCurrentDay(20)

            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
        })


        /*First Simple example
        
        cy.contains('nb-card', 'Common Datepicker').find('input').then( input=>{

            cy.wrap(input).click()

            cy.get('nb-calendar-day-picker').contains('20').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Feb 20, 2023')
        })*/
        
    

        //The second simple example of the same scenario of date picker - invented by myself ):
        
        
        /*cy.contains('nb-card', 'Common Datepicker').find('input').click()

        cy.get('nb-calendar-day-picker').contains('20').click()
        cy.get('input').invoke('prop', 'value').should('contain', 'Feb 20, 2023')*/
        
        



        })

    it("radio button", () =>{
        cy.visit('/')  
        cy.contains("Forms").click() 
        cy.contains("Form Layouts").click()

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then (radioButtons =>{
            
            cy.wrap(radioButtons)
             .first()   /// this shows which element to choose. you can use instead .eq(0) - to start from index 0
             .check({force: true})
             .should('be.checked')

            cy.wrap(radioButtons)
              .eq(1)
              .check({force: true})
           

            cy.wrap(radioButtons)
              .eq(0)
              .should('not.be.checked')

            cy.wrap(radioButtons)
             .eq(2)
             .should("be.disabled")


            
            
        })

    



    })

    it("Checkboxes", () =>{

        cy.visit("/")
        cy.contains("Modal & Overlays").click()
        cy.contains("Toastr").click()

        //cy.get('[type="checkbox"]').check({force: true})  ///check() works for checkboxes as like "put a check"

        //you can't uncheck using this method. To uncheck a checkbox, you have to use CLick()

        cy.get('[type="checkbox"]').eq(0).click({force: true})
        cy.get('[type="checkbox"]').eq(1).check({force: true})
        cy.get('[type="checkbox"]').eq(2).click({force: true})



    })


    //Web Tables: 

    //1st Example: we will write a test case to find Larry by his first name. click the pencil to edit data, edit 
    //Age from 18 to 25
    //in inspect each table has tag table 
    //and if you click it you will see tag tr - which means table raw, and td - which means table comoln
    //every td - table colomn is child tag of tr - table row

    //1. here is the example how we can find and then update someinfo in a table


    it('Edit Table data', () =>{

        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        cy.get("tbody").contains("tr","Larry").then( tableRaw =>{
            cy.wrap(tableRaw).find(".nb-edit").click()
            cy.wrap(tableRaw).find('[placeholder="Age"]').clear().type("25")
            cy.wrap(tableRaw).find(".nb-checkmark").click()
            cy.wrap(tableRaw).find("td").eq(6).should("contain", "25")
        

        })
    })

        //2. WE create a raw, insert info and verify if the info is what we have inserted:

    //     cy.get("thead").find('.nb-plus').click()
    //     cy.get("thead").find('tr').eq(2).then( tableRaw1 =>{
    //         cy.wrap(tableRaw1).find('[placeholder="First Name"]').type('Elena')
    //         cy.wrap(tableRaw1).find('[placeholder="Last Name"]').type('Bantea')
    //         cy.wrap(tableRaw1).find('.nb-checkmark').click()


    //     })

    //     cy.get("tbody tr").first().find('td').then( tableColumns =>{

    //         cy.wrap(tableColumns).eq(2).should('contain', 'Elena')
    //         cy.wrap(tableColumns).eq(3).should('contain', 'Bantea')

    //     })

    //     //3. Table search function: 

    //     const age =[20, 30, 40, 200]

    //     cy.wrap(age).each( age=> {
    //         cy.get('thead [placeholder="Age"]').clear().type(age)
    //         cy.wait(500)
    
    //         cy.get('tbody tr').each(tableraw=>{
    //             if(age == 200){
    //                 cy.wrap(tableraw).should('contain', 'No data found')
    //             }

    //             else {
    //                 cy.wrap(tableraw).find('td').eq(6).should('contain', age)

    //             }
                

    //     })


    // })

    

    it("Select date - Web DatePickers(Date Assert)", () => {

        cy.visit('/')  
        cy.contains("Forms").click() 
        cy.contains("Datepicker").click()

        let date = new Date() - //Date() object gets current system date and time

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
                    cy.get('[data-name="chevron-right]').click()
    
                }
                
                else {
    
                    cy.get('nb-calendar-day-picker').contains(futureDay).click()
                }
    
    
            })
            

            cy.get('nb-calendar-day-picker').contains('20').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Feb 20, 2023') 

        })
    })

    it("List and Dropowns", () => {

        cy.visit('/')  
        cy.get("nav nb-select").click()
        cy.get(".options-list").contains("Dark").click
    
        //when we work with colors, we have to choose RGB format color in these test cases.
    
        cy.get("nb-layout-header nav").should("have.css", "background-color", "rgb(34, 43, 69)")
    
    
    })
        
})





        



    




