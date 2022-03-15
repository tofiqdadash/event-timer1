/* getting elements via DOM*/
const addBtn = document.querySelector("#addbutton");
const titleInput = document.querySelector("#title");
const descValue = document.querySelector("#description");
const dateValue = document.querySelector("#event-date");
const timeValue = document.querySelector("#event-time");

//changeable text for validation process
const validationError = document.querySelector("#validation-check");

const renderingSide = document.querySelector(".render-events")
let eventData = [];
const calendar = ["Yanvar" , "Fevral" , "Mart" , "Aprel" , "May" , "Iyun" , "Iyul", "Avqust" , "Sentyabr" , "Oktyabr" , "Noyabr" , "Dekabr" ];


addBtn.addEventListener("click" , event => {

event.preventDefault();
checkValidate();

//include event to an object
const eventItem = {
  title: titleInput.value,
  description: descValue.value,
  date: `${dateValue.value},${timeValue.value}`
}


//pushing events an empty array
eventData.push(eventItem);


//localstorage using
localStorage.setItem('eventStorage' , JSON.stringify(eventData));
eventData = JSON.parse(localStorage.getItem('eventStorage'));

renderEvents();

})

//validation checking function
const checkValidate = () => {
  if((titleInput.value && dateValue.value && descValue.value) == ''){
    validationError.textContent = "Fill the inputs please";
    validationError.style.backgroundColor = "red";
    validationError.style.color = "white";
    return false;
  }
  validationError.textContent = 'Create new event';
  validationError.style.backgroundColor = 'transparent'
  validationError.style.color = "black";
}


//render events
const renderEvents = () => {

  renderingSide.textContent = '';
  eventData.map((item , index) => {


//getting month and day values
  const eventDate = new Date(item.date);
  const eventMonth = eventDate.getMonth(eventDate) + 1;
  const eventDay = eventDate.getDate(eventDate);

  //switching number months to string version
  const selectedMonth = calendar[eventMonth - 1];

//creating event - event time combination
    const renderSection = document.querySelector('.render-events');
    const renderedEvent = document.createElement('div');
    renderedEvent.classList.add("rendered-event-container");
  
    const dateSide = document.createElement('div');
    dateSide.classList.add("date-side");
    dateSide.textContent = `${eventDay} 
    ${selectedMonth}`;
    
    
  const titleSide = document.createElement('div');
    titleSide.classList.add("title-side");
    titleSide.textContent = item.title;
  
  
    renderedEvent.appendChild(dateSide);
    renderedEvent.appendChild(titleSide);
    renderSection.appendChild(renderedEvent);
   
    renderedEvent.draggable = true;


  /* drag events */
  renderedEvent.addEventListener('dragstart' , dragStart)

  function dragStart(e){
    e.dataTransfer.setData('item' , index);
  }
  
  //delete events
  const deleteEvent = document.querySelector('#delete-event')
  deleteEvent.addEventListener('dragenter' , dragEnter);
  deleteEvent.addEventListener('dragover' , dragOver);
  deleteEvent.addEventListener('drop' , drop);

  
  function dragEnter(e){
    e.preventDefault();
  }

  function dragOver(e){
    e.preventDefault();
  }

  function drop(e){
    const id = e.dataTransfer.getData('item');
    eventData.splice(id,1)
    renderEvents();
  }
  
  })

}




