
import { ondatePickerPage } from "../support/Page Objects/datePickerPage.cy"
import { onFormLayoutsPage } from "../support/Page Objects/formLayoutsPage.cy"
import { navigateTo, onNavigationPage } from "../support/Page Objects/navigationPage.cy"


describe("Test with Page Objects", () =>{

    beforeEach("open app", () => {

        cy.visit('/')  

    })

    it ("verify navigation across the pages", () => {

        navigateTo.formLayoutsPage()
        navigateTo.datePickerPage()
        navigateTo.smartTablePage()
        navigateTo.toasterPage()
        navigateTo.toolTipPage()
        
        
    })

    it.only("should Inline and Basic Form and select tomorrow date in the calendar", () => {
        navigateTo.formLayoutsPage()
        onFormLayoutsPage.submitInlineFormwithNameandEmail("Elena", "test@test.com")
        onFormLayoutsPage.submitBasicForm("test@test.ru", "%4637^")
        navigateTo.datePickerPage ()
        ondatePickerPage.selectCommonDateDatepickerDateFromToday(4)
        



    })


})