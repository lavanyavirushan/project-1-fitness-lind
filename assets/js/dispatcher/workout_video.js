$(document).ready(function () {
    const selected_Video = getSelectedWorkout();
    /**
     * After DOM is ready we call the youtube api to get the video
     * Localstorage to get the currently selected workout
     * Call the UI to update the view
     */
    getWorkoutVideoAPI(`${selected_Video.name}${selected_Video.type}`, function(video){
        renderWorkoutVideoUI(selected_Video, video[0].id.videoId)
    })
});