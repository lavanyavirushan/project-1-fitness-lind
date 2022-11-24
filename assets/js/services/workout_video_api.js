const video_api_url = "https://www.googleapis.com"
const video_api_url_path = "/youtube/v3/search"
const video_api_key = "AIzaSyCU5MBRpnsi0t4yQLpo5daGkG2Euj0a26A"

/**
 * Calls the youtube api
 * @param String queryPram 
 * @param function callback 
 */
function getWorkoutVideoAPI(queryPram, callback){
    $.ajax({
        method: 'GET',
        url: `${video_api_url}${video_api_url_path}?part=snippet&type=video&key=${video_api_key}&q=${queryPram}`,
        contentType: 'application/json',
        success: function(result) {
            callback(result.items)
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
            callback([])
        }
    });
}

