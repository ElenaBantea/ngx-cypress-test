// it("Pop-ups and Tooltips", () => {

//     cy.visit('/')  
//     cy.contains("Modal & Overlays").click() 
//     cy.contains("Tooltip").click() 
//     cy.contains("nb-card", "Colored Tooltips")
//      .contains("Default").click()
//     cy.get("nb-tooltip").should("contain", "This is a tooltip")  // in this test we found a button and asserted that the tooltip has the necessary text on it. 
//     //info of tooltip won't be found in inspect of the web-site, but in the inspect of the cypress when you run the test.
//     //the same about dialog boxes


it("Dialog message",  () => {

 cy.visit('/')  
 cy.contains("Tables & Data").click() 
 cy.contains("Smart Table").click() 

 //1 - this method won't work if message is empty in the dialog box which is from the window browser,
 // so it can't be found in the inspect

//     cy.get("tbody tr").eq(0).find(".nb-trash").click()
//     cy.on('window:confirm', (confirm) => {
//         expect(confirm).to.equal("Are you sure you want to delete?")
// })


//2 - this method will work even if the message in the dialog message is epmty
//     const stub = cy.stub()  //A stub is a small piece of code that takes the place of another component during testing. The benefit of using a stub is that it returns consistent results, 
// //  making the test easier to write. And you can run tests even if the other components are not working yet
//     cy.on("window:confirm", stub)
//     cy.get("tbody tr").eq(0).find(".nb-trash").click().then(() =>{
//         expect(stub.getCall(0)).to.be.calledWith("Are you sure you want to delete?")


//  })

 //3 - this is if you decide to click cancel button after the message "Are you sure you want to delete?"

 cy.get("tbody tr").eq(0).find(".nb-trash").click()
 cy.on("message:confirm", ()=> false)



    })



