$(document).ready(function () {
    /**
     * Initiating workout call only after page finished loading content
     */
    workout("beginner")
});

/**
 * This calls the workout api and update the view with list of workouts
 */
function workout(difficulty="intermediate", type="", muscle=""){
    exercise(difficulty, type, muscle, workoutsUI)
}

/**
 * This will set the user selected workout and navigate to next workout video page
 * @param String workoutName 
 * @param String workoutType 
 * @param String workoutDifficulty 
 * @param String workoutMuscle 
 * @param String workoutInstructions 
 */
function selectWorkoutVideo(workoutName, workoutType, workoutDifficulty, workoutMuscle, workoutInstructions){
    setSelectedWorkout({
        "name": workoutName,
        "type": workoutType,
        "muscle": workoutMuscle,
        "difficulty": workoutDifficulty,
        "instructions": workoutInstructions
    })
    window.location.href = "../html/workout_video.html"
}