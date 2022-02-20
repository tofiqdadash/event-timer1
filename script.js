/* getting elements via DOM*/
const addBtn = document.querySelector("#addbutton");
const titleInput = document.querySelector("#title");
const descValue = document.querySelector("#description");
const dateValue = document.querySelector("#event-date");
const timeValue = document.querySelector("#event-time");

//changeable text for validation process
const changeableH2 = document.querySelector("#validation-check");

const renderingSide = document.querySelector(".render-events")
const eventData = [];
const calendar = ["Yanvar" , "Fevral" , "Mart" , "Aprel" , "May" , "Iyun" , "Iyul", "Avqust" , "Sentyabr" , "Oktyabr" , "Noyabr" , "Dekabr" ];


addBtn.addEventListener("click" , event => {

event.preventDefault();

  //check validation
checkValidate();

   const eventItem = {
    title: titleInput.value,
    description: descValue.value,
    date: `${dateValue.value},${timeValue.value}`
}

//pushing events an empty array
eventData.push(eventItem);
renderEvents();

})



const renderEvents = () => {

  renderingSide.textContent = '';
  eventData.map((item) => {


//getting month and day values
  let eventDate = new Date(item.date);
  let eventMonth = eventDate.getMonth(eventDate) + 1;
  let eventDay = eventDate.getDate(eventDate);

  //switching number months to string version
  let selectedMonth = calendar[eventMonth - 1];

//creating event - event time combination
    let renderedEventsContainer = document.querySelector('.render-events');
    let renderedEvent = document.createElement('div');
    renderedEvent.classList.add("rendered-event-container");
  
    let dateSide = document.createElement('div');
    dateSide.classList.add("date-side");
    dateSide.textContent = `${eventDay} 
    ${selectedMonth}`;
    
    
  let titleSide = document.createElement('div');
    titleSide.classList.add("title-side");
    titleSide.textContent = item.title;
  
  
    renderedEvent.appendChild(dateSide);
    renderedEvent.appendChild(titleSide);
    renderedEventsContainer.appendChild(renderedEvent);
   
    renderedEvent.draggable = true;
  })

}


const checkValidate = () => {
  if((titleInput.value && dateValue.value && descValue.value) == ''){
    changeableH2.textContent = "Fill the inputs please";
    changeableH2.style.backgroundColor = "red";
    changeableH2.style.color = "white";
    return false;
  }
  changeableH2.textContent = 'Create new event';
  changeableH2.style.backgroundColor = '#ffde03'
  changeableH2.style.color = "black";
}



