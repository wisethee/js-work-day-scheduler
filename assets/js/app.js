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

// Function to store tasks in the local storage api
const storeTasks = () => {
  localStorage.setItem("storedTasks", JSON.stringify(storedTasks));
};

// Reset text area and store task
const renderTasks = () => {
  $("textarea").each((index, record) => {
    record.value = "";
  });

  $.each(storedTasks, (index, record) => {
    $("textarea." + record.taskTime)[0].value = record.taskText;
  });
};

// Initialize workspace and render tasks if any in the local storage
const init = () => {
  var userEvent = JSON.parse(localStorage.getItem("storedTasks"));
  if (userEvent !== null) {
    storedTasks = userEvent;
  }

  renderTasks();
};

// Callback function for click save button
const clickHandler = (event) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  const className = $(event.target).attr("class");

  const eventObject = {
    taskTime: className,
    taskText: $("textarea." + className).val(),
  };

  if (storedTasks.length > 0) {
    $.each(storedTasks, (index, record) => {
      if (record.taskTime === event.target.className) {
        storedTasks.splice($.inArray(record, storedTasks), 1);
      }
    });
  }

  storedTasks.push(eventObject);

  $.each(storedTasks, (index, record) => {
    if (record.taskText === "") {
      storedTasks.splice($.inArray(record, storedTasks), 1);
    }
  });

  storeTasks();
  renderTasks();
};

// After DOM content is loaded read localStorage and add button listener
document.addEventListener("DOMContentLoaded", () => {
  // Init workspace
  init();

  // Button event listener
  $("button").on("click", clickHandler);
});
