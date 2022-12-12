const currentDay = moment().format("dddd, MMMM Do, YYYY");
const currentHour = moment().format("H");

let storedTasks = [];

// Display current date below title, standard format
$("#currentDay").text(currentDay);
