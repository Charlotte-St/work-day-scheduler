// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var timeBlockEl = $('.time-block');
  var eventInputEl = $('.description');
  var taskTextEl = $('textarea');
  var saveButtonEl = $('.saveBtn');

  var tasks = [];

  var currentTime = Number(dayjs().format('H'));

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  function handleEvent(event){
    event.preventDefault();

    var taskText = $(this).siblings('.description').val();
    var timeBlockVal = $(this).parent().attr('id');

    var newTask = {
      time: timeBlockVal,
      task: taskText

    }

    console.log(newTask);
    tasks.push(newTask);

    //localStorage.setItem(timeBlockVal, JSON.stringify(newTask));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks)
  };
  
  saveButtonEl.on('click', handleEvent);


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  function timeClass (){
    timeBlockEl.each(function() {
      blockTimeId = this.id;
      const taskTime = parseInt(blockTimeId.replace(/^\D+|\D+$$/g, ""));
      console.log((parseInt(blockTimeId.replace(/^\D+|\D+$$/g, ""))));
      console.log(currentTime);
      console.log(typeof taskTime);
      console.log(typeof currentTime);
      $(this).addClass('past', taskTime < currentTime);
      $(this).addClass('present', taskTime === currentTime);
      $(this).addClass('future', taskTime > currentTime);
    } )

  };

  timeClass();
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  

function displayTasks() {
  var storedTasks = localStorage.getItem('tasks')
  var savedTasks = JSON.parse(storedTasks);
  console.log(savedTasks);
    for (var i = 0; i < savedTasks.length; i++) {
      console.log(savedTasks.length);
      console.log(savedTasks[i]);
      if (timeBlockEl.attr('id') === savedTasks[i].time){
        //$this.find(eventInputEl).val(savedTasks[i].task);
        console.log(true);
        eventInputEl.val(savedTasks[i].task)
    }
    console.log(timeBlockEl.attr('id'));
    console.log(savedTasks[0].time);
    console.log(savedTasks[1].time)

    }
 }

  displayTasks();

  // TODO: Add code to display the current date in the header of the page.
  var today = dayjs().format('dddd MMMM D, YYYY');
  $('#currentDay').text(today);
});
