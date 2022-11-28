const workout_video = "workout";

/**
 * set the user selected video to localstorage
 * @param {*} item 
 * @returns 
 */
function setSelectedWorkout(item){
    return localStorage.setItem(workout_video, JSON.stringify(item));
}

/**
 * retrives the workout key from the localstorage
 * @returns {*}
 */
function getSelectedWorkout(){
    return JSON.parse(localStorage.getItem(workout_video));
}