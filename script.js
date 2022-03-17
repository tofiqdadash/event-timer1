/* getting elements via DOM*/
const addBtn = document.querySelector("#addbutton");
const titleInput = document.querySelector("#title");
const descValue = document.querySelector("#description");
const dateValue = document.querySelector("#event-date");
const timeValue = document.querySelector("#event-time");
const deleteEvent = document.querySelector("#delete-event");

//changeable text for validation process
const validationError = document.querySelector("#validation-check");

const renderingSide = document.querySelector(".render-events");
let eventData = [];
const calendar = [
  "Yanvar",
  "Fevral",
  "Mart",
  "Aprel",
  "May",
  "Iyun",
  "Iyul",
  "Avqust",
  "Sentyabr",
  "Oktyabr",
  "Noyabr",
  "Dekabr",
];

//localstorage get items
window.onload = checkData = () => {
  if (localStorage.getItem("eventStorage") == null) {
    eventData = [];
  } else {
    eventData = JSON.parse(localStorage.getItem("eventStorage"));
    renderEvents();
  }
};

//add events to submit button
addBtn.addEventListener("click", (event) => {
  event.preventDefault();


  //validation
  if (checkValidate() === false) {
    return;
  }
 

  //include event to an object
  eventItem = {
    title: titleInput.value,
    description: descValue.value,
    date: `${dateValue.value},${timeValue.value}`,
  };

  //pushing events an empty array
  eventData.push(eventItem);

  //localstorage using
  localStorage.setItem("eventStorage", JSON.stringify(eventData));
  renderEvents();

});

//validation checking function
const checkValidate = () => {
  if ((titleInput.value && dateValue.value && descValue.value) == "") {
    validationError.textContent = "Fill the inputs please";
    validationError.style.backgroundColor = "red";
    validationError.style.color = "white";
    return false;
  }
  validationError.textContent = "Create new event";
  validationError.style.backgroundColor = "transparent";
  validationError.style.color = "white";
};

//render events
const renderEvents = () => {
  renderingSide.textContent = "";
  eventData.map((item, index) => {
    //getting month and day values
    const eventDate = new Date(item.date);
    const eventMonth = eventDate.getMonth(eventDate) + 1;
    const eventDay = eventDate.getDate(eventDate);

    //switching number months to string version
    const selectedMonth = calendar[eventMonth - 1];

    //creating event - event time combination
    const renderSection = document.querySelector(".render-events");
    const renderedEvent = document.createElement("div");
    renderedEvent.classList.add("rendered-event-container");

    const dateSide = document.createElement("div");
    dateSide.classList.add("date-side");
    dateSide.textContent = `${eventDay} 
    ${selectedMonth}`;

    const titleSide = document.createElement("div");
    titleSide.classList.add("title-side");
    titleSide.textContent = item.title;

    renderedEvent.appendChild(dateSide);
    renderedEvent.appendChild(titleSide);
    renderSection.appendChild(renderedEvent);

    renderedEvent.draggable = true;

    /* drag events */
    renderedEvent.addEventListener("dragstart", (e) => dragStart(e, index));

    //add countdown to the event
    renderedEvent.addEventListener('click' , countDown)

    //countDown function
  function countDown(){
  const countDownSide = document.createElement("main");
  countDownSide.classList.add("countdown-side");

  const countDownContainer = document.createElement('div');
  countDownContainer.classList.add("countdown-container");

const cdEventDiv = document.createElement('div');
cdEventDiv.classList.add('countdown-title-side');

  const cdEventTitle = document.createElement('h2');
  cdEventTitle.textContent = `Event title: ${item.title} `;

  cdEventDiv.append(cdEventTitle);

  const dayDiv = document.createElement("div");
  dayDiv.classList.add("box");
  const dayInput = document.createElement("p");
  const dayTitle=document.createElement("p");
  dayTitle.textContent = "Days"

  const hourDiv = document.createElement("div");
  hourDiv.classList.add("box");
  const hourInput = document.createElement("p");
  const hourTitle=document.createElement("p");
  hourTitle.textContent = "Hours"

  const minuteDiv = document.createElement("div");
  minuteDiv.classList.add("box");
  const minuteInput = document.createElement("p");
  const minuteTitle=document.createElement("p");
  minuteTitle.textContent = "Minutes"

  const secondDiv = document.createElement("div");
  secondDiv.classList.add("box");
  const secondInput = document.createElement("p");
  const secondTitle=document.createElement("p");
  secondTitle.textContent = "Seconds"

  const countDownDate = new Date(item.date).getTime();
   
  //update the count down every 1 second
   const interval = setInterval( () => {

    //get today's date and time
    const currentTime = new Date().getTime();

    //find distance between dates
    const distance = countDownDate - currentTime;

    //time calculations for days, hours, minutes, seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // //write certain datas to html via dom
   dayInput.textContent = days;
   hourInput.textContent = hours;
   minuteInput.textContent = minutes;
   secondInput.textContent = seconds;

    //if number is less than 10 add 0
    if(seconds < 10){
      secondInput.textContent = `0${seconds}` ;
    } 
     if( minutes < 10){
      minuteInput.textContent = `0${minutes}` ;
    } 
     if(hours < 10){
      hourInput.textContent = `0${hours}`
    } 
     if(days < 10){
      dayInput.textContent = `0${days}`;
    }

   //append day,hour,minute,second components to body
   dayDiv.append(dayInput);
   dayDiv.append(dayTitle);
   countDownContainer.append(dayDiv);

   hourDiv.append(hourInput);
   hourDiv.append(hourTitle);
   countDownContainer.append(hourDiv);

   minuteDiv.append(minuteInput);
   minuteDiv.append(minuteTitle);
   countDownContainer.append(minuteDiv);

   secondDiv.append(secondInput);
   secondDiv.append(secondTitle);
   countDownContainer.append(secondDiv);

   countDownSide.append(cdEventDiv);
   countDownSide.append(countDownContainer);

   document.body.append(countDownSide);

    if(distance < 0){
      clearInterval(interval);
      console.log('expired');
    }

   } , 1000)
  }

  });
};

//delete events
deleteEvent.addEventListener("dragenter", dragEnter);
deleteEvent.addEventListener("dragover", dragOver);
deleteEvent.addEventListener("drop", (e) => drop(e));

function dragStart(e, index) {
  e.dataTransfer.setData("item", index);
}

function drop(e) {
  const id = e.dataTransfer.getData("item");
  eventData.splice(id, 1);
  localStorage.setItem("eventStorage", JSON.stringify(eventData));
  renderEvents();
}

function dragEnter(e) {
  e.preventDefault();
  
}

function dragOver(e) {
  e.preventDefault();
  deleteEvent.classList.add('vibing');
}


