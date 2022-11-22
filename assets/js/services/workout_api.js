const workout_url = "https://api.api-ninjas.com/v1";
const workout_url_path = "/exercises";
const workout_api_key = "KaNfrVr0gq1fjjoGzcLafA==1Ub7ns3B5ds3USXd";

/**
 * This returns all the exercises for given muscle group
 * @param string nameOfMuscle 
 */
function exerciseMuscleGroup(nameOfMuscle){
    const queryPram = {
        "muscle": nameOfMuscle
    }
    getAPI(queryPram)
}

/**
 * List all the workout with difficultyLevel specified
 * @param string difficultyLevel 
 */
function exerciseLevel(difficultyLevel){
    const queryPram = {
        "difficulty": difficultyLevel
    }
    getAPI(queryPram)
}

/**
 * List all workout with workouttype specified
 * @param string workoutTypes 
 */
function exerciseTypes(workoutTypes){
    const queryPram = {
        "type": workoutTypes
    }
    getAPI(queryPram);
}

/**
 * Builds query params and calls the api
 * @param string difficultyLevel 
 * @param string workoutTypes 
 * @param string nameOfMuscle 
 * @param function callback 
 */
function exercise(difficultyLevel, workoutTypes, nameOfMuscle, callback){
    const queryPram = {
        "difficulty": difficultyLevel,
        "type": workoutTypes,
        "muscle": nameOfMuscle
    }
    getAPI(queryPram, callback);
}


/**
 * Call workout api and get result
 * @param { "difficulty": string, "type": string, "muscle": string } queryParamsObj 
 */
function getAPI(queryPram, callback){

    const query = buildQueryString(queryPram)
    $.ajax({
        method: 'GET',
        url: workout_url+workout_url_path+query,
        headers: { 'X-Api-Key': workout_api_key},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
            callback(result);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
            callback([]);
        }
    });
}

/**
 * Build JS object into URL query string
 * @param { "difficulty": string, "type": string, "muscle": string } queryParamsObj 
 */
 function buildQueryString(queryParamsObj){
    let queryString = "";
    for(prop in queryParamsObj){

        if(queryParamsObj[prop] != undefined && queryParamsObj[prop].length > 0 && queryParamsObj[prop] != null){
            queryString += `${prop}=${queryParamsObj[prop]}&`
        }
    }
    if(queryString.length > 0){
        queryString = `?${queryString}`;
        queryString = queryString.slice(0, -1); 
    }
    return queryString;
}