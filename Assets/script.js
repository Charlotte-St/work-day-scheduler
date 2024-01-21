// Call to jQuery to assure nothing runs until the page is all loaded
$(function () {
    var timeBlockEl = $('.time-block');
    var eventInputEl = $('.description');
    var saveButtonEl = $('.saveBtn');

    var currentTime = Number(dayjs().format('H'));
  
// Listener for click events on the save button. 

    function handleEvent(event){
      event.preventDefault();
  
      var taskText = $(this).siblings('.description').val();
      var timeBlockVal = $(this).parent().attr('id');
  
      if (taskText === ""){
        localStorage.setItem(timeBlockVal, "");
      }
      else {
        localStorage.setItem(timeBlockVal, taskText)
      }

    };
    
    saveButtonEl.on('click', handleEvent);
  
  
    // Color coding for time blocks based on if they are past, present, or future
  
    function timeClass (){
      timeBlockEl.each(function() {
        blockTimeId = this.id;
        //Regex strips all non-didgts from the id of the time block to find 24hr time
        var taskTime = parseInt(blockTimeId.replace(/^\D+|\D+$$/g, ""));
  
        if (taskTime < currentTime){
          $(this).addClass('past');
        }
        else if (taskTime === currentTime) {
          $(this).addClass('present')
        }
        else {
          $(this).addClass('future')}
      } )
  
    };
  
    timeClass();
    
    // Gets any user input that was saved in localStorage and sets values of corresponding time block
   eventInputEl.each(function(){
    for (var i = 0; i < localStorage.length; i++) {
        var keyVal = localStorage.key(i);
        var taskValue = localStorage.getItem(keyVal);
        var timeVal = $(this).parent('div').attr('id');

        if (keyVal === timeVal) {
            $(this).val(taskValue);
        }
    }
   }
   )

    // Displays the current date in the header of the page
    var today = dayjs().format('dddd MMMM D, YYYY');
    $('#currentDay').text(today);
  });
  