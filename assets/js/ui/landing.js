/**
 * List all the UI elements 
 * Add all event listeners
 */
const workout = document.querySelector("#personalized-workout");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const age = document.querySelector("#age");
const height = document.querySelector("#height");
const weight = document.querySelector("#weight");

const workoutEvent = workout.addEventListener("click", function(event){
    event.preventDefault();
    submitDispatcher();
})