
function selectGroupMenuItem (groupName){
    cy.contains ('a',  groupName).then(menu => {

        cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then (attr =>{
            if(attr.includes("left")){
                cy.wrap(menu).click()
            }

        })
    })
}

export class navigationPage {

   formLayoutsPage () {
    /*cy.contains("Forms").click() - because we have to check if forms is open or not, we have to write an if verification*/

    selectGroupMenuItem ("Form")

    cy.contains("Form Layouts").click()
    }

    datePickerPage () {

         /*cy.contains("Forms").click()*/

        selectGroupMenuItem ("Form")

        cy.contains("Datepicker").click()
    }

    toasterPage(){
        selectGroupMenuItem ("Modal & Overlays")
        
        cy.contains("Toastr").click()
    }

    smartTablePage(){
        selectGroupMenuItem ("Tables & Data")

        cy.contains('Smart Table').click()
    }

   toolTipPage(){

    selectGroupMenuItem ("Modal & Overlays")
    cy.contains("Tooltip").click() 
   }
    
}

export const navigateTo = new navigationPage
