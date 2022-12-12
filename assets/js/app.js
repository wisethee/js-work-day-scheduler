const currentDay = moment().format("dddd, MMMM Do, YYYY");
const currentHour = moment().format("H");

let storedTasks = [];

// Display current date below title, standard format
$("#currentDay").text(currentDay);

// Add appropriate css class to task block based on the current time
$(".task-block").each(() => {
  if (parseInt(currentHour) === parseInt(this.id)) {
    $(this).addClass("present");
  } else if (parseInt(currentHour) > parseInt(this.id)) {
    $(this).addClass("past");
  } else {
    $(this).addClass("future");
  }
});

// Add appropriate css class to save task based on the current time
$(".save-task").each((index, record) => {
  if (parseInt(currentHour) === parseInt(record.id.split("-")[1])) {
    $(record).addClass("present");
  } else if (parseInt(currentHour) > parseInt(record.id.split("-")[1])) {
    $(record).addClass("past");
  } else {
    $(record).addClass("future");
  }
});
