$(document).ready(function () {
    function workout(){
        exercise("intermediate", "cardio", "", workoutsUI)
    }

    workout()
});

function selectWorkoutVideo(workoutName, workoutType, workoutDifficulty, workoutMuscle, workoutInstructions){
    setWorkoutVideo({
        "name": workoutName,
        "type": workoutType,
        "muscle": workoutMuscle,
        "difficulty": workoutDifficulty,
        "instructions": workoutInstructions
    })

    window.location.pathname = "/assets/html/workout_video.html"
}