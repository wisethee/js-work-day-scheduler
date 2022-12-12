const currentDay = moment().format("dddd, MMMM Do, YYYY");
const currentHour = moment().format("H");

let storedTasks = [];

// Display current date below title, standard format
$("#currentDay").text(currentDay);

// Add appropriate css class based on the current time
$(".task-block").each(() => {
  if (parseInt(currentHour) === parseInt(this.id)) {
    $(this).addClass("present");
  } else if (parseInt(currentHour) > parseInt(this.id)) {
    $(this).addClass("past");
  } else {
    $(this).addClass("future");
  }
});
