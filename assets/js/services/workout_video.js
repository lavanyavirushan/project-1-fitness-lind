const workout_video = "workout";

function setWorkoutVideo(item){
    return localStorage.setItem(workout_video, JSON.stringify(item));
}

function getWorkoutVideo(){
    return JSON.parse(localStorage.getItem(workout_video));
}