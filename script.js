/* getting elements via DOM*/
const addBtn = document.querySelector("#addbutton");
const titleInput = document.querySelector("#title");
const descValue = document.querySelector("#description");
const dateValue = document.querySelector("#event-date");
const timeValue = document.querySelector("#event-time");

//changeable text for validation process
const changeableH2 = document.querySelector("#validation-check");

const renderingSide = document.querySelector(".render-events")
let eventData = [];
const calendar = ["Yanvar" , "Fevral" , "Mart" , "Aprel" , "May" , "Iyun" , "Iyul", "Avqust" , "Sentyabr" , "Oktyabr" , "Noyabr" , "Dekabr" ];


addBtn.addEventListener("click" , event => {

event.preventDefault();

//validation checking function
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

}

checkValidate();

})

const renderEvents = () => {

  renderingSide.textContent = '';
  eventData.map((item , index) => {


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

    console.log(index);
    console.log(item);


  /* delete events */
  renderedEvent.addEventListener('dragstart' , dragStart)

  function dragStart(e){
    e.dataTransfer.setData('item' , index)
    console.log('dragstart');
  }
  
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
    console.log('dragdrop');
    renderEvents();
    console.log(eventData);
  }
  
  })

}




