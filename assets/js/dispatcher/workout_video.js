$(document).ready(function () {
    const selected_Video = getSelectedWorkout(); //Reads the data from localstoarge
    /**
     * After DOM is ready we call the youtube api to get the video
     * Localstorage to get the currently selected workout
     * Call the UI to update the view
     */
    getWorkoutVideoAPI(`${selected_Video.name}${selected_Video.type}`, function(video){ // video is the result from youtube and it is an array
        renderWorkoutVideoUI(selected_Video, video[0].id.videoId)
    })
});