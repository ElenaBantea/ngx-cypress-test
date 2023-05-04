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


export class datePickerPage{

        selectCommonDateDatepickerDateFromToday(dayFromToday){

                cy.contains('nb-card', 'Common Datepicker').find('input').then( input=>{
            
                cy.wrap(input).click()

            let dateAssert = selectDateFromCurrentDay(dayFromToday)
                    
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert)
            cy.wrap(input).should('have.value', dateAssert)
                        
        
                })

                            
        }
              
            
                
            
               
        

}

export const ondatePickerPage= new datePickerPage()


