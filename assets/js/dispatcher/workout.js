$(document).ready(function () {
    workout("beginner")
});

/**
 * This calls the workout api and update the view with list of workouts
 * TODO: somehow need to change the image for workout
 */
function workout(difficulty="intermediate", type="", muscle=""){
    exercise(difficulty, type, muscle, workoutsUI)
}

/**
 * This will set the user selected workout and navigate to next workout video page
 * @param {*} workoutName 
 * @param {*} workoutType 
 * @param {*} workoutDifficulty 
 * @param {*} workoutMuscle 
 * @param {*} workoutInstructions 
 */
function selectWorkoutVideo(workoutName, workoutType, workoutDifficulty, workoutMuscle, workoutInstructions){
    setSelectedWorkout({
        "name": workoutName,
        "type": workoutType,
        "muscle": workoutMuscle,
        "difficulty": workoutDifficulty,
        "instructions": workoutInstructions
    })
    window.location.pathname = "/assets/html/workout_video.html"
}